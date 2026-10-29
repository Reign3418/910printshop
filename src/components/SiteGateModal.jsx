import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Delete } from 'lucide-react';

// Last 4 digits of 910 PrintShop's phone number (910) 920-0863 -> '0863'
// Stored as char codes so a casual Ctrl+F in source doesn't show the literal string
const EXPECTED_PIN = String.fromCharCode(48, 56, 54, 51);

export default function SiteGateModal({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleDigit = (digit) => {
    if (pin.length >= 4) return;
    const nextPin = pin + digit;
    setPin(nextPin);
    setError(false);

    if (nextPin.length === 4) {
      if (nextPin === EXPECTED_PIN) {
        try {
          sessionStorage.setItem('910printshop_site_unlocked', 'true');
        } catch {
          // ignore storage errors
        }
        onUnlock();
      } else {
        setError(true);
        setTimeout(() => {
          setPin('');
        }, 650);
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <div className="min-h-screen w-full bg-[#07090C] text-[#F8FAFC] flex flex-col items-center justify-center p-4 select-none relative overflow-hidden">
      {/* Subtle Ambient Cyan & Crimson Wrap Bay Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.14)_0%,transparent_65%)]" />

      <div className="relative z-10 w-full max-w-sm bg-[#0E1217] border-2 border-[#262F3D] shadow-2xl p-6 space-y-5 rounded-none">
        {/* Top Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2.5">
          <div className="relative">
            <img
              src="./images/alpha-beavers-van-wrap.jpg"
              alt="910 PrintShop Commercial Van Wrap"
              className="w-20 h-20 object-cover border-2 border-cyan-400 shadow-lg rounded-none"
            />
            <span className="absolute -bottom-2 -right-2 bg-cyan-400 text-slate-950 p-1 border border-slate-950">
              <Lock className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="space-y-1 pt-1">
            <div className="inline-flex items-center gap-1.5 bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              <span>Private Shop Owner Preview</span>
            </div>
            <h1 className="text-3xl font-black uppercase font-['Bebas_Neue'] tracking-wider text-white">
              910 PrintShop
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              4315 Bragg Blvd • Enter 4-Digit Access Code
            </p>
          </div>
        </div>

        {/* 4-Digit PIN Display Boxes */}
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-2.5 max-w-[240px] mx-auto">
            {[0, 1, 2, 3].map((idx) => {
              const filled = idx < pin.length;
              return (
                <div
                  key={idx}
                  className={`h-13 flex items-center justify-center border-2 font-mono text-2xl font-black transition-all rounded-none ${
                    error
                      ? 'border-rose-500 bg-rose-950/50 text-rose-300'
                      : filled
                      ? 'border-cyan-400 bg-[#141E28] text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                      : 'border-[#242E3C] bg-[#090C10] text-slate-600'
                  }`}
                >
                  {filled ? '●' : ''}
                </div>
              );
            })}
          </div>

          {error ? (
            <p className="text-center text-[11px] font-mono font-bold text-rose-400 uppercase tracking-wider">
              Invalid Access Code — Try Again
            </p>
          ) : (
            <p className="text-center text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Veteran-Owned • Wraps, Apparel &amp; Signage Preview
            </p>
          )}
        </div>

        {/* Tactile 90-Degree Touch Keypad */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleDigit(digit)}
              className="h-12 bg-[#151B24] hover:bg-[#1E2734] active:bg-cyan-400 active:text-slate-950 border border-[#283344] text-white font-mono font-black text-lg transition cursor-pointer rounded-none"
            >
              {digit}
            </button>
          ))}

          <button
            type="button"
            onClick={handleClear}
            className="h-12 bg-[#10141B] hover:bg-slate-800 border border-[#222B38] text-slate-400 font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer rounded-none"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="h-12 bg-[#151B24] hover:bg-[#1E2734] active:bg-cyan-400 active:text-slate-950 border border-[#283344] text-white font-mono font-black text-lg transition cursor-pointer rounded-none"
          >
            0
          </button>

          <button
            type="button"
            onClick={handleBackspace}
            className="h-12 bg-[#10141B] hover:bg-slate-800 border border-[#222B38] text-slate-300 flex items-center justify-center transition cursor-pointer rounded-none"
            aria-label="Backspace"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#1F2733] text-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          Authorized Access Only • All Rights Reserved
        </div>
      </div>
    </div>
  );
}
