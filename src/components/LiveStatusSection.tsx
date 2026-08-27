import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Activity, Server, Clock, Wifi, ShieldCheck, RefreshCw } from 'lucide-react';

export const LiveStatusSection: React.FC = () => {
  const { statusTelemetry } = useApp();
  const [graphData, setGraphData] = useState<number[]>([45, 52, 48, 65, 72, 68, 84, 78, 82, 89, 85, 91, 84]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData((prev) => {
        const nextVal = Math.max(30, Math.min(100, prev[prev.length - 1] + (Math.random() * 12 - 6)));
        return [...prev.slice(1), Math.round(nextVal)];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = 140);

    ctx.clearRect(0, 0, width, height);

    const step = width / (graphData.length - 1);
    const minVal = 20;
    const maxVal = 110;

    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.04)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.beginPath();
    graphData.forEach((val, i) => {
      const x = i * step;
      const normalized = (val - minVal) / (maxVal - minVal);
      const y = height - normalized * (height - 30) - 15;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        const prevX = (i - 1) * step;
        const prevNormalized = (graphData[i - 1] - minVal) / (maxVal - minVal);
        const prevY = height - prevNormalized * (height - 30) - 15;
        const cx = (prevX + x) / 2;
        ctx.bezierCurveTo(cx, prevY, cx, y, x, y);
      }
    });

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    const lastVal = graphData[graphData.length - 1];
    const lastX = (graphData.length - 1) * step;
    const lastNorm = (lastVal - minVal) / (maxVal - minVal);
    const lastY = height - lastNorm * (height - 30) - 15;

    ctx.beginPath();
    ctx.arc(lastX - 2, lastY, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }, [graphData]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <section id="status" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-white bg-white/5 border border-white/15 px-3 py-1 rounded-full mb-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>LIVE TELEMETRY & STATUS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Состояние сети
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 font-light">
              Мониторинг инфраструктуры в реальном времени. Автоматическая балансировка нагрузки между узлами.
            </p>
          </div>

          <button
            onClick={handleManualRefresh}
            className="self-start sm:self-auto flex items-center gap-2 text-xs font-mono text-white liquid-glass px-3.5 py-2 rounded-xl transition-all border border-white/10"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Обновлено {statusTelemetry.lastUpdated}</span>
          </button>
        </div>

        <div className="liquid-glass rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl relative overflow-hidden mb-8">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            
            <div className="liquid-glass-subtle rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-300 text-xs font-mono mb-3">
                <span>Network Status</span>
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_6px_#ffffff]" />
                  <span>Operational</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Все системы в норме</p>
              </div>
            </div>

            <div className="liquid-glass-subtle rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-300 text-xs font-mono mb-3">
                <span>Активные серверы</span>
                <Server className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {statusTelemetry.activeServers} Online
                </div>
                <p className="text-[11px] text-slate-400 mt-1">100% доступность узлов</p>
              </div>
            </div>

            <div className="liquid-glass-subtle rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-300 text-xs font-mono mb-3">
                <span>Средний пинг (Latency)</span>
                <Wifi className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {statusTelemetry.averageLatency} ms
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Прямые BGP-маршруты</p>
              </div>
            </div>

            <div className="liquid-glass-subtle rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center justify-between text-slate-300 text-xs font-mono mb-3">
                <span>Uptime SLA</span>
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {statusTelemetry.uptime}%
                </div>
                <p className="text-[11px] text-slate-400 mt-1">За последние 90 дней</p>
              </div>
            </div>

          </div>

          <div className="liquid-glass-subtle rounded-2xl p-5 sm:p-6 border border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-white" />
                  <span>Нагрузка глобальной магистрали (Throughput Load)</span>
                </h4>
                <p className="text-xs text-slate-300 font-light mt-0.5">
                  Суммарный поток данных через кластеры Hikka VPN в режиме реального времени
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="text-slate-300">
                  Текущий трафик: <span className="text-white font-bold">{statusTelemetry.currentTrafficGbps} Gbps</span>
                </div>
                <div className="text-slate-300 hidden sm:block">
                  Потери пакетов: <span className="text-white font-bold">{statusTelemetry.packetLoss}%</span>
                </div>
              </div>
            </div>

            <div className="w-full relative h-[140px]">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-white/10">
              <span>-30 мин назад</span>
              <span>-15 мин назад</span>
              <span className="text-white flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                Live Now
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
