import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Send, User, Menu, X, Activity, Server, Cpu, CreditCard, HelpCircle, ExternalLink, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentView, setCurrentView, isConnected, isConnecting } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Главная', href: '#hero', icon: Shield },
    { label: 'Серверы', href: '#servers', icon: Server },
    { label: 'Протоколы', href: '#protocols', icon: Cpu },
    { label: 'Тарифы', href: '#tariffs', icon: CreditCard },
    { label: 'Статус', href: '#status', icon: Activity },
    { label: 'FAQ', href: '#faq', icon: HelpCircle }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <nav
          className={`relative rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3.5 flex items-center justify-between ${
            isScrolled
              ? 'bg-[#08090d]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
              : 'bg-[#0d0f17]/60 backdrop-blur-md border border-white/6 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
          }`}
        >
          {/* Brand Logo */}
          <div
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-extrabold tracking-wider text-white font-sans">
                  HIKKA
                </span>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">
                  VPN
                </span>
              </div>
              <span className="text-[9px] text-slate-400 font-mono tracking-tight hidden sm:block">
                NEXT-GEN PRIVACY
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] rounded-xl px-2 py-1">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Action CTAs: Telegram Bot & Dashboard */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Direct Telegram Bot Link */}
            <a
              href="https://t.me/HikkaVPNbot"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-interactive rounded-xl px-3.5 py-2 flex items-center gap-2 text-xs font-medium text-slate-200 hover:text-cyan-300 group"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
              <span className="font-mono">@HikkaVPNbot</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
            </a>

            {/* Dashboard Switcher Button */}
            <button
              onClick={() => setCurrentView(currentView === 'dashboard' ? 'landing' : 'dashboard')}
              className={`rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-semibold transition-all duration-300 relative overflow-hidden ${
                currentView === 'dashboard'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-[0_0_20px_rgba(0,242,254,0.3)] font-bold'
                  : 'liquid-glass text-white hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(0,242,254,0.15)]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{currentView === 'dashboard' ? 'На главную' : 'Личный кабинет'}</span>
              
              {isConnected && currentView !== 'dashboard' && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              )}
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setCurrentView(currentView === 'dashboard' ? 'landing' : 'dashboard')}
              className="liquid-glass rounded-lg p-2 text-slate-300 hover:text-white"
              title="Личный кабинет"
            >
              <User className="w-4 h-4 text-cyan-400" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="liquid-glass rounded-lg p-2 text-slate-300 hover:text-white"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 liquid-glass rounded-2xl p-4 border border-white/10 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center gap-2 text-xs font-medium text-slate-300 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] active:bg-cyan-500/10 active:border-cyan-500/30"
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <a
                href="https://t.me/HikkaVPNbot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 flex items-center justify-center gap-2 text-xs font-medium"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Открыть @HikkaVPNbot</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => {
                  setCurrentView(currentView === 'dashboard' ? 'landing' : 'dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold flex items-center justify-center gap-2 text-xs shadow-lg"
              >
                <User className="w-3.5 h-3.5" />
                <span>{currentView === 'dashboard' ? 'На главную страницу' : 'Личный кабинет'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
