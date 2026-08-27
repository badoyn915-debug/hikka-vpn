import React, { useState, useEffect } from 'react';
import { Shield, Send, Menu, X, Server, Cpu, CreditCard, Activity, HelpCircle, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
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
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <nav
          className={`relative rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3.5 flex items-center justify-between ${
            isScrolled
              ? 'bg-[#08090d]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
              : 'bg-[#0d0f17]/60 backdrop-blur-md border border-white/6 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
          }`}
        >
          <a
            href="#hero"
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <Shield className="w-5 h-5 text-white transition-colors" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-extrabold tracking-wider text-white font-sans">
                  HIKKA
                </span>
                <span className="text-[10px] font-mono tracking-widest text-white font-bold bg-white/10 px-1.5 py-0.5 rounded border border-white/20">
                  VPN
                </span>
              </div>
              <span className="text-[9px] text-slate-400 font-mono tracking-tight hidden sm:block">
                NEXT-GEN PRIVACY
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] rounded-xl px-2 py-1">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.06] transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://t.me/HikkaVPNbot"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-slate-200 text-black font-bold rounded-xl px-4 py-2 flex items-center gap-2 text-xs transition-all duration-300 shadow-md group"
            >
              <Send className="w-3.5 h-3.5 fill-black text-black group-hover:translate-x-0.5 transition-transform" />
              <span>@HikkaVPNbot</span>
              <ExternalLink className="w-3 h-3 text-black/60" />
            </a>
          </div>

          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="liquid-glass rounded-lg p-2 text-white"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </nav>

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
                    className="flex items-center gap-2 text-xs font-medium text-white p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                  >
                    <Icon className="w-4 h-4 text-white" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10">
              <a
                href="https://t.me/HikkaVPNbot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-white hover:bg-slate-200 text-black font-bold flex items-center justify-center gap-2 text-xs shadow-lg"
              >
                <Send className="w-3.5 h-3.5 fill-black text-black" />
                <span>Открыть @HikkaVPNbot</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
