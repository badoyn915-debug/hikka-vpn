import React from 'react';
import { useApp } from '../context/AppContext';
import { TariffPlan, CurrencyType } from '../types/vpn';
import { CreditCard, Check, Zap, Sparkles, ShieldCheck, ArrowRight, Gift } from 'lucide-react';

export const TariffsSection: React.FC = () => {
  const { tariffs, currency, setCurrency, setCheckoutPlan } = useApp();

  const currencies: { key: CurrencyType; symbol: string; label: string }[] = [
    { key: 'RUB', symbol: '₽', label: 'RUB (₽)' },
    { key: 'USDT', symbol: '$', label: 'USDT ($)' },
    { key: 'TON', symbol: 'TON', label: 'TON' },
    { key: 'STARS', symbol: '⭐', label: 'Stars' }
  ];

  const formatPrice = (amount: number, curr: CurrencyType) => {
    if (curr === 'RUB') return `${amount} ₽`;
    if (curr === 'USDT') return `$${amount.toFixed(2)}`;
    if (curr === 'TON') return `${amount.toFixed(2)} TON`;
    if (curr === 'STARS') return `${amount} ⭐`;
    return `${amount}`;
  };

  const handleBuy = (plan: TariffPlan) => {
    setCheckoutPlan(plan);
  };

  return (
    <section id="tariffs" className="py-24 relative overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            <span>TRANSPARENT PRICING & INSTANT ACCESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Тарифные планы
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 font-light">
            Единый полный функционал на всех тарифах: все 14+ локаций, все протоколы (VLESS, SS-2022, WireGuard) и 10 Gbps безлимитная скорость.
          </p>

          {/* Currency Selector Pill */}
          <div className="inline-flex items-center gap-1 p-1 liquid-glass rounded-xl border border-white/10 mt-6">
            {currencies.map((c) => (
              <button
                key={c.key}
                onClick={() => setCurrency(c.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  currency === c.key
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,242,254,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tariffs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {tariffs.map((plan) => {
            const isFeatured = !!plan.isPopular;
            const priceMonthly = plan.pricePerMonth[currency];
            const priceTotal = plan.totalPrice[currency];

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
                  {/* Card Title & Discount */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {plan.title}
                    </h3>
                    {plan.discountPercent && (
                      <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        -{plan.discountPercent}%
                      </span>
                    )}
                  </div>

                  {/* Pricing Display */}
                  <div className="mb-6 pb-6 border-b border-white/8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                        {formatPrice(priceMonthly, currency)}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">/ мес</span>
                    </div>

                    <div className="text-xs text-slate-400 font-mono mt-1.5">
                      Итого к оплате: <span className="text-slate-200">{formatPrice(priceTotal, currency)}</span>
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

                {/* Buy Button */}
                <button
                  onClick={() => handleBuy(plan)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                    isFeatured
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-[0_0_20px_rgba(0,242,254,0.3)] active:scale-[0.98]'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-cyan-500/40'
                  }`}
                >
                  <Zap className={`w-4 h-4 ${isFeatured ? 'fill-black text-black' : 'text-cyan-400'}`} />
                  <span>Подключить {plan.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Security / Payment guarantee notes */}
        <div className="mt-12 liquid-glass-subtle rounded-2xl p-5 border border-white/6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Мгновенная автоматическая активация ключа сразу после оплаты</span>
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
