import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, ExternalLink } from 'lucide-react';

interface MockMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  buttons?: { text: string; action: string }[][];
  hasKey?: boolean;
}

export const TelegramSection: React.FC = () => {
  const { showToast, setIsQrModalOpen } = useApp();
  
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
          { text: '💳 Тарифы и периоды', action: 'pricing' }
        ]
      ]
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleBotAction = (action: string, btnText: string) => {
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
          text: '💳 Доступные периоды подписки:\n\n⭐ 12 Месяцев (Максимальная выгода)\n⭐ 6 Месяцев (Полугодовой VIP)\n⭐ 3 Месяца (Популярный)\n⭐ 1 Месяц (Базовый)\n\nОплата: СБП, Российские карты, TON, USDT, Telegram Stars.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          buttons: [
            [{ text: '🚀 Оформить подписку в боте', action: 'open_bot' }]
          ]
        };
      } else if (action === 'copy_key') {
        navigator.clipboard.writeText('vless://9a8b7c6d-5e4f-3a2b-1c0d@ams01.hikkavpn.net:443?security=reality&sni=dl.google.com#HikkaVPN-Amsterdam');
        showToast('Ключ скопирован', 'Конфигурация скопирована в буфер обмена', 'success');
        return;
      } else if (action === 'show_qr') {
        setIsQrModalOpen(true);
        return;
      } else if (action === 'open_bot') {
        window.open('https://t.me/HikkaVPNbot', '_blank');
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-white bg-white/5 border border-white/15 px-3 py-1 rounded-full mb-3">
              <Send className="w-3.5 h-3.5 text-white" />
              <span>SEAMLESS TELEGRAM ECOSYSTEM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Управляй VPN прямо <br />
              <span className="text-white">
                из Telegram
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-6">
              Никаких сложных регистраций и сторонних личных кабинетов. Авторизация, мгновенная выдача ключей, смена протоколов, оплата через СБП/TON и поддержка 24/7 работают прямо в Telegram-боте.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <span className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">✓</span>
                <span>Мгновенная выдача VLESS / WireGuard ключей за 5 секунд</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <span className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">✓</span>
                <span>Оплата через СБП, Карты РФ, TON, USDT и Telegram Stars</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <span className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">✓</span>
                <span>Автоматические уведомления о статусе и продлении</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="https://t.me/HikkaVPNbot"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden rounded-xl bg-white hover:bg-slate-200 text-black font-extrabold px-7 py-3.5 text-sm flex items-center justify-center gap-2.5 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                <Send className="w-4 h-4 fill-black text-black" />
                <span>Открыть @HikkaVPNbot</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="text-xs font-mono text-slate-300 text-center sm:text-left">
                Бот: <span className="text-white font-bold">@HikkaVPNbot</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="liquid-glass rounded-3xl p-4 sm:p-6 border border-white/10 shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-black font-extrabold flex items-center justify-center font-mono shadow-md">
                    HK
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white">Hikka VPN</h4>
                      <span className="w-3.5 h-3.5 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center">✓</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-mono">@HikkaVPNbot • bot</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-white bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>online</span>
                </div>
              </div>

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
                            ? 'bg-[#151822] border border-white/10 text-white shadow-md'
                            : 'bg-white text-black font-semibold shadow-md'
                        }`}
                      >
                        <p className="whitespace-pre-line font-sans break-words">{msg.text}</p>
                        
                        <div
                          className={`text-[9px] mt-1 text-right font-mono ${
                            isBot ? 'text-slate-400' : 'text-black/60 font-semibold'
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>

                      {msg.buttons && (
                        <div className="mt-2 space-y-1.5 w-full max-w-[90%] sm:max-w-[85%]">
                          {msg.buttons.map((row, rIdx) => (
                            <div key={rIdx} className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {row.map((btn, bIdx) => (
                                <button
                                  key={bIdx}
                                  onClick={() => handleBotAction(btn.action, btn.text)}
                                  className="liquid-glass-subtle hover:bg-white/10 active:bg-white/15 text-white text-[11px] font-medium py-2 px-3 rounded-xl border border-white/10 transition-all text-center flex items-center justify-center gap-1.5"
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

                {isTyping && (
                  <div className="flex items-center gap-1 text-[11px] text-white font-mono px-2 py-1">
                    <span>Бот печатает</span>
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                <div className="flex-1 bg-black/50 rounded-xl px-3 py-2 text-xs text-slate-400 font-mono border border-white/10">
                  Нажмите любую кнопку выше для взаимодействия...
                </div>
                <a
                  href="https://t.me/HikkaVPNbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white text-black hover:bg-slate-200 transition-colors shadow-md"
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
