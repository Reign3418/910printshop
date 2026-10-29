import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  MapPin,
  Phone,
  MessageCircle,
  Calculator,
  Shield,
  Clock,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function HeroShopCard() {
  const {
    shopInfo,
    shopStatus,
    announcements,
    setIsEstimatorModalOpen,
    setIsPackagesModalOpen,
    setIsShopSimOpen
  } = useShop();

  const currentMode = shopStatus.currentMode;

  return (
    <section className="relative border-b border-[#1E293B] bg-[#0B0E14] overflow-hidden">
      {/* Subtle Background Image Layer with High-Contrast Gradient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="./images/alpha-beavers-van-wrap.jpg"
          alt="910 PrintShop Commercial Van Wrap Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E14] via-[#0B0E14]/90 to-[#0B0E14]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left 7 Columns: Value Proposition & Primary Actions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-cyan-500/15 border border-cyan-400 text-cyan-300 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Veteran-Owned &amp; Latino-Owned • Fayetteville, NC</span>
            </span>

            <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 px-3 py-1 text-xs font-mono font-bold uppercase">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{currentMode.statusBadge}</span>
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase font-['Bebas_Neue'] tracking-wide text-white leading-[0.95]">
            Turn Every Vehicle, Crew &amp; Banner Into a{' '}
            <span className="text-cyan-400">24/7 Lead Machine</span> on Bragg Blvd.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            From commercial cargo van wraps and HOA-safe truck magnets to custom Fort Bragg military unit t-shirts, contour car decals, and heavy-duty vinyl banners—engineered, printed, and installed at{' '}
            <strong className="text-white">4315 Bragg Blvd, Fayetteville, NC 28303</strong>.
          </p>

          {/* Primary Action Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsEstimatorModalOpen(true)}
              className="px-5 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer rounded-none shadow-lg"
            >
              <Calculator className="w-4 h-4 stroke-[2.5]" />
              <span>Launch Instant Wrap &amp; Print Estimator</span>
            </button>

            <a
              href={shopInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 rounded-none shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message on WhatsApp</span>
            </a>

            <a
              href={`tel:${shopInfo.phoneRaw}`}
              className="px-4 py-3.5 bg-[#151D28] hover:bg-[#1E2938] text-white border border-slate-600 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 rounded-none"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call {shopInfo.phoneDisplay}</span>
            </a>
          </div>

          {/* Quick Trust Bullets */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-cyan-400" />
              <span>3M &amp; Avery Cast Vinyl</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-amber-400" />
              <span>Zero-Min Custom Shirts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-400" />
              <span>Bilingual (EN / Español)</span>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Live Bragg Blvd Shop Telemetry & Featured Wrap Card */}
        <div className="lg:col-span-5 bg-[#111722] border-2 border-[#263346] p-5 space-y-4 shadow-2xl rounded-none">
          <div className="flex items-center justify-between border-b border-[#222E40] pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block">
                Live Showroom &amp; Wrap Bay Status
              </span>
              <h2 className="text-lg font-black uppercase font-['Bebas_Neue'] tracking-wider text-white">
                {currentMode.name}
              </h2>
            </div>
            <button
              onClick={() => setIsShopSimOpen(true)}
              className="px-2.5 py-1 bg-emerald-600/20 border border-emerald-500/50 text-emerald-300 text-[11px] font-mono font-bold uppercase cursor-pointer hover:bg-emerald-600/30"
            >
              🚐 View Bay Sim
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <a
              href={shopInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 p-2.5 bg-[#0B0F17] border border-[#1E293B] hover:border-cyan-400 transition group"
            >
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-bold text-white group-hover:text-cyan-300 flex items-center gap-1">
                  <span>{shopInfo.address}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </div>
                <div className="text-slate-400 text-[11px] font-mono">
                  Minutes from Fort Bragg All American &amp; Yadkin Gates
                </div>
              </div>
            </a>

            <div className="flex items-start gap-2.5 p-2.5 bg-[#0B0F17] border border-[#1E293B]">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white">{currentMode.hours}</div>
                <div className="text-slate-400 text-[11px]">{announcements.bayNote}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={shopInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#182232] hover:bg-[#223046] text-cyan-300 border border-cyan-500/40 font-bold text-xs uppercase tracking-wider text-center rounded-none"
            >
              📍 Google Maps Directions
            </a>

            <button
              onClick={() => setIsPackagesModalOpen(true)}
              className="py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer rounded-none"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>View Bundle Deals</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
