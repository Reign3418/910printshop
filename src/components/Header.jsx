import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  Phone,
  MessageCircle,
  MapPin,
  Calculator,
  Sparkles,
  FileText,
  Shield
} from 'lucide-react';

export default function Header() {
  const {
    shopInfo,
    themeVersion,
    quoteItemCount,
    setIsQuoteDrawerOpen,
    setIsEstimatorModalOpen,
    setIsPackagesModalOpen
  } = useShop();

  const isStudio = themeVersion === 'studio';
  const isTactical = themeVersion === 'tactical';

  return (
    <header
      className={`border-b px-3 sm:px-6 py-3 sticky top-0 z-30 ${
        isStudio
          ? 'bg-white/95 border-slate-300 text-slate-900 backdrop-blur'
          : isTactical
          ? 'bg-[#0F1410]/95 border-[#29382B] text-[#F4F6F0] backdrop-blur'
          : 'bg-[#0B0E14]/95 border-[#1E293B] text-white backdrop-blur'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Identity */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="./images/alpha-beavers-van-wrap.jpg"
            alt="910 PrintShop Fayetteville NC Commercial Vehicle Wraps"
            className={`w-11 h-11 sm:w-12 sm:h-12 object-cover border-2 shrink-0 rounded-none ${
              isTactical
                ? 'border-amber-500'
                : isStudio
                ? 'border-slate-900'
                : 'border-cyan-400'
            }`}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black uppercase font-['Bebas_Neue'] tracking-wider leading-none">
                910 PrintShop
              </span>
              <span
                className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold uppercase border ${
                  isTactical
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : isStudio
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                }`}
              >
                <Shield className="w-3 h-3" />
                <span>Veteran-Owned</span>
              </span>
            </div>
            <div
              className={`text-[11px] font-mono truncate ${
                isStudio ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              4315 Bragg Blvd, Fayetteville, NC • Wraps, Shirts, Decals &amp; Banners
            </div>
          </div>
        </div>

        {/* Right Quick CTAs */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsEstimatorModalOpen(true)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase tracking-wider cursor-pointer border rounded-none ${
              isTactical
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-300'
                : isStudio
                ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
                : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 border-cyan-300'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Quote Calculator</span>
          </button>

          <button
            onClick={() => setIsPackagesModalOpen(true)}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer border rounded-none ${
              isStudio
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300'
                : 'bg-[#161F2C] hover:bg-[#1E2A3B] text-amber-300 border-amber-500/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bundle Deals</span>
          </button>

          <a
            href={shopInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider rounded-none shadow"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">WhatsApp</span>
          </a>

          <a
            href={`tel:${shopInfo.phoneRaw}`}
            className={`hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase tracking-wider border rounded-none ${
              isStudio
                ? 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50'
                : 'bg-[#141C26] border-slate-700 text-white hover:border-cyan-400'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{shopInfo.phoneDisplay}</span>
          </a>

          <button
            onClick={() => setIsQuoteDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#1A2433] hover:bg-[#243247] text-cyan-300 border border-cyan-500/50 text-xs font-black uppercase tracking-wider cursor-pointer rounded-none"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Quote ({quoteItemCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
}
