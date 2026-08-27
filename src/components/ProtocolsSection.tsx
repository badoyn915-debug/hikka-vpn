import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProtocolInfo } from '../types/vpn';
import { Cpu, Send, ArrowRight } from 'lucide-react';

export const ProtocolsSection: React.FC = () => {
  const { protocols, selectedProtocol, setSelectedProtocol, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<string>(protocols[0]?.id || 'vless');

  const activeProto = protocols.find((p) => p.id === activeTab) || protocols[0];

  const handleSelectProto = (proto: ProtocolInfo) => {
    setSelectedProtocol(proto);
    setActiveTab(proto.id);
    showToast('Протокол выбран', `Активный протокол изменён на ${proto.name}`, 'info');
  };

  return (
    <section id="protocols" className="py-24 relative overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-white bg-white/5 border border-white/15 px-3 py-1 rounded-full mb-3">
            <Cpu className="w-3.5 h-3.5 text-white" />
            <span>MODERN ENCRYPTION & OBSCURITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Выбирай свой протокол
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 font-light">
            Каждый протокол оптимизирован под определённые задачи: от обхода глубокой фильтрации DPI до максимальной скорости 10 Gbps в играх и стриминге.
          </p>
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {protocols.map((proto) => {
            const isSelected = selectedProtocol.id === proto.id;

            return (
              <div
                key={proto.id}
                onClick={() => handleSelectProto(proto)}
                className={`group liquid-glass-interactive rounded-2xl p-6 cursor-pointer flex flex-col justify-between transition-all duration-300 relative ${
                  isSelected ? 'border-white/40 bg-white/[0.06] shadow-[0_0_25px_rgba(255,255,255,0.1)]' : ''
                }`}
              >
                {/* Popular Badge */}
                {proto.isPopular && (
                  <div className="absolute -top-2.5 right-6 z-10">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-white bg-[#101318] border border-white/30 px-2.5 py-0.5 rounded-full shadow">
                      ★ Топ Выбор
                    </span>
                  </div>
                )}

                <div>
                  {/* Top: Name & Shortcode */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white transition-colors">
                        {proto.name}
                      </h3>
                      <span className="text-xs font-mono text-slate-300 font-semibold">
                        {proto.shortCode}
                      </span>
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white transition-all">
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
                        className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded border text-white bg-white/5 border-white/15"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Performance Indicators */}
                  <div className="space-y-2.5 bg-black/40 rounded-xl p-3 border border-white/10 mb-5">
                    
                    {/* Speed Bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                        <span>Скорость (Speed):</span>
                        <span className="text-white font-semibold">{proto.speedRating}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-white h-full rounded-full transition-all duration-500"
                          style={{ width: `${proto.speedRating}%` }}
                        />
                      </div>
                    </div>

                    {/* Stability Bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                        <span>Стабильность (Stability):</span>
                        <span className="text-white font-semibold">{proto.stabilityRating}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-white/90 h-full rounded-full transition-all duration-500"
                          style={{ width: `${proto.stabilityRating}%` }}
                        />
                      </div>
                    </div>

                    {/* Anti-DPI Bar */}
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                        <span>Обход DPI (Stealth):</span>
                        <span className="text-white font-semibold">{proto.antiDpiRating}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-white/80 h-full rounded-full transition-all duration-500"
                          style={{ width: `${proto.antiDpiRating}%` }}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Footer: Action linking to Telegram Bot */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="text-slate-400 font-mono text-[11px]">
                    Порт: <span className="text-white">{proto.port}</span>
                  </div>

                  <a
                    href={`https://t.me/HikkaVPNbot?start=proto_${proto.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 font-bold text-black bg-white hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-all text-xs shadow-sm"
                  >
                    <Send className="w-3 h-3 fill-black" />
                    <span>В бот</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Protocol Deep-Dive Spec Panel */}
        <div className="liquid-glass rounded-2xl p-6 sm:p-8 border border-white/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xs font-mono text-white uppercase tracking-wider font-semibold">
                  ИНТЕЛЛЕКТУАЛЬНЫЙ ВЫБОР
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-300 font-mono">
                  {activeProto.name}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                Рекомендовано для:
              </h4>
              <p className="text-sm text-slate-300 font-light leading-relaxed mb-4">
                {activeProto.recommendedFor}
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300">
                <div>
                  Шифрование: <span className="text-white font-semibold">{activeProto.encryption}</span>
                </div>
                <div>
                  Порты: <span className="text-white font-semibold">{activeProto.port}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <a
                href={`https://t.me/HikkaVPNbot?start=proto_${activeProto.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-200 text-black font-extrabold text-xs transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 fill-black" />
                <span>Получить {activeProto.shortCode} в @HikkaVPNbot</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
