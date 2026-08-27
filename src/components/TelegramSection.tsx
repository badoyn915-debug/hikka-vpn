import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, CheckCircle2, Shield, QrCode, Zap, Globe, Sparkles, ExternalLink, MessageSquare, ArrowRight, RefreshCw } from 'lucide-react';

interface MockMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  buttons?: { text: string; action: string }[][];
  hasKey?: boolean;
}

export const TelegramSection: React.FC = () => {
  const { showToast, setIsQrModalOpen, setCheckoutPlan, tariffs } = useApp();
  
  const [messages, setMessages] = useState<MockMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: '👋 Приветствую в HIKKA VPN! Ваш персональный ключ и доступ к 14+ локациям готовы к настройке.',
      timestamp: '10:42',
      buttons: [
        [
          { text: '🔑 Получить ключ подключения', action: 'get_key' },
          { text: '⚡ Тест пинга', action: 'ping_test' }
        ],
        [
          { text: '🌍 Список серверов', action: 'list_servers' },
          { text: '💳 Продлить подписку', action: 'pricing' }
        ]
      ]
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleBotAction = (action: string, btnText: string) => {
    // Add user click message
    const userMsg: MockMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: btnText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply: MockMessage;

      if (action === 'get_key') {
        reply = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: '🔐 Ваш универсальный ключ VLESS Reality (подходит для iOS, Android, Windows, Mac):\n\nvless://9a8b7c6d-5e4f-3a2b-1c0d@ams01.hikkavpn.net:443?security=reality&sni=dl.google.com#HikkaVPN-Amsterdam\n\nСкопируйте ссылку и откройте приложение Happ, Streisand, v2rayN или Shadowrocket.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hasKey: true,
          buttons: [
            [
              { text: '📋 Скопировать ключ', action: 'copy_key' },
              { text: '📱 Показать QR-код', action: 'show_qr' }
            ]
          ]
        };
      } else if (action === 'ping_test') {
        reply = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: '⚡ Результаты проверки задержки:\n\n🇷🇺 Москва (RU Full Work): 4 ms 🟢\n🇳🇱 Амстердам: 18 ms 🟢\n🇩🇪 Франкфурт: 22 ms 🟢\n🇪🇪 Таллин: 12 ms 🟢\n\nВсе кластеры работают на 10 Gbps.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          buttons: [
            [{ text: '🔄 Обновить замеры', action: 'ping_test' }]
          ]
        };
      } else if (action === 'pricing') {
        reply = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: '💳 Выберите тарифный план для подключения:\n\n⭐ 12 Месяцев — 120 ₽/мес (ХИТ)\n⭐ 6 Месяцев — 150 ₽/мес\n⭐ 1 Месяц — 190 ₽/мес\n\nОплата: СБП, Российские карты, TON, USDT, Telegram Stars.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          buttons: [
            [{ text: '🚀 Выбрать 12 Месяцев (120 ₽/мес)', action: 'buy_12m' }]
          ]
        };
      } else if (action === 'copy_key') {
        navigator.clipboard.writeText('vless://9a8b7c6d-5e4f-3a2b-1c0d@ams01.hikkavpn.net:443?security=reality&sni=dl.google.com#HikkaVPN-Amsterdam');
        showToast('Ключ скопирован', 'Конфигурация скопирована в буфер обмена', 'success');
        return;
      } else if (action === 'show_qr') {
        setIsQrModalOpen(true);
        return;
      } else if (action === 'buy_12m') {
        setCheckoutPlan(tariffs.find((t) => t.id === 'plan-12m') || tariffs[0]);
        return;
      } else {
        reply = {
          id: 'bot-' + Date.now(),
          sender: 'bot',
          text: '🌐 Доступно 14+ серверов в Европе, РФ, Азии и США. Подключение осуществляется по протоколам VLESS Reality и Shadowsocks 2022.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          buttons: [
            [{ text: '🔑 Получить ключ подключения', action: 'get_key' }]
          ]
        };
      }

      setMessages((prev) => [...prev, reply]);
    }, 650);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context & Direct CTA */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full mb-3">
              <Send className="w-3.5 h-3.5" />
              <span>SEAMLESS TELEGRAM ECOSYSTEM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Управляй VPN прямо <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                из Telegram
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-6">
              Никаких сложных регистраций и сторонних личных кабинетов. Авторизация, мгновенная выдача ключей, смена протоколов, оплата через СБП/TON и поддержка 24/7 работают прямо в Telegram-боте.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">✓</span>
                <span>Мгновенная выдача VLESS / WireGuard ключей за 5 секунд</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">✓</span>
                <span>Оплата через СБП, Карты РФ, TON, USDT и Telegram Stars</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">✓</span>
                <span>Автоматические уведомления о статусе и продлении</span>
              </div>
            </div>

            {/* Main Bot CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="https://t.me/HikkaVPNbot"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold px-7 py-3.5 text-sm flex items-center justify-center gap-2.5 transition-all shadow-[0_0_25px_rgba(0,242,254,0.35)]"
              >
                <Send className="w-4 h-4" />
                <span>Открыть @HikkaVPNbot</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="text-xs font-mono text-slate-400 text-center sm:text-left">
                Бот: <span className="text-cyan-300 font-semibold">@HikkaVPNbot</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Liquid Glass Telegram Mockup */}
          <div className="lg:col-span-6">
            <div className="liquid-glass rounded-3xl p-4 sm:p-6 border border-white/10 shadow-2xl relative">
              
              {/* Telegram App Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold font-mono shadow-md">
                    HK
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white">Hikka VPN</h4>
                      <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 text-black text-[9px] font-bold flex items-center justify-center">✓</span>
                    </div>
                    <p className="text-[11px] text-cyan-400 font-mono">@HikkaVPNbot • bot</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>online</span>
                </div>
              </div>

              {/* Chat Body (Scrollable container) */}
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                {messages.map((msg) => {
                  const isBot = msg.sender === 'bot';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`rounded-2xl p-3.5 text-xs max-w-[90%] sm:max-w-[85%] leading-relaxed ${
                          isBot
                            ? 'bg-[#151924]/90 border border-white/8 text-slate-200 shadow-md'
                            : 'bg-cyan-500 text-black font-medium shadow-md'
                        }`}
                      >
                        <p className="whitespace-pre-line font-sans break-words">{msg.text}</p>
                        
                        <div
                          className={`text-[9px] mt-1 text-right font-mono ${
                            isBot ? 'text-slate-500' : 'text-cyan-950 font-semibold'
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>

                      {/* Inline Action Buttons */}
                      {msg.buttons && (
                        <div className="mt-2 space-y-1.5 w-full max-w-[90%] sm:max-w-[85%]">
                          {msg.buttons.map((row, rIdx) => (
                            <div key={rIdx} className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {row.map((btn, bIdx) => (
                                <button
                                  key={bIdx}
                                  onClick={() => handleBotAction(btn.action, btn.text)}
                                  className="liquid-glass-subtle hover:bg-cyan-500/20 active:bg-cyan-500/30 text-slate-200 hover:text-cyan-300 text-[11px] font-medium py-2 px-3 rounded-xl border border-white/8 transition-all text-center flex items-center justify-center gap-1.5"
                                >
                                  <span>{btn.text}</span>
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono px-2 py-1">
                    <span>Бот печатает</span>
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                )}
              </div>

              {/* Mock Chat Input Footer */}
              <div className="mt-4 pt-3 border-t border-white/8 flex items-center gap-2">
                <div className="flex-1 bg-black/40 rounded-xl px-3 py-2 text-xs text-slate-500 font-mono border border-white/5">
                  Нажмите любую кнопку выше для взаимодействия...
                </div>
                <a
                  href="https://t.me/HikkaVPNbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 transition-colors shadow-md"
                  title="Открыть в Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
