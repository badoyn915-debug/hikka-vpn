import React from 'react';
import { Shield, Send, ExternalLink, Heart, Lock, Cpu, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="border-t border-white/6 bg-[#030406] py-16 relative overflow-hidden text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/6">
          
          {/* Brand Col */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-base font-extrabold tracking-wider text-white">
                HIKKA VPN
              </span>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/30">
                PRO
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6 font-light">
              Премиальный VPN-сервис нового поколения. Высокоскоростные 10 Gbps серверы, обход блокировок по протоколу VLESS Reality и управление в Telegram-боте.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://t.me/HikkaVPNbot"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-subtle px-3.5 py-2 rounded-xl text-slate-200 hover:text-cyan-300 flex items-center gap-2 border border-white/5 hover:border-cyan-500/30 transition-all font-mono"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>@HikkaVPNbot</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-4">
              Навигация
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Главная страница</a>
              </li>
              <li>
                <a href="#servers" className="hover:text-white transition-colors">Серверы и локации</a>
              </li>
              <li>
                <a href="#protocols" className="hover:text-white transition-colors">Поддерживаемые протоколы</a>
              </li>
              <li>
                <a href="#tariffs" className="hover:text-white transition-colors">Тарифные планы</a>
              </li>
              <li>
                <a href="#status" className="hover:text-white transition-colors">Мониторинг сети</a>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="hover:text-cyan-300 text-cyan-400 transition-colors font-medium text-left"
                >
                  Личный кабинет
                </button>
              </li>
            </ul>
          </div>

          {/* Technology & Protocols */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-4">
              Технологии и Стандарты
            </h4>
            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>RAM-Only Diskless Servers (No-Logs)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>VLESS XTLS-Vision + Reality</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>10 Gbps Tier-1 Fiber Uplinks</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>DNS Leak & IPv6 Protection</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div>
            © 2026 Hikka VPN (@HikkaVPNbot). Все права защищены.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Политика приватности</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Условия использования</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Все узлы в сети
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
