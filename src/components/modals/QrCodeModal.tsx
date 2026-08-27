import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, QrCode, Copy, Check, Smartphone, Shield, ExternalLink } from 'lucide-react';

export const QrCodeModal: React.FC = () => {
  const { isQrModalOpen, setIsQrModalOpen, userProfile, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isQrModalOpen) return null;

  const keyString = userProfile.subscription.subscriptionKey;

  const handleCopy = () => {
    navigator.clipboard.writeText(keyString);
    setCopied(true);
    showToast('Скопировано', 'Ключ конфигурации скопирован в буфер', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="liquid-glass rounded-3xl max-w-md w-full p-6 sm:p-8 border border-white/10 shadow-2xl relative text-center">
        
        {/* Close */}
        <button
          onClick={() => setIsQrModalOpen(false)}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-xl hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full mb-3">
          <QrCode className="w-3.5 h-3.5" />
          <span>SCAN TO CONNECT</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-1">
          QR-код для импорта в приложение
        </h3>
        <p className="text-xs text-slate-400 font-light mb-6">
          Откройте камеру или VPN-клиент (Happ, Streisand, v2rayNG, Shadowrocket) и отсканируйте код.
        </p>

        {/* Futuristic Liquid Glass QR Container */}
        <div className="relative mx-auto w-64 h-64 p-4 rounded-3xl bg-white/[0.04] border border-white/15 shadow-[0_0_40px_rgba(0,242,254,0.15)] flex items-center justify-center mb-6 overflow-hidden">
          
          {/* Subtle glowing corner markers */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

          {/* Clean Vector High-Contrast QR Code */}
          <div className="bg-white p-3 rounded-2xl shadow-inner">
            <svg viewBox="0 0 100 100" className="w-48 h-48 block">
              {/* QR Finder patterns */}
              <rect x="5" y="5" width="26" height="26" fill="#000" rx="3" />
              <rect x="9" y="9" width="18" height="18" fill="#fff" rx="2" />
              <rect x="13" y="13" width="10" height="10" fill="#000" rx="1.5" />

              <rect x="69" y="5" width="26" height="26" fill="#000" rx="3" />
              <rect x="73" y="9" width="18" height="18" fill="#fff" rx="2" />
              <rect x="77" y="13" width="10" height="10" fill="#000" rx="1.5" />

              <rect x="5" y="69" width="26" height="26" fill="#000" rx="3" />
              <rect x="9" y="73" width="18" height="18" fill="#fff" rx="2" />
              <rect x="13" y="77" width="10" height="10" fill="#000" rx="1.5" />

              {/* Data matrix dots */}
              <rect x="36" y="8" width="6" height="6" fill="#000" />
              <rect x="46" y="8" width="6" height="6" fill="#000" />
              <rect x="56" y="8" width="6" height="6" fill="#000" />
              <rect x="36" y="18" width="6" height="6" fill="#000" />
              <rect x="46" y="18" width="6" height="6" fill="#000" />
              <rect x="56" y="24" width="6" height="6" fill="#000" />

              <rect x="8" y="36" width="6" height="6" fill="#000" />
              <rect x="18" y="36" width="6" height="6" fill="#000" />
              <rect x="28" y="46" width="6" height="6" fill="#000" />
              <rect x="38" y="38" width="8" height="8" fill="#000" />
              <rect x="50" y="38" width="6" height="6" fill="#000" />
              <rect x="60" y="38" width="6" height="6" fill="#000" />
              <rect x="72" y="38" width="6" height="6" fill="#000" />
              <rect x="84" y="38" width="6" height="6" fill="#000" />

              <rect x="38" y="50" width="6" height="6" fill="#000" />
              <rect x="50" y="50" width="8" height="8" fill="#000" />
              <rect x="64" y="50" width="6" height="6" fill="#000" />
              <rect x="76" y="50" width="6" height="6" fill="#000" />

              <rect x="36" y="68" width="6" height="6" fill="#000" />
              <rect x="46" y="74" width="6" height="6" fill="#000" />
              <rect x="56" y="68" width="6" height="6" fill="#000" />
              <rect x="68" y="68" width="6" height="6" fill="#000" />
              <rect x="78" y="78" width="6" height="6" fill="#000" />
              <rect x="88" y="72" width="6" height="6" fill="#000" />
              <rect x="88" y="86" width="6" height="6" fill="#000" />
              <rect x="46" y="86" width="6" height="6" fill="#000" />
              <rect x="60" y="86" width="6" height="6" fill="#000" />
            </svg>
          </div>
        </div>

        {/* Copy config button */}
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.25)] transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Скопировано!' : 'Скопировать ключ VLESS'}</span>
          </button>
        </div>

        <div className="mt-4 text-[11px] font-mono text-slate-400">
          Протокол: <span className="text-cyan-300">VLESS + Reality (TLS 1.3)</span>
        </div>
      </div>
    </div>
  );
};
