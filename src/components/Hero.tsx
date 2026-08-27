import React from 'react';
import { NetworkGlobe3D } from './NetworkGlobe3D';
import { Send, Zap, ChevronRight, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-6 flex flex-col items-start text-left z-20">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle border border-white/20 mb-6 backdrop-blur-xl group">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider uppercase text-white font-semibold">
                HIKKA VPN
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] text-slate-300 font-sans">
                Next-Gen Protocols
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 font-sans">
              Свободный интернет. <br />
              <span className="text-white">
                Без лишних ограничений.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light mb-8 max-w-xl">
              VPN с поддержкой нескольких протоколов, серверов в разных странах и обходом ограничений доступа.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <a
                href="https://t.me/HikkaVPNbot?start=connect_vpn"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden rounded-xl bg-white hover:bg-slate-200 text-black font-extrabold px-7 py-3.5 text-sm flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-[0.98]"
              >
                <Zap className="w-4 h-4 fill-black text-black" />
                <span>Подключить VPN</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="https://t.me/HikkaVPNbot"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-interactive rounded-xl px-6 py-3.5 text-sm font-medium text-white flex items-center justify-center gap-2.5 group hover:border-white/30"
              >
                <Send className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Открыть Telegram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-white/10 w-full">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                <span className="text-xs font-mono text-white">
                  Система работает
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-white">
                  <span className="font-bold">14+</span> локаций
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-white">
                  Несколько протоколов
                </span>
              </div>
            </div>

          </div>

          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="w-full relative z-10">
              <NetworkGlobe3D />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
