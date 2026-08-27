import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Power, 
  ShieldCheck, 
  Wifi, 
  ArrowDown, 
  ArrowUp, 
  Server, 
  Cpu, 
  Clock, 
  Smartphone, 
  Laptop, 
  Router, 
  Trash2, 
  Copy, 
  QrCode, 
  Gauge, 
  ExternalLink, 
  ChevronRight, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Send 
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    isConnected,
    isConnecting,
    selectedServer,
    selectedProtocol,
    connectedServer,
    assignedIp,
    connectionDuration,
    liveDownloadMbps,
    liveUploadMbps,
    toggleConnect,
    servers,
    protocols,
    setSelectedServer,
    setSelectedProtocol,
    userProfile,
    removeUserDevice,
    setIsQrModalOpen,
    setIsSpeedtestOpen,
    showToast,
    setCurrentView
  } = useApp();

  const [copiedKey, setCopiedKey] = useState(false);
  const [serverPickerOpen, setServerPickerOpen] = useState(false);
  const [protocolPickerOpen, setProtocolPickerOpen] = useState(false);

  // Format connection duration seconds to HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(userProfile.subscription.subscriptionKey);
    setCopiedKey(true);
    showToast('Ключ скопирован', 'Ссылка на подписку VLESS Reality скопирована', 'success');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const getDeviceIcon = (type: string) => {
    if (type === 'iphone' || type === 'android') return <Smartphone className="w-4 h-4 text-cyan-400" />;
    if (type === 'router') return <Router className="w-4 h-4 text-purple-400" />;
    return <Laptop className="w-4 h-4 text-blue-400" />;
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Banner: User Profile Header */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 mb-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-extrabold text-xl shadow-[0_0_20px_rgba(0,242,254,0.3)]">
              {userProfile.telegramUsername.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  @{userProfile.telegramUsername}
                </h2>
                <span className="text-[10px] font-mono font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded-full">
                  VIP ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                ID: {userProfile.telegramId} • В сервисе с {userProfile.joinedDate}
              </p>
            </div>
          </div>

          {/* Subscription Expiry Badge & Bot Link */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="liquid-glass-subtle px-4 py-2.5 rounded-xl border border-white/5 flex items-center gap-3">
              <Clock className="w-4 h-4 text-cyan-400" />
              <div className="text-xs">
                <div className="text-slate-400">Подписка активна до:</div>
                <div className="font-mono font-semibold text-white">
                  {userProfile.subscription.expiresAt} ({userProfile.subscription.daysRemaining} дн.)
                </div>
              </div>
            </div>

            <a
              href="https://t.me/HikkaVPNbot"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-interactive px-4 py-2.5 rounded-xl text-xs font-semibold text-cyan-300 flex items-center gap-2 border border-cyan-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>@HikkaVPNbot</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Grid: Connection Controls & Realtime Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Left Column: Big Circular Glow Connect Button & Status Gauge */}
        <div className="lg:col-span-6 liquid-glass rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-2xl">
          
          {/* Subtle Ambient Behind Button */}
          <div
            className={`absolute w-72 h-72 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
              isConnected
                ? 'bg-emerald-500/20 shadow-[0_0_100px_rgba(16,185,129,0.3)]'
                : isConnecting
                ? 'bg-cyan-500/20 animate-pulse'
                : 'bg-white/5'
            }`}
          />

          {/* Status Label */}
          <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
            <span className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isConnected
                    ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]'
                    : isConnecting
                    ? 'bg-amber-400 animate-bounce'
                    : 'bg-slate-600'
                }`}
              />
              <span>
                {isConnected ? 'ЗАЩИЩЕНО' : isConnecting ? 'ПОДКЛЮЧЕНИЕ...' : 'ОТКЛЮЧЕНО'}
              </span>
            </span>

            {isConnected && (
              <span className="text-cyan-400 font-semibold">
                Время: {formatTime(connectionDuration)}
              </span>
            )}
          </div>

          {/* BIG ROUND CONNECT BUTTON */}
          <div className="relative my-4 sm:my-8">
            
            {/* Outer Ripple Wave Rings when Connected / Connecting */}
            {isConnected && (
              <>
                <div className="absolute -inset-4 rounded-full border border-emerald-500/30 animate-ping opacity-30 pointer-events-none" />
                <div className="absolute -inset-8 rounded-full border border-emerald-500/15 pointer-events-none" />
              </>
            )}

            <button
              onClick={toggleConnect}
              disabled={isConnecting}
              className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center transition-all duration-500 cursor-pointer select-none group ${
                isConnected
                  ? 'bg-gradient-to-tr from-emerald-950/80 via-emerald-900/40 to-teal-950/90 border-2 border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.4),inset_0_0_30px_rgba(16,185,129,0.3)] hover:scale-105'
                  : isConnecting
                  ? 'bg-cyan-950/60 border-2 border-cyan-400 animate-pulse shadow-[0_0_30px_rgba(0,242,254,0.3)]'
                  : 'liquid-glass border-2 border-white/20 hover:border-cyan-400/80 shadow-[0_0_30px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(0,242,254,0.25)] hover:scale-105'
              }`}
            >
              <Power
                className={`w-12 h-12 sm:w-14 sm:h-14 mb-2 transition-all duration-300 ${
                  isConnected
                    ? 'text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]'
                    : isConnecting
                    ? 'text-cyan-300 animate-spin'
                    : 'text-slate-400 group-hover:text-cyan-400'
                }`}
              />

              <span
                className={`text-base sm:text-lg font-mono font-extrabold tracking-wider ${
                  isConnected
                    ? 'text-emerald-300'
                    : isConnecting
                    ? 'text-cyan-300'
                    : 'text-white group-hover:text-cyan-300'
                }`}
              >
                {isConnected ? 'CONNECTED' : isConnecting ? 'LINKING...' : 'CONNECT'}
              </span>

              <span className="text-[10px] font-mono text-slate-400 mt-1">
                {isConnected ? 'Нажмите для отключения' : 'Нажмите для защиты'}
              </span>
            </button>
          </div>

          {/* Live Speedometer & Assigned IP */}
          <div className="w-full grid grid-cols-2 gap-3 pt-6 border-t border-white/8 mt-4">
            
            {/* Download Speed */}
            <div className="liquid-glass-subtle rounded-xl p-3 border border-white/5 text-left">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
                <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>DOWNLOAD</span>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">
                {isConnected ? `${liveDownloadMbps} Mbps` : '—'}
              </div>
            </div>

            {/* Upload Speed */}
            <div className="liquid-glass-subtle rounded-xl p-3 border border-white/5 text-left">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
                <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>UPLOAD</span>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">
                {isConnected ? `${liveUploadMbps} Mbps` : '—'}
              </div>
            </div>

          </div>

          {/* Quick Speedtest trigger */}
          <button
            onClick={() => setIsSpeedtestOpen(true)}
            className="w-full mt-3 py-2.5 rounded-xl liquid-glass-subtle hover:bg-cyan-500/10 text-xs font-semibold text-slate-300 hover:text-cyan-300 flex items-center justify-center gap-2 border border-white/5 hover:border-cyan-500/20 transition-all"
          >
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>Запустить тест скорости (Speedtest)</span>
          </button>

        </div>

        {/* Right Column: Node & Protocol Selectors & Config Links */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Server Selector Card */}
          <div className="liquid-glass rounded-3xl p-6 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Server className="w-4 h-4" />
                <span>ВЫБРАННЫЙ УЗЕЛ (LOCATION)</span>
              </div>
              <button
                onClick={() => setServerPickerOpen(!serverPickerOpen)}
                className="text-xs text-cyan-400 hover:underline font-mono"
              >
                {serverPickerOpen ? 'Свернуть' : 'Сменить'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/8">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedServer.flag}</span>
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{selectedServer.country}</span>
                    {selectedServer.isSpecialRussia && (
                      <span className="text-[9px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                        RU Full Work
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    {selectedServer.city} ({selectedServer.code})
                  </p>
                </div>
              </div>

              <div className="text-right font-mono">
                <div className="text-sm font-bold text-cyan-400">{selectedServer.ping} ms</div>
                <div className="text-[11px] text-slate-500">{selectedServer.bandwidth}</div>
              </div>
            </div>

            {/* Expandable Server List */}
            {serverPickerOpen && (
              <div className="mt-4 pt-4 border-t border-white/8 space-y-2 max-h-56 overflow-y-auto pr-1">
                {servers.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => {
                      setSelectedServer(srv);
                      setServerPickerOpen(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      selectedServer.id === srv.id
                        ? 'bg-cyan-950/60 border border-cyan-500/40'
                        : 'hover:bg-white/[0.04] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span>{srv.flag}</span>
                      <span className="text-xs font-semibold text-white">{srv.country} ({srv.city})</span>
                    </div>
                    <span className="text-xs font-mono text-cyan-400">{srv.ping} ms</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Protocol Selector Card */}
          <div className="liquid-glass rounded-3xl p-6 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Cpu className="w-4 h-4" />
                <span>ПРОТОКОЛ МАСКИРОВКИ</span>
              </div>
              <button
                onClick={() => setProtocolPickerOpen(!protocolPickerOpen)}
                className="text-xs text-cyan-400 hover:underline font-mono"
              >
                {protocolPickerOpen ? 'Свернуть' : 'Сменить'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/8">
              <div>
                <h4 className="text-sm font-bold text-white">{selectedProtocol.name}</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedProtocol.encryption}</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/30">
                {selectedProtocol.shortCode}
              </span>
            </div>

            {protocolPickerOpen && (
              <div className="mt-4 pt-4 border-t border-white/8 space-y-2">
                {protocols.map((proto) => (
                  <div
                    key={proto.id}
                    onClick={() => {
                      setSelectedProtocol(proto);
                      setProtocolPickerOpen(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      selectedProtocol.id === proto.id
                        ? 'bg-cyan-950/60 border border-cyan-500/40'
                        : 'hover:bg-white/[0.04] border border-transparent'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold text-white">{proto.name}</span>
                      <p className="text-[10px] text-slate-400">{proto.badges.join(' • ')}</p>
                    </div>
                    <span className="text-xs font-mono text-cyan-400">{proto.shortCode}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Subscription Key & QR Modal */}
          <div className="liquid-glass rounded-3xl p-6 border border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400">КЛЮЧ ПОДПИСКИ (VLESS)</span>
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-mono"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Показать QR-код</span>
              </button>
            </div>

            <div className="flex items-center gap-2 p-3 bg-black/40 rounded-xl border border-white/5">
              <input
                type="text"
                readOnly
                value={userProfile.subscription.subscriptionKey}
                className="bg-transparent text-xs font-mono text-slate-400 truncate flex-1 focus:outline-none"
              />
              <button
                onClick={handleCopyKey}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-cyan-500 hover:text-black transition-all text-xs font-semibold flex items-center gap-1 shrink-0"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? 'Скопировано' : 'Копировать'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Connected Devices Manager */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">Активные устройства</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Используется {userProfile.devices.length} из {userProfile.subscription.maxDevices} доступных слотов
            </p>
          </div>

          <a
            href="https://t.me/HikkaVPNbot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Добавить через бота</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userProfile.devices.map((device) => (
            <div
              key={device.id}
              className="liquid-glass-subtle rounded-2xl p-4 border border-white/6 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/8 flex items-center justify-center">
                  {getDeviceIcon(device.type)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{device.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {device.ip} • {device.lastActive}
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeUserDevice(device.id)}
                title="Отключить устройство"
                className="text-slate-500 hover:text-rose-400 p-2 rounded-lg hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
