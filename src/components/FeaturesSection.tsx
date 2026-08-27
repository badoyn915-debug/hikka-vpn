import React from 'react';
import { Sparkles } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      code: '01 / PRIVACY',
      title: 'Privacy',
      description: 'Защищённое VPN-соединение на базе RAM-дисков без сохранения логов и истории запросов. Полная конфиденциальность.',
      tag: 'Zero-Logs'
    },
    {
      code: '02 / LOCATIONS',
      title: 'Multiple Locations',
      description: 'Выбор серверов в разных странах мира с прямыми маршрутами DE-CIX и AMS-IX и специальным режимом Full Work для РФ.',
      tag: '14+ Стран'
    },
    {
      code: '03 / PROTOCOLS',
      title: 'Multiple Protocols',
      description: 'Несколько вариантов подключения: VLESS Reality (XTLS), Shadowsocks 2022, WireGuard, Hysteria 2 и Trojan-GFW.',
      tag: 'Anti-DPI'
    },
    {
      code: '04 / TELEGRAM',
      title: 'Telegram Integration',
      description: 'Управление VPN через Telegram: получение конфигураций в 1 клик, проверка баланса, оплата и мгновенная поддержка.',
      tag: '@HikkaVPNbot'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-white bg-white/5 border border-white/15 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>CORE PRINCIPLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Почему Hikka VPN
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 font-light">
            Продукт разработан с акцентом на стабильность, высокую скорость и бескомпромиссную безопасность ваших данных.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="liquid-glass-interactive rounded-2xl p-6 flex flex-col justify-between group hover:border-white/30 transition-all duration-300 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono tracking-wider text-slate-300 font-semibold">
                    {item.code}
                  </span>
                  <span className="text-[10px] font-mono text-white bg-white/10 px-2 py-0.5 rounded border border-white/15">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2.5">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>ACTIVE STANDARD</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
