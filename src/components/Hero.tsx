import React from 'react';
import { useApp } from '../context/AppContext';
import { NetworkGlobe3D } from './NetworkGlobe3D';
import { Send, Zap, ChevronRight, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 sm:pt-36 pb-16 flex items-center overflow-hidden bg-glow-radial">
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-20">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-subtle border border-cyan-500/25 mb-6 backdrop-blur-xl group hover:border-cyan-500/40 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-300 font-medium">
                HIKKA VPN
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] text-slate-300 font-sans">
                Next-Gen Protocols
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-sans">
              Свободный интернет. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                Без лишних ограничений.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light mb-8 max-w-xl">
              VPN с поддержкой нескольких протоколов, серверов в разных странах и обходом ограничений доступа.
            </p>

            {/* Action Buttons: Both leading to Telegram Bot */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              {/* Primary CTA -> Bot */}
              <a
                href="https://t.me/HikkaVPNbot?start=connect_vpn"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-[#050505] font-bold px-7 py-3.5 text-sm flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.5)] active:scale-[0.98]"
              >
                <Zap className="w-4 h-4 fill-current text-black" />
                <span>Подключить VPN</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Secondary CTA: Telegram */}
              <a
                href="https://t.me/HikkaVPNbot"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-interactive rounded-xl px-6 py-3.5 text-sm font-medium text-white flex items-center justify-center gap-2.5 group hover:border-cyan-500/30"
              >
                <Send className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Открыть Telegram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
              </a>
            </div>

            {/* Sub-CTA Live Metric Pills */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-white/8 w-full">
              {/* Metric 1 */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                <span className="text-xs font-mono text-slate-300">
                  Система работает
                </span>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-2">
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-300">
                  <span className="text-cyan-400 font-semibold">14+</span> локаций
                </span>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center gap-2">
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-300">
                  Несколько протоколов
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Globe Network Scene */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Ambient Back Glow */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full relative z-10">
              <NetworkGlobe3D />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
