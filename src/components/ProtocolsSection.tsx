import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProtocolInfo } from '../types/vpn';
import { Cpu, Zap, Shield, Lock, Layers, CheckCircle2, ArrowRight, Gauge, Radio } from 'lucide-react';

export const ProtocolsSection: React.FC = () => {
  const { protocols, selectedProtocol, setSelectedProtocol, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<string>(protocols[0]?.id || 'vless');

  const activeProto = protocols.find((p) => p.id === activeTab) || protocols[0];

  const handleSelectProto = (proto: ProtocolInfo) => {
    setSelectedProtocol(proto);
    setActiveTab(proto.id);
    showToast('Протокол выбран', `Активный протокол изменён на ${proto.name}`, 'info');
  };

  const getBadgeStyle = (badge: string) => {
    if (badge === 'FAST' || badge === '10 GBPS') return 'text-emerald-400 bg-emerald-950/50 border-emerald-500/30';
    if (badge === 'STEALTH' || badge === 'ANTI-DPI' || badge === 'RECOMMENDED') return 'text-cyan-400 bg-cyan-950/50 border-cyan-500/30';
    if (badge === 'STABLE' || badge === 'SECURE') return 'text-blue-400 bg-blue-950/50 border-blue-500/30';
    return 'text-purple-400 bg-purple-950/50 border-purple-500/30';
  };

  return (
    <section id="protocols" className="py-24 relative overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>MODERN ENCRYPTION & OBSCURITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Выбирай свой протокол
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 font-light">
            Каждый протокол оптимизирован под определённые задачи: от обхода глубокой фильтрации DPI до максимальной скорости 10 Gbps в играх и стриминге.
          </p>
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {protocols.map((proto) => {
            const isSelected = selectedProtocol.id === proto.id;
            const isCurrentActive = activeTab === proto.id;

            return (
              <div
                key={proto.id}
                onClick={() => handleSelectProto(proto)}
                className={`group liquid-glass-interactive rounded-2xl p-6 cursor-pointer flex flex-col justify-between transition-all duration-300 relative ${
                  isSelected ? 'border-cyan-500/60 bg-cyan-950/25 shadow-[0_0_30px_rgba(0,242,254,0.15)]' : ''
                }`}
              >
                {/* Popular Badge */}
                {proto.isPopular && (
                  <div className="absolute -top-2.5 right-6 z-10">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-cyan-300 bg-[#07131e] border border-cyan-400/50 px-2.5 py-0.5 rounded-full shadow">
                      ★ Топ Выбор
                    </span>
                  </div>
                )}

                <div>
                  {/* Top: Name & Shortcode */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {proto.name}
                      </h3>
                      <span className="text-xs font-mono text-cyan-400 font-semibold">
                        {proto.shortCode}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/8 flex items-center justify-center text-slate-300 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-all">
                      <Cpu className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed font-light mb-5">
                    {proto.description}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proto.badges.map((b) => (
                      <span
                        key={b}
                        className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border ${getBadgeStyle(b)}`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Performance Indicators */}
                  <div className="space-y-2.5 bg-black/30 rounded-xl p-3 border border-white/5 mb-5">
                    
                    {/* Speed Bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Скорость (Speed):</span>
                        <span className="text-emerald-400 font-semibold">{proto.speedRating}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${proto.speedRating}%` }}
                        />
                      </div>
                    </div>

                    {/* Stability Bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Стабильность (Stability):</span>
                        <span className="text-cyan-400 font-semibold">{proto.stabilityRating}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${proto.stabilityRating}%` }}
                        />
                      </div>
                    </div>

                    {/* Anti-DPI Bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Обход DPI (Stealth):</span>
                        <span className="text-indigo-400 font-semibold">{proto.antiDpiRating}%</span>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${proto.antiDpiRating}%` }}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Footer: Tech Specs */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="text-slate-400 font-mono text-[11px]">
                    Порт: <span className="text-slate-200">{proto.port}</span>
                  </div>

                  <div className="flex items-center gap-1 font-medium text-cyan-400 text-xs">
                    {isSelected ? (
                      <span className="flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Активен
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 group-hover:underline">
                        Применить <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Protocol Deep-Dive Spec Panel */}
        <div className="liquid-glass rounded-2xl p-6 sm:p-8 border border-cyan-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  ИНТЕЛЛЕКТУАЛЬНЫЙ ВЫБОР
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeProto.name}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                Рекомендовано для:
              </h4>
              <p className="text-sm text-slate-300 font-light leading-relaxed mb-4">
                {activeProto.recommendedFor}
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                <div>
                  Шифрование: <span className="text-cyan-300">{activeProto.encryption}</span>
                </div>
                <div>
                  Порты: <span className="text-cyan-300">{activeProto.port}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                onClick={() => handleSelectProto(activeProto)}
                className="w-full lg:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-cyan-500 hover:text-black font-semibold text-xs transition-all duration-300 border border-white/10 hover:border-cyan-400 shadow-md flex items-center justify-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400 group-hover:text-black" />
                <span>Использовать {activeProto.shortCode}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
