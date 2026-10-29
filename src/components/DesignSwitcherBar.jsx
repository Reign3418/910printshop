import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  Palette,
  Layers,
  Shield,
  Printer,
  Calculator,
  Wrench,
  Tv,
  Search,
  Lock
} from 'lucide-react';

export default function DesignSwitcherBar({ onLockSite }) {
  const {
    themeVersion,
    setThemeVersion,
    setIsShopAdminOpen,
    setIsTvBoardOpen,
    setIsShopSimOpen,
    setIsDiscoveryWhitePageOpen,
    setIsEstimatorModalOpen
  } = useShop();

  const themes = [
    {
      id: 'carbon',
      name: '1. Garage Carbon',
      subtitle: 'Matte Carbon, Neon Cyan & Wrap Bay Energy',
      icon: Layers,
      colorDot: 'bg-[#06B6D4]'
    },
    {
      id: 'tactical',
      name: '2. Bragg Tactical',
      subtitle: 'Fort Bragg Olive, Veteran Gold & Unit Pride',
      icon: Shield,
      colorDot: 'bg-[#F59E0B]'
    },
    {
      id: 'studio',
      name: '3. Print Studio',
      subtitle: 'Daylight Proof Paper, CMYK & Clean Grid',
      icon: Printer,
      colorDot: 'bg-[#EC4899]'
    }
  ];

  return (
    <div className="bg-[#07090C] border-b border-[#1E2633] py-1.5 px-2.5 sm:py-2 sm:px-3 text-xs z-50 relative w-full max-w-full overflow-hidden">
      {/* ===================================================================== */}
      {/* MOBILE SLIM BAR (<768px): 100% Zero Overflow, Smooth & Compact        */}
      {/* ===================================================================== */}
      <div className="md:hidden flex items-center justify-between gap-1.5 w-full">
        <div className="flex items-center gap-1 min-w-0">
          <Palette className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <select
            value={themeVersion}
            onChange={(e) => setThemeVersion(e.target.value)}
            className="bg-[#121720] text-cyan-200 border border-[#263244] text-[11px] font-bold py-1 px-1.5 rounded-none focus:outline-none focus:border-cyan-400 max-w-[125px] truncate"
            aria-label="Select design layout"
          >
            <option value="carbon">🚐 Garage Carbon</option>
            <option value="tactical">🪖 Bragg Tactical</option>
            <option value="studio">🖨️ Print Studio</option>
          </select>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setIsDiscoveryWhitePageOpen(true)}
            className="p-1 px-1.5 rounded-none bg-cyan-400 text-slate-950 font-black text-[11px] flex items-center gap-0.5 shadow cursor-pointer"
            title="Open Master White Paper (Showroom TV, NFC Wrap Badges, Fort Bragg & Search)"
          >
            <span>📄 White Paper</span>
          </button>

          <button
            onClick={() => setIsShopSimOpen(true)}
            className="p-1 px-1.5 rounded-none bg-emerald-600 text-white font-black text-[11px] flex items-center gap-0.5 shadow cursor-pointer"
            title="Live Showroom TV + Phone Simulator"
          >
            <span>🚐 Sim</span>
          </button>

          <button
            onClick={() => setIsEstimatorModalOpen(true)}
            className="p-1 px-1.5 rounded-none bg-amber-500 text-slate-950 font-black text-[11px] flex items-center gap-0.5 shadow cursor-pointer"
            title="Instant Wrap & Print Quote Calculator"
          >
            <span>🧮 Quote</span>
          </button>

          <button
            onClick={() => setIsShopAdminOpen(true)}
            className="p-1 px-1.5 rounded-none bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold text-[11px] flex items-center gap-0.5 cursor-pointer"
            title="Shop Owner Quick Admin"
          >
            <span>Edit</span>
          </button>

          <button
            onClick={() => setIsTvBoardOpen(true)}
            className="p-1 px-1.5 rounded-none bg-[#141C26] border border-cyan-500/40 text-cyan-300 font-bold text-[11px] flex items-center gap-0.5 cursor-pointer"
            title="1080p Showroom TV Board"
          >
            <span>TV</span>
          </button>

          {onLockSite && (
            <button
              onClick={onLockSite}
              className="p-1 px-1.5 rounded-none bg-rose-950 text-rose-300 border border-rose-700/70 font-bold text-[11px] cursor-pointer"
              title="Lock Site"
            >
              🔒
            </button>
          )}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* DESKTOP BAR (>=768px): Single-Row Crisp Control Strip                 */}
      {/* ===================================================================== */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center justify-between gap-2">
        {/* Left: #1 White Paper Hero Button + 3 Concept Layout Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsDiscoveryWhitePageOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-none text-xs font-black uppercase tracking-wider transition cursor-pointer bg-cyan-400 hover:bg-cyan-300 text-slate-950 border-2 border-white shadow-md mr-1"
            title="Open the Master White Paper: Showroom TV Box, 7-In Counter Touch Deck, QR/NFC Wrap Badges & Being Found"
          >
            <Search className="w-3.5 h-3.5 text-slate-950 shrink-0 stroke-[2.5]" />
            <span className="whitespace-nowrap">📄 White Paper</span>
          </button>

          <div className="h-4 w-px bg-slate-700 mx-0.5 hidden lg:block"></div>

          <Palette className="w-3.5 h-3.5 text-cyan-400 shrink-0 hidden lg:inline" />
          <span className="font-bold uppercase tracking-wider text-[11px] text-cyan-300 hidden xl:inline">
            Layouts:
          </span>
          {themes.map((t) => {
            const isActive = themeVersion === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setThemeVersion(t.id)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-none text-xs font-bold transition cursor-pointer border ${
                  isActive
                    ? 'bg-[#131B26] text-white border-cyan-400 shadow-md ring-1 ring-cyan-400/50'
                    : 'bg-[#0C1017] text-slate-400 hover:text-slate-200 border-[#1E2836] hover:border-slate-600'
                }`}
              >
                <span className={`w-2 h-2 rounded-none ${t.colorDot} shrink-0`}></span>
                <span className="whitespace-nowrap">{t.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Action & Simulator Buttons */}
        <div className="flex items-center gap-1.5 justify-end shrink-0">
          <button
            onClick={() => setIsShopSimOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-none text-xs font-black transition cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400 shadow-sm"
            title="See 910 PrintShop's 4315 Bragg Blvd Showroom TV controlled live by phone or 7-inch counter touch deck"
          >
            <span className="whitespace-nowrap">🚐 Shop + Phone Sim</span>
          </button>

          <button
            onClick={() => setIsEstimatorModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-none text-xs font-black transition cursor-pointer bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm"
            title="Interactive Vehicle Wrap, Unit T-Shirt Bulk & Banner Quote Estimator"
          >
            <Calculator className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Quote Estimator</span>
          </button>

          <button
            onClick={() => setIsShopAdminOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-none text-xs font-black transition cursor-pointer bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-sm"
            title="10-Second Shop Owner Admin: edit prices, toggle Wrap Bay & 24h Rush status"
          >
            <Wrench className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Edit Shop</span>
          </button>

          <button
            onClick={() => setIsTvBoardOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-none text-xs font-black transition cursor-pointer bg-[#141D28] hover:bg-[#1D2A3A] text-cyan-300 hover:text-white border border-cyan-500/40 shadow-sm"
            title="Open 1080p Showroom TV Board or export a fresh JPG for USB drive"
          >
            <Tv className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="whitespace-nowrap">1080p TV Board</span>
          </button>

          {onLockSite && (
            <button
              onClick={onLockSite}
              className="flex items-center gap-1 px-2 py-1 rounded-none text-xs font-black transition cursor-pointer bg-rose-950/90 hover:bg-rose-800 text-rose-200 border border-rose-700/70 shadow-sm"
              title="Lock entire site behind the 4-digit PIN gate (0863)"
            >
              <Lock className="w-3 h-3 text-rose-400 shrink-0" />
              <span className="whitespace-nowrap">Lock</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
