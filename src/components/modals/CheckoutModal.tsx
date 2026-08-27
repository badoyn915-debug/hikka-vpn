import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CurrencyType } from '../../types/vpn';
import { 
  X, 
  Send, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowRight
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { checkoutPlan, setCheckoutPlan, currency } = useApp();

  if (!checkoutPlan) return null;

  const price = checkoutPlan.totalPrice[currency];

  const formatPrice = (amount: number, curr: CurrencyType) => {
    if (curr === 'RUB') return `${amount} ₽`;
    if (curr === 'USDT') return `$${amount.toFixed(2)}`;
    if (curr === 'TON') return `${amount.toFixed(2)} TON`;
    if (curr === 'STARS') return `${amount} ⭐`;
    return `${amount}`;
  };

  const handleClose = () => {
    setCheckoutPlan(null);
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

        <div>
          {/* Modal Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>ПОДКЛЮЧЕНИЕ В TELEGRAM</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Подключение: {checkoutPlan.title}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Стоимость: <span className="text-cyan-300 font-bold text-sm">{formatPrice(price, currency)}</span>
            </p>
          </div>

          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Все тарифы, моментальная выдача VLESS-ключей, выбор способов оплаты (СБП, Карты РФ, TON, USDT, Stars) и круглосуточная поддержка работают прямо в официальном боте <span className="text-cyan-300 font-mono font-semibold">@HikkaVPNbot</span>.
          </p>

          {/* Direct Telegram Bot Action Button */}
          <a
            href={`https://t.me/HikkaVPNbot?start=plan_${checkoutPlan.id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,242,254,0.35)] transition-all active:scale-[0.98] mb-4"
          >
            <Send className="w-4 h-4 fill-black" />
            <span>Открыть @HikkaVPNbot и подключить ({formatPrice(price, currency)})</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Мгновенная выдача ключа за 5 секунд после перехода</span>
          </div>
        </div>

      </div>
    </div>
  );
};
