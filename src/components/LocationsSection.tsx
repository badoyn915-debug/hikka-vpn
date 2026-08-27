import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServerLocation, RegionCategory } from '../types/vpn';
import { Wifi, Shield, ArrowRight, Check, Zap, Globe, Send, ExternalLink } from 'lucide-react';

export const LocationsSection: React.FC = () => {
  const { servers, setSelectedServer, selectedServer, testServerPing, setActiveConfigServer } = useApp();
  const [activeFilter, setActiveFilter] = useState<RegionCategory>('all');
  const [testingPingId, setTestingPingId] = useState<string | null>(null);

  const filters: { key: RegionCategory; label: string; count?: number }[] = [
    { key: 'all', label: 'Все локации', count: servers.length },
    { key: 'europe', label: 'Европа', count: servers.filter((s) => s.region === 'europe').length },
    { key: 'russia', label: 'Россия', count: servers.filter((s) => s.region === 'russia').length },
    { key: 'asia_usa', label: 'Азия & США', count: servers.filter((s) => s.region === 'asia_usa').length }
  ];

  const filteredServers = servers.filter((srv) => {
    if (activeFilter === 'all') return true;
    return srv.region === activeFilter;
  });

  const handlePingTest = async (e: React.MouseEvent, serverId: string) => {
    e.stopPropagation();
    setTestingPingId(serverId);
    await testServerPing(serverId);
    setTimeout(() => {
      setTestingPingId(null);
    }, 400);
  };

  const handleSelectServer = (server: ServerLocation) => {
    setSelectedServer(server);
    setActiveConfigServer(server);
  };

  return (
    <section id="servers" className="py-24 relative overflow-hidden">
      {/* Subtle background ambient line */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full mb-3">
              <Globe className="w-3.5 h-3.5" />
              <span>GLOBAL HIGH-SPEED NODES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Серверы по всему миру
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl font-light">
              Высокоскоростная инфраструктура 10 Gbps с прямыми маршрутами и специальным режимом Full Work для стабильного доступа из РФ.
            </p>
          </div>

          {/* Region Filters */}
          <div className="flex items-center gap-1.5 p-1.5 liquid-glass rounded-xl border border-white/8 overflow-x-auto max-w-full">
            {filters.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  activeFilter === tab.key
                    ? 'bg-white/10 text-white shadow-sm border border-white/10 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] font-mono text-slate-500 bg-black/40 px-1.5 py-0.2 rounded">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Server Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredServers.map((server) => {
            const isSelected = selectedServer.id === server.id;
            const isTesting = testingPingId === server.id;

            return (
              <div
                key={server.id}
                onClick={() => handleSelectServer(server)}
                className={`group relative liquid-glass-interactive rounded-2xl p-5 cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                  isSelected ? 'border-cyan-500/50 bg-cyan-950/20 shadow-[0_0_25px_rgba(0,242,254,0.15)]' : ''
                }`}
              >
                {/* Russian Full Work Special Badge */}
                {server.isSpecialRussia && (
                  <div className="absolute -top-2.5 right-4 z-20">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-[#061524] border border-cyan-400/40 px-2.5 py-0.5 rounded-full shadow-md">
                      🇷🇺 Full Work
                    </span>
                  </div>
                )}

                {/* Card Top: Flag, Country, Status */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl filter drop-shadow">{server.flag}</span>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {server.country}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">
                          {server.city} • <span className="text-slate-500">{server.code}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
                      <span className="text-[11px] font-mono text-emerald-400 uppercase">
                        Online
                      </span>
                    </div>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {server.features.slice(0, 2).map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-slate-300 bg-white/[0.03] border border-white/6 px-2 py-0.5 rounded-md"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom: Ping, Bandwidth, Connect Action to Bot */}
                <div className="pt-3 border-t border-white/6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Ping Indicator Button */}
                    <button
                      onClick={(e) => handlePingTest(e, server.id)}
                      title="Проверить пинг"
                      className="flex items-center gap-1 text-xs font-mono text-slate-300 hover:text-cyan-300 bg-white/[0.04] hover:bg-cyan-500/10 px-2 py-1 rounded border border-white/5 hover:border-cyan-500/30 transition-all"
                    >
                      <Wifi className={`w-3 h-3 text-cyan-400 ${isTesting ? 'animate-spin' : ''}`} />
                      <span className="font-semibold text-cyan-300">
                        {isTesting ? '...' : `${server.ping} ms`}
                      </span>
                    </button>

                    <span className="text-[11px] font-mono text-slate-500">
                      {server.bandwidth}
                    </span>
                  </div>

                  {/* Direct Bot Link */}
                  <a
                    href={`https://t.me/HikkaVPNbot?start=server_${server.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 px-2.5 py-1 rounded-lg border border-cyan-500/30 transition-all"
                  >
                    <Send className="w-3 h-3" />
                    <span>В бот</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Note */}
        <div className="mt-8 liquid-glass-subtle rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/6">
          <div className="flex items-center gap-3 text-xs text-slate-300 text-center sm:text-left">
            <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Все серверы работают на RAM-дисках без сохранения логов. Управление и ключи выдаются в Telegram.
            </span>
          </div>

          <a
            href="https://t.me/HikkaVPNbot?start=servers_list"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Получить список в @HikkaVPNbot</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
