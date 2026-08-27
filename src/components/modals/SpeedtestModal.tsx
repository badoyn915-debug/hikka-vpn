import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Gauge, Play, ArrowDown, ArrowUp, Wifi, RotateCcw } from 'lucide-react';

export const SpeedtestModal: React.FC = () => {
  const { isSpeedtestOpen, setIsSpeedtestOpen, selectedServer } = useApp();
  const [stage, setStage] = useState<'idle' | 'ping' | 'download' | 'upload' | 'done'>('idle');
  const [pingVal, setPingVal] = useState<number>(0);
  const [jitterVal, setJitterVal] = useState<number>(0);
  const [downloadSpeed, setDownloadSpeed] = useState<number>(0);
  const [uploadSpeed, setUploadSpeed] = useState<number>(0);
  const [currentDisplaySpeed, setCurrentDisplaySpeed] = useState<number>(0);

  useEffect(() => {
    if (!isSpeedtestOpen) {
      setStage('idle');
      setCurrentDisplaySpeed(0);
    }
  }, [isSpeedtestOpen]);

  const startTest = () => {
    setStage('ping');
    setPingVal(0);
    setJitterVal(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setCurrentDisplaySpeed(0);

    setTimeout(() => {
      const p = selectedServer ? selectedServer.ping : 18;
      setPingVal(p);
      setJitterVal(1.2);
      setStage('download');

      let dlTicks = 0;
      const targetDl = 780 + Math.random() * 160;
      const dlInterval = setInterval(() => {
        dlTicks++;
        const curr = Math.min(targetDl, Math.pow(dlTicks / 20, 1.8) * targetDl + (Math.random() * 40 - 20));
        setCurrentDisplaySpeed(Math.round(curr * 10) / 10);

        if (dlTicks >= 25) {
          clearInterval(dlInterval);
          const finalDl = Math.round(targetDl * 10) / 10;
          setDownloadSpeed(finalDl);
          setCurrentDisplaySpeed(0);
          setStage('upload');

          let ulTicks = 0;
          const targetUl = 240 + Math.random() * 120;
          const ulInterval = setInterval(() => {
            ulTicks++;
            const currUl = Math.min(targetUl, Math.pow(ulTicks / 18, 1.5) * targetUl + (Math.random() * 20 - 10));
            setCurrentDisplaySpeed(Math.round(currUl * 10) / 10);

            if (ulTicks >= 20) {
              clearInterval(ulInterval);
              const finalUl = Math.round(targetUl * 10) / 10;
              setUploadSpeed(finalUl);
              setCurrentDisplaySpeed(finalDl);
              setStage('done');
            }
          }, 80);
        }
      }, 70);
    }, 900);
  };

  if (!isSpeedtestOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="liquid-glass rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-white/15 shadow-2xl relative text-center">
        
        {/* Close */}
        <button
          onClick={() => setIsSpeedtestOpen(false)}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-white bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-3">
          <Gauge className="w-3.5 h-3.5 text-white" />
          <span>NETWORK SPEED BENCHMARK</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-1">
          Тест скорости: {selectedServer.country} ({selectedServer.city})
        </h3>
        <p className="text-xs text-slate-300 font-mono mb-6">
          Узел: {selectedServer.code} • Канал: {selectedServer.bandwidth}
        </p>

        {/* Speedometer Gauge Display */}
        <div className="relative my-4 flex flex-col items-center justify-center">
          
          <div className="relative w-56 h-56 rounded-full flex flex-col items-center justify-center liquid-glass border-2 border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.06)]">
            
            <span className="text-[10px] font-mono uppercase tracking-widest text-white mb-1">
              {stage === 'idle' && 'ГОТОВ К ТЕСТУ'}
              {stage === 'ping' && 'ПРОВЕРКА ЗАДЕРЖКИ...'}
              {stage === 'download' && 'ТЕСТ СКАЧИВАНИЯ...'}
              {stage === 'upload' && 'ТЕСТ ЗАГРУЗКИ...'}
              {stage === 'done' && 'ТЕСТ ЗАВЕРШЁН'}
            </span>

            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white tracking-tight">
              {stage === 'idle' ? '0.0' : currentDisplaySpeed.toFixed(1)}
            </div>

            <span className="text-xs font-mono text-slate-300 mt-1">Mbps</span>

            {(stage === 'download' || stage === 'upload') && (
              <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin" />
            )}
          </div>
        </div>

        {/* Results Matrix */}
        <div className="grid grid-cols-3 gap-3 my-6">
          {/* Ping */}
          <div className="liquid-glass-subtle rounded-2xl p-3 border border-white/10 text-left">
            <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300 mb-1">
              <Wifi className="w-3 h-3 text-white" />
              <span>PING</span>
            </div>
            <div className="text-base font-bold font-mono text-white">
              {pingVal ? `${pingVal} ms` : '—'}
            </div>
            <div className="text-[9px] font-mono text-slate-400">
              Jitter: {jitterVal ? `${jitterVal} ms` : '—'}
            </div>
          </div>

          {/* Download */}
          <div className="liquid-glass-subtle rounded-2xl p-3 border border-white/10 text-left">
            <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300 mb-1">
              <ArrowDown className="w-3 h-3 text-white" />
              <span>DOWNLOAD</span>
            </div>
            <div className="text-base font-bold font-mono text-white">
              {downloadSpeed ? `${downloadSpeed} M` : '—'}
            </div>
            <div className="text-[9px] font-mono text-slate-400">4K Ultra Ready</div>
          </div>

          {/* Upload */}
          <div className="liquid-glass-subtle rounded-2xl p-3 border border-white/10 text-left">
            <div className="flex items-center gap-1 text-[10px] font-mono text-slate-300 mb-1">
              <ArrowUp className="w-3 h-3 text-white" />
              <span>UPLOAD</span>
            </div>
            <div className="text-base font-bold font-mono text-white">
              {uploadSpeed ? `${uploadSpeed} M` : '—'}
            </div>
            <div className="text-[9px] font-mono text-slate-400">No Buffering</div>
          </div>
        </div>

        {/* Action Button */}
        {stage === 'idle' || stage === 'done' ? (
          <button
            onClick={startTest}
            className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-200 text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
          >
            {stage === 'done' ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4 fill-black" />}
            <span>{stage === 'done' ? 'Запустить тест повторно' : 'Начать тестирование'}</span>
          </button>
        ) : (
          <div className="text-xs font-mono text-white py-3.5 animate-pulse">
            Тестирование соединения в процессе...
          </div>
        )}

      </div>
    </div>
  );
};
