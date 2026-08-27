import React from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, Sparkles, ShieldCheck, ArrowRight, Send, Check } from 'lucide-react';

export const TariffsSection: React.FC = () => {
  const { tariffs } = useApp();

  const planDurations: Record<string, { subtitle: string; periodLabel: string }> = {
    'plan-1m': { subtitle: 'Базовый период', periodLabel: '1 месяц доступа' },
    'plan-3m': { subtitle: 'Популярный период', periodLabel: '3 месяца доступа' },
    'plan-6m': { subtitle: 'Полугодовой VIP', periodLabel: '6 месяцев доступа' },
    'plan-12m': { subtitle: 'Максимальная выгода', periodLabel: '12 месяцев доступа' }
  };

  return (
    <section id="tariffs" className="py-24 relative overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            <span>INSTANT TELEGRAM BOT PURCHASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Тарифные планы
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 font-light">
            Единый полный доступ ко всем 14+ локациям, всем протоколам и 10 Gbps скорости. Оформление и оплата производятся прямо в Telegram-боте.
          </p>
        </div>

        {/* Tariffs Grid (Clean Plans without hardcoded price amounts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {tariffs.map((plan) => {
            const isFeatured = !!plan.isPopular;
            const meta = planDurations[plan.id] || { subtitle: 'Подписка', periodLabel: plan.title };

            return (
              <div
                key={plan.id}
                className={`group liquid-glass-interactive rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  isFeatured
                    ? 'border-cyan-500/60 bg-cyan-950/20 shadow-[0_0_35px_rgba(0,242,254,0.2)] lg:-translate-y-2'
                    : ''
                }`}
              >
                {/* Popular Badge */}
                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 to-sky-300 px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(0,242,254,0.4)]">
                      <Sparkles className="w-3 h-3 fill-black" />
                      {plan.badge || 'РЕКОМЕНДУЕМЫЙ ВЫБОР'}
                    </span>
                  </div>
                )}

                <div>
                  {/* Card Title & Duration Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {plan.title}
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                      {meta.subtitle}
                    </span>
                  </div>

                  {/* Plan Info Badge */}
                  <div className="mb-6 pb-6 border-b border-white/8">
                    <div className="text-sm font-semibold text-slate-200 font-mono">
                      {meta.periodLabel}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Стоимость и скидки рассчитываются в боте
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="w-4 h-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buy Button -> Directly in Telegram Bot */}
                <a
                  href={`https://t.me/HikkaVPNbot?start=plan_${plan.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                    isFeatured
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-[0_0_20px_rgba(0,242,254,0.3)] active:scale-[0.98]'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-cyan-500/40'
                  }`}
                >
                  <Send className={`w-4 h-4 ${isFeatured ? 'text-black' : 'text-cyan-400'}`} />
                  <span>Купить в @HikkaVPNbot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Security / Payment guarantee notes */}
        <div className="mt-12 liquid-glass-subtle rounded-2xl p-5 border border-white/6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Оплата и мгновенная выдача ключей — прямо в Telegram-боте @HikkaVPNbot</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
            <span>• СБП</span>
            <span>• Mir / Visa / MC</span>
            <span>• TON / USDT</span>
            <span>• Telegram Stars</span>
          </div>
        </div>

      </div>
    </section>
  );
};
