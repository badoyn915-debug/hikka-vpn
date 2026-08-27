import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs: FaqItem[] = [
    {
      q: 'Как подключить VPN после оплаты?',
      a: 'Сразу после оплаты в боте @HikkaVPNbot вы получите персональный универсальный ключ (VLESS или WireGuard) и ссылку на быструю установку. Достаточно нажать «Импортировать в приложение» (Happ / Streisand для iOS, v2rayNG для Android, v2rayN для Windows) и нажать кнопку Connect.',
      category: 'setup'
    },
    {
      q: 'Будет ли работать YouTube, Discord и заблокированные сайты в РФ?',
      a: 'Да, на 100%. Наш ключевой протокол VLESS + Reality маскирует VPN-соединение под обычный браузерный трафик до легитимных сайтов (например, dl.google.com), что делает его невидимым для ТСПУ и систем DPI операторов.',
      category: 'speed'
    },
    {
      q: 'Сколько устройств можно подключить на одну подписку?',
      a: 'В зависимости от тарифа вы можете одновременно использовать от 5 до 10 устройств (iPhone, Android, Mac, Windows, Linux, Smart TV и роутеры) без дополнительной платы.',
      category: 'devices'
    },
    {
      q: 'В чём разница между обычным сервером и режимом «РФ Full Work»?',
      a: 'Сервер «РФ Full Work» расположен внутри России с прямыми стыками к крупнейшим операторам. Он предназначен для защиты трафика внутри страны и доступа к Кинопоиску, Госуслугам и банкам с минимальным пингом от 2 до 8 ms.',
      category: 'servers'
    },
    {
      q: 'Ведёте ли вы логи трафика и посещений?',
      a: 'Категорически нет. Все серверы Hikka VPN развёрнуты на RAM-дисках. Логи сетевых сессий и посещённых адресов физически не сохраняются и не записываются на диск.',
      category: 'privacy'
    },
    {
      q: 'Какие способы оплаты поддерживаются?',
      a: 'Мы принимаем оплату через Систему Быстрых Платежей (СБП), любые российские банковские карты (МИР, Visa, Mastercard), криптовалюту (TON, USDT TRC-20/TON), а также Telegram Stars прямо внутри мессенджера.',
      category: 'payment'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-white bg-white/5 border border-white/15 px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-white" />
            <span>KNOWLEDGE BASE & SUPPORT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Часто задаваемые вопросы
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 font-light">
            Ответы на популярные вопросы о протоколах, установке на устройства и безопасности.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по вопросам (например: YouTube, протоколы, роутер, оплата)..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all backdrop-blur-md"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className={`liquid-glass rounded-2xl transition-all duration-200 border ${
                  isOpen ? 'border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.06)]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-white font-sans">
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 shrink-0 ${isOpen ? 'bg-white/20 text-white rotate-180' : 'bg-white/5 text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4 text-white" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-light border-t border-white/10 animate-in fade-in duration-200">
                    <p className="whitespace-pre-line">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Telegram Help Footer */}
        <div className="mt-12 text-center text-xs text-slate-300">
          Остались вопросы? Напишите нам в Telegram-боте:{' '}
          <a
            href="https://t.me/HikkaVPNbot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline font-mono font-bold"
          >
            @HikkaVPNbot
          </a>
        </div>

      </div>
    </section>
  );
};
