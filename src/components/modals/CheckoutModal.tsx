import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TariffPlan, CurrencyType } from '../../types/vpn';
import { vpnApi } from '../../api/vpnApi';
import { 
  X, 
  CheckCircle2, 
  Send, 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  Zap, 
  ExternalLink, 
  Copy, 
  Check, 
  Loader2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const { checkoutPlan, setCheckoutPlan, currency, showToast, setCurrentView } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<'sbp' | 'card' | 'crypto' | 'stars' | 'bot'>('sbp');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');
  const [copied, setCopied] = useState(false);

  if (!checkoutPlan) return null;

  const price = checkoutPlan.totalPrice[currency];

  const formatPrice = (amount: number, curr: CurrencyType) => {
    if (curr === 'RUB') return `${amount} ₽`;
    if (curr === 'USDT') return `$${amount.toFixed(2)}`;
    if (curr === 'TON') return `${amount.toFixed(2)} TON`;
    if (curr === 'STARS') return `${amount} ⭐`;
    return `${amount}`;
  };

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      const res = await vpnApi.purchaseTariff(checkoutPlan.id, selectedMethod);
      if (res.success) {
        setGeneratedKey(res.subscriptionKey);
        setOrderComplete(true);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore
        }
        showToast('Оплата успешна', `Подписка на ${checkoutPlan.title} активирована!`, 'success');
      }
    } catch (e) {
      showToast('Ошибка', 'Не удалось завершить транзакцию', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    showToast('Скопировано', 'Ключ скопирован в буфер', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setCheckoutPlan(null);
    setOrderComplete(false);
    setGeneratedKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="liquid-glass rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-white/10 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderComplete ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>БЫСТРОЕ ПОДКЛЮЧЕНИЕ</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Подключение: {checkoutPlan.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Сумма к оплате: <span className="text-cyan-300 font-bold text-sm">{formatPrice(price, currency)}</span>
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-mono text-slate-400">Выберите способ оплаты:</label>
              
              <div className="grid grid-cols-2 gap-2.5">
                {/* SBP */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('sbp')}
                  className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                    selectedMethod === 'sbp'
                      ? 'bg-cyan-950/60 border-cyan-500/60 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                      : 'liquid-glass-subtle border-white/6 hover:border-white/15'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center font-bold text-xs text-cyan-300">
                    СБП
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">СБП</div>
                    <div className="text-[10px] text-slate-400">0% комиссии</div>
                  </div>
                </button>

                {/* Cards */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                    selectedMethod === 'card'
                      ? 'bg-cyan-950/60 border-cyan-500/60 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                      : 'liquid-glass-subtle border-white/6 hover:border-white/15'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-cyan-300">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Карта РФ</div>
                    <div className="text-[10px] text-slate-400">Мир, Visa, MC</div>
                  </div>
                </button>

                {/* Crypto */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('crypto')}
                  className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                    selectedMethod === 'crypto'
                      ? 'bg-cyan-950/60 border-cyan-500/60 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                      : 'liquid-glass-subtle border-white/6 hover:border-white/15'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center font-mono font-bold text-xs text-emerald-400">
                    TON
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Криптовалюта</div>
                    <div className="text-[10px] text-slate-400">TON / USDT</div>
                  </div>
                </button>

                {/* Telegram Bot Direct */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('bot')}
                  className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                    selectedMethod === 'bot'
                      ? 'bg-cyan-950/60 border-cyan-500/60 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                      : 'liquid-glass-subtle border-white/6 hover:border-white/15'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-cyan-300">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">В боте</div>
                    <div className="text-[10px] text-slate-400">@HikkaVPNbot</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Direct Bot Link Alternative */}
            {selectedMethod === 'bot' ? (
              <a
                href={`https://t.me/HikkaVPNbot?start=plan_${checkoutPlan.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Оплатить в @HikkaVPNbot ({formatPrice(price, currency)})</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Обработка платежа...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-black" />
                    <span>Оплатить {formatPrice(price, currency)}</span>
                  </>
                )}
              </button>
            )}

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono text-center mt-4">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Безопасное соединение • Мгновенная выдача ключа</span>
            </div>
          </div>
        ) : (
          /* Order Complete View */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">
              Подписка успешно оформлена!
            </h3>
            <p className="text-xs text-slate-300 font-light mb-6">
              Ваш персональный VLESS Reality ключ сгенерирован и готов к работе.
            </p>

            {/* Key Preview Box */}
            <div className="bg-black/50 rounded-2xl p-4 border border-white/8 text-left mb-6">
              <div className="text-[11px] font-mono text-slate-400 mb-2 flex justify-between">
                <span>VLESS REALITY KEY:</span>
                <span className="text-emerald-400 font-bold">14+ ЛОКАЦИЙ</span>
              </div>
              
              <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5 text-xs font-mono text-slate-300 break-all max-h-24 overflow-y-auto mb-3">
                {generatedKey}
              </div>

              <button
                type="button"
                onClick={handleCopyKey}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-cyan-500 hover:text-black font-semibold text-xs transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Ключ скопирован!' : 'Скопировать ключ'}</span>
              </button>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  setCurrentView('dashboard');
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs shadow-md"
              >
                Перейти в Личный кабинет
              </button>

              <a
                href="https://t.me/HikkaVPNbot"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl liquid-glass text-xs font-semibold text-white flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>Бот</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
