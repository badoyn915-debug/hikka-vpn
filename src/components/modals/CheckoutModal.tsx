import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, ShieldCheck, Zap, ExternalLink } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { checkoutPlan, setCheckoutPlan } = useApp();

  if (!checkoutPlan) return null;

  const handleClose = () => {
    setCheckoutPlan(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="liquid-glass rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-white/15 shadow-2xl relative">
        
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-white bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-2">
              <Zap className="w-3.5 h-3.5 text-white" />
              <span>ПОДКЛЮЧЕНИЕ В TELEGRAM</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Подключение: {checkoutPlan.title}
            </h3>
          </div>

          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Все тарифы, моментальная выдача VLESS-ключей, выбор способов оплаты (СБП, Карты РФ, TON, USDT, Stars) и круглосуточная поддержка работают прямо в официальном боте <span className="text-white font-mono font-bold">@HikkaVPNbot</span>.
          </p>

          <a
            href={`https://t.me/HikkaVPNbot?start=plan_${checkoutPlan.id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="w-full py-4 rounded-xl bg-white hover:bg-slate-200 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all active:scale-[0.98] mb-4"
          >
            <Send className="w-4 h-4 fill-black text-black" />
            <span>Открыть @HikkaVPNbot и оформить</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-300 font-mono text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Мгновенная выдача ключа за 5 секунд после перехода</span>
          </div>
        </div>

      </div>
    </div>
  );
};
