import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import TopMarqueeBar from '../TopMarqueeBar';
import Header from '../Header';
import MainCatalogSection from '../MainCatalogSection';
import PackagesSpotlight from '../PackagesSpotlight';
import PortfolioSection from '../PortfolioSection';
import Footer from '../Footer';
import {
  Shield,
  Calculator,
  MessageCircle,
  Phone,
  Sparkles,
  Layers,
  Sticker,
  Car,
  Shirt,
  CheckCircle2
} from 'lucide-react';

const VINYL_SWATCHES = [
  {
    id: 'magenta-contour',
    name: 'Neon Magenta Contour',
    filmCode: '3M™ 2080 Gloss Fierce Fuchsia + White Cast Layer',
    dotClass: 'from-pink-400 via-pink-500 to-rose-600',
    borderGlow: 'border-pink-400 shadow-[0_10px_30px_rgba(236,72,153,0.3)]',
    accentText: 'text-pink-400',
    pillBg: 'bg-pink-500 text-white',
    application: 'Multi-Layer Show-Car Window Decals, Drift Team Banners & Die-Cut Stickers',
    previewImg: './images/custom-car-decal-pink.jpg',
    previewLabel: 'Multi-Layer Plotter Cut • Zero Background Film'
  },
  {
    id: 'cyber-cyan',
    name: 'Cyber Wrap Cyan',
    filmCode: 'Avery Dennison® SW900 Gloss Aqua / UV Overlaminate',
    dotClass: 'from-cyan-300 via-cyan-400 to-blue-600',
    borderGlow: 'border-cyan-400 shadow-[0_10px_30px_rgba(6,182,212,0.3)]',
    accentText: 'text-cyan-300',
    pillBg: 'bg-cyan-400 text-slate-950',
    application: 'Full & Partial Commercial Van Wraps (RAM ProMaster, Transit, Sprinter & Trailers)',
    previewImg: './images/alpha-beavers-van-wrap.jpg',
    previewLabel: 'High-ROI Commercial Fleet Wrap • 24/7 Rolling Billboard'
  },
  {
    id: 'tactical-gold',
    name: 'Airborne Tactical Gold',
    filmCode: 'Full-Color DTF + Cast Metallic Gold / Olive Drab',
    dotClass: 'from-amber-300 via-amber-400 to-orange-600',
    borderGlow: 'border-amber-400 shadow-[0_10px_30px_rgba(245,158,11,0.3)]',
    accentText: 'text-amber-400',
    pillBg: 'bg-amber-400 text-slate-950',
    application: 'Fort Bragg Unit PT/Deployment Shirts, Hail & Farewell Banners & Unit Crest Stickers',
    previewImg: './images/military-airborne-tshirt.jpg',
    previewLabel: 'Soft-Hand Multi-Tone DTF Print & Die-Cut Unit Stickers'
  },
  {
    id: 'acid-lime',
    name: 'High-Vis Acid Lime',
    filmCode: '3M™ Reflective & High-Contrast Contractor Grade Vinyl',
    dotClass: 'from-lime-300 via-emerald-400 to-green-600',
    borderGlow: 'border-emerald-400 shadow-[0_10px_30px_rgba(16,185,129,0.3)]',
    accentText: 'text-emerald-400',
    pillBg: 'bg-emerald-400 text-slate-950',
    application: '30-Mil Removable Truck Magnets, USDOT Door Kits & High-Vis Crew Shirts',
    previewImg: './images/alpha-beavers-van-wrap.jpg',
    previewLabel: 'Reads Clearly From 4 Car-Lengths Back on Bragg Blvd'
  }
];

export default function TacticalLayout() {
  const { shopInfo, setIsEstimatorModalOpen, setIsPackagesModalOpen } = useShop();
  const [activeSwatchId, setActiveSwatchId] = useState('magenta-contour');

  const activeSwatch =
    VINYL_SWATCHES.find((s) => s.id === activeSwatchId) || VINYL_SWATCHES[0];

  return (
    <div className="vinyl-studio-bg text-[#F4F6F0] w-full max-w-full overflow-x-hidden">
      <div className="hidden md:block">
        <TopMarqueeBar />
      </div>

      <Header />

      {/* Mobile Slim Tactical Bar with 3D Pill Button */}
      <div className="md:hidden bg-[#141C16] border-b border-[#2D3C2F] px-3 py-2.5 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 min-w-0 truncate">
          <Sticker className="w-4 h-4 text-pink-400 shrink-0" />
          <span className="font-bold text-amber-300 truncate">
            Wraps, Vinyls &amp; Stickers • 4315 Bragg Blvd
          </span>
        </div>
        <button
          onClick={() => setIsEstimatorModalOpen(true)}
          className="btn-3d-amber font-black text-[10px] uppercase px-3 py-1.5 shrink-0 flex items-center gap-1 cursor-pointer"
        >
          <Calculator className="w-3 h-3" />
          <span>Quote</span>
        </button>
      </div>

      {/* Desktop & Tablet Hero: The Art of Wraps, Layered Vinyls & Die-Cut Stickers */}
      <section className="border-b border-[#2A382C] py-8 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 7 Columns: Tactile 3D Copy, Vinyl Finish Switcher & Chunky 3D Buttons */}
          <div className="lg:col-span-7 space-y-5">
            {/* Die-Cut Sticker Header Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 px-4 py-1.5 text-xs font-mono font-black uppercase tracking-wider border-2 border-white shadow-[0_4px_0_#78350F]">
                <Shield className="w-3.5 h-3.5" />
                <span>Fort Bragg &amp; Bragg Blvd Veteran-Owned</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3.5 py-1.5 text-xs font-mono font-black uppercase tracking-wider border-2 border-white shadow-[0_4px_0_#831843] -rotate-1">
                <Sticker className="w-3.5 h-3.5" />
                <span>Custom Vinyls, Wraps &amp; Die-Cut Stickers</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase font-['Bebas_Neue'] tracking-wide text-white leading-[0.95] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              Pushing the Art of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-300">
                Commercial Wraps, Layered Vinyls
              </span>{' '}
              &amp; Die-Cut Stickers.
            </h1>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl">
              Great vinyl isn&apos;t just ink on plastic—it&apos;s precision contour registration, liquid-gloss UV laminates, and bold street presence. Right at{' '}
              <strong className="text-amber-300">4315 Bragg Blvd</strong>, we craft full commercial RAM ProMaster wraps, multi-layer show-car window graphics, weatherproof die-cut unit stickers, and custom Airborne apparel.
            </p>

            {/* Interactive 3D Vinyl & Sticker Material Swatch Selector */}
            <div className="bg-[#151D17]/90 border-2 border-[#344839] rounded-3xl p-4 sm:p-5 space-y-3 shadow-[0_10px_25px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-pink-400" />
                  <span>Tap a 3D Vinyl / Sticker Finish to Inspect Spec:</span>
                </span>
                <span className="text-[11px] font-mono text-stone-400 hidden sm:inline">
                  In-House Plotter, Wide-Format &amp; DTF Press
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-1 pb-1">
                {VINYL_SWATCHES.map((sw) => {
                  const isSelected = sw.id === activeSwatch.id;
                  return (
                    <button
                      key={sw.id}
                      type="button"
                      onClick={() => setActiveSwatchId(sw.id)}
                      className={`group flex items-center gap-2 px-3.5 py-2 rounded-full font-mono text-xs font-black uppercase cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-white text-slate-950 border-2 border-amber-300 shadow-[0_5px_0_#000,0_10px_20px_rgba(255,255,255,0.2)] -translate-y-0.5'
                          : 'bg-[#1E2921] text-stone-200 border-2 border-[#3A4E3E] shadow-[0_4px_0_#0A0E0B] hover:-translate-y-0.5'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full bg-gradient-to-br ${sw.dotClass} border border-white shadow-inner shrink-0`}
                      />
                      <span>{sw.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#2A3A2E] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className={`font-mono font-black uppercase ${activeSwatch.accentText}`}>
                    {activeSwatch.filmCode}
                  </span>
                  <p className="text-stone-300 text-xs mt-0.5">{activeSwatch.application}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-300 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>UV &amp; Pressure-Washer Safe</span>
                </span>
              </div>
            </div>

            {/* Chunky Rounded 3D Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 pb-2">
              <button
                onClick={() => setIsEstimatorModalOpen(true)}
                className="btn-3d-amber px-6 py-3.5 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 stroke-[2.5]" />
                <span>Open Wrap, Vinyl &amp; Sticker Estimator</span>
              </button>

              <a
                href={shopInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d-emerald px-6 py-3.5 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Artwork / Crest</span>
              </a>

              <button
                onClick={() => setIsPackagesModalOpen(true)}
                className="btn-3d-magenta px-5 py-3.5 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Bundle Deals</span>
              </button>

              <a
                href={`tel:${shopInfo.phoneRaw}`}
                className="btn-3d-dark px-5 py-3.5 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{shopInfo.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right 5 Columns: Die-Cut Sticker Showcase Cards with White Kiss-Cut Borders & 3D Depth */}
          <div className="lg:col-span-5 space-y-4">
            {/* Primary Interactive Die-Cut Sticker Preview Card */}
            <div
              className={`diecut-sticker-card bg-[#161F19] p-4 space-y-3 relative overflow-hidden ${activeSwatch.borderGlow}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-mono font-black uppercase border border-white shadow ${activeSwatch.pillBg}`}
                >
                  ✨ Live Craft Spotlight: {activeSwatch.name}
                </span>
                <span className="text-[10px] font-mono font-bold text-stone-300 bg-black/50 px-2.5 py-1 rounded-full border border-white/20">
                  4315 Bragg Blvd Bay
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border-2 border-white/80 aspect-[16/10] bg-black">
                <img
                  src={activeSwatch.previewImg}
                  alt={activeSwatch.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/80 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">
                    {activeSwatch.previewLabel}
                  </span>
                  <span className="text-[10px] font-mono font-black text-amber-300 uppercase shrink-0 ml-2">
                    In-House Cut
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Pair of Die-Cut Sticker Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setActiveSwatchId('tactical-gold')}
                className="diecut-sticker-card bg-[#18221A] p-3 space-y-2 cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden border-2 border-white/80 h-32">
                  <img
                    src="./images/military-airborne-tshirt.jpg"
                    alt="Fort Bragg Custom Military Shirt & Sticker Print"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 rounded-full bg-amber-400 text-slate-950 font-mono font-black text-[9px] uppercase px-2 py-0.5 border border-white shadow">
                    Shirt + Sticker Packs
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-300 font-mono">
                  <Shirt className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Unit Apparel &amp; Crests</span>
                </div>
                <p className="text-[11px] text-stone-300 leading-snug">
                  No minimums • Custom Airborne tees, hoodies &amp; die-cut unit decals.
                </p>
              </div>

              <div
                onClick={() => setActiveSwatchId('cyber-cyan')}
                className="diecut-sticker-card bg-[#18221A] p-3 space-y-2 cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden border-2 border-white/80 h-32">
                  <img
                    src="./images/alpha-beavers-van-wrap.jpg"
                    alt="Commercial Contractor Van Wrap Fayetteville NC"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 rounded-full bg-cyan-400 text-slate-950 font-mono font-black text-[9px] uppercase px-2 py-0.5 border border-white shadow">
                    3M / Avery Cast Wrap
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black uppercase text-cyan-300 font-mono">
                  <Car className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Fleet Wraps &amp; Magnets</span>
                </div>
                <p className="text-[11px] text-stone-300 leading-snug">
                  Full &amp; partial wraps, 30-mil magnets &amp; contour window vinyl.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MainCatalogSection />
      <PackagesSpotlight />
      <PortfolioSection />
      <Footer />
    </div>
  );
}
