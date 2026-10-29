import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Smartphone,
  Tv,
  Wifi,
  Shield,
  Zap,
  MapPin,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Monitor,
  RotateCcw,
  Truck,
  Shirt,
  Printer,
  Layers,
  Phone
} from 'lucide-react';

export default function ShopTwinModal() {
  const {
    shopInfo,
    portfolio,
    catalog,
    packages,
    shopStatus,
    announcements,
    setAnnouncements,
    tvBoardTheme,
    setTvBoardTheme,
    isShopSimOpen,
    setIsShopSimOpen,
    setIsTvBoardOpen,
    setIsDiscoveryWhitePageOpen,
    toggleItemAvailability,
    editCatalogItem,
    togglePackageAvailability,
    editPackage,
    toggleWrapBayStatus,
    toggleRushPrintStatus,
    triggerVolumeTier,
    updateCurrentShopMode,
    resetToDefaults,
    getEffectivePriceObj,
    lastSyncPulse,
    lanSyncInfo
  } = useShop();

  const [phoneTab, setPhoneTab] = useState('bay'); // 'bay' | 'pricing' | 'mode'
  const [controlDevice, setControlDevice] = useState('counter7'); // 'counter7' | 'phone'
  const [isTvZoomed, setIsTvZoomed] = useState(false);
  const [showRigGuide, setShowRigGuide] = useState(false);
  const [syncFlash, setSyncFlash] = useState(false);
  const [rotateSlide, setRotateSlide] = useState(0); // 0 = Full Board, 1 = Portfolio & Package Spotlight
  const [shieldFlashing, setShieldFlashing] = useState(false);

  // Measure the TV bezel container so our 1280x720 HD TV board scales with pixel-perfect sharpness
  const tvBezelRef = useRef(null);
  const [tvScale, setTvScale] = useState({ x: 0.35, y: 0.35 });

  useEffect(() => {
    const el = tvBezelRef.current;
    if (!el) return;
    const updateScale = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setTvScale({
          x: rect.width / 1280,
          y: rect.height / 720
        });
      }
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    window.addEventListener('resize', updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [isShopSimOpen, isTvZoomed]);

  // Trigger the 1.3-second "Veteran Shield Emblem Screen Bumper Flash" whenever Volume Tier changes
  useEffect(() => {
    if (!announcements.shieldFlashTimestamp) return;
    setShieldFlashing(true);
    const t = setTimeout(() => setShieldFlashing(false), 1300);
    return () => clearTimeout(t);
  }, [announcements.shieldFlashTimestamp]);

  // Auto-rotate the TV screen between Full Showroom Menu and Giant Spotlight when tvRotateMode is enabled
  useEffect(() => {
    if (!announcements.tvRotateMode) {
      setRotateSlide(0);
      return;
    }
    const timer = setInterval(() => {
      setRotateSlide(prev => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.tvRotateMode]);

  // Trigger a brief visual wireless pulse whenever state changes
  useEffect(() => {
    if (!lastSyncPulse) return;
    setSyncFlash(true);
    const t = setTimeout(() => setSyncFlash(false), 650);
    return () => clearTimeout(t);
  }, [lastSyncPulse, catalog, packages, announcements, shopStatus, tvBoardTheme]);

  if (!isShopSimOpen) return null;

  const currentMode = shopStatus?.currentMode || shopStatus?.presets?.[0] || {
    id: 'standard-open',
    name: '4315 Bragg Blvd Showroom — Open & Taking Orders',
    address: '4315 Bragg Blvd, Fayetteville, NC 28303',
    hours: 'Mon–Fri 9AM–6PM • Sat 10AM–4PM',
    statusBadge: 'WRAP BAY & PRINT PRESS OPEN',
    notes: 'Walk-ins welcome on Bragg Blvd or message us on WhatsApp (910) 920-0863 for instant proofs.'
  };

  const tierPct = Number(announcements.priceTierDiscount || 0);
  const isTacticalTheme = tvBoardTheme === 'tacticalGold';

  // Launch dedicated 2nd HDMI window for Showroom TV / GAEMS Monitor
  const handleLaunchSecondHdmiWindow = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    window.open(
      `${baseUrl}?tv=1#tv-display`,
      '910PrintShopHDMI',
      'width=1280,height=720,menubar=no,toolbar=no,location=no,status=no'
    );
  };

  // Key items for quick 1-tap demo on the controller
  const quickWraps = catalog.wraps?.items || [];
  const quickApparel = catalog.apparel?.items || [];
  const quickSignage = catalog.signage?.items?.slice(0, 3) || [];

  // Helper to adjust any catalog item's price by +$10 or -$10 live
  const handleStepPrice = (categoryKey, item, delta) => {
    const currentNum =
      item.numericPrice || parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 50;
    const nextNum = Math.max(10, currentNum + delta);
    editCatalogItem(categoryKey, item.id, {
      price: `$${nextNum.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`,
      numericPrice: nextNum
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#06080B]/95 backdrop-blur-md flex flex-col overflow-y-auto rounded-none animate-fadeIn">
      {/* =================================================================== */}
      {/* TOP COMMAND BAR                                                     */}
      {/* =================================================================== */}
      <div className="bg-[#0B0E14] border-b border-cyan-500/40 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0 rounded-none">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="bg-cyan-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-none uppercase tracking-wider font-mono flex items-center gap-1.5 shadow">
            <Tv className="w-3.5 h-3.5" />
            <span>4315 Bragg Blvd Showroom &amp; Wrap Bay Twin</span>
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-200 hidden sm:inline">
            7&quot; Counter Touch Deck &amp; Phone → 55&quot; Showroom HDMI TV Board
          </span>
          <span
            className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-none border transition-all ${
              syncFlash
                ? 'bg-emerald-400 text-slate-950 border-emerald-200 scale-105 shadow-lg'
                : 'bg-emerald-950/60 text-emerald-400 border-emerald-700/50'
            }`}
          >
            {syncFlash
              ? '📡 SYNC PULSE SENT (<4ms)'
              : lanSyncInfo?.active
              ? `🟢 LAN SYNC ACTIVE (${lanSyncInfo.lanIp})`
              : '🟢 LIVE COUNTER-TO-TV LINK ACTIVE'}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* 1-Click Pop-Out for 2nd HDMI Window */}
          <button
            onClick={handleLaunchSecondHdmiWindow}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer shadow border border-emerald-400"
            title="Opens a second 1080p TV window (?tv=1#tv-display) to drag onto your Showroom HDMI TV or GAEMS monitor"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Launch 2nd HDMI Window (?tv=1#tv-display)</span>
          </button>

          {/* Toggle Showroom Hardware & NFC Blueprint */}
          <button
            onClick={() => setShowRigGuide(!showRigGuide)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-bold border transition cursor-pointer ${
              showRigGuide
                ? 'bg-cyan-400 text-slate-950 border-cyan-300'
                : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border-slate-700'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>
              {showRigGuide
                ? 'Hide Showroom Hardware Blueprint'
                : '🛠️ Showroom TV + Counter Deck + NFC Blueprint'}
            </span>
          </button>

          {/* Close Button */}
          <button
            onClick={() => setIsShopSimOpen(false)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-none bg-slate-900 hover:bg-rose-900 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Close Twin</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* COLLAPSIBLE HARDWARE GUIDE: SHOWROOM TV + COUNTER DECK + NFC        */}
      {/* =================================================================== */}
      {showRigGuide && (
        <div className="bg-[#0E131B] border-b-2 border-cyan-500/60 px-4 sm:px-8 py-4 text-xs text-slate-200 rounded-none">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
                <Wifi className="w-4 h-4 text-emerald-400" />
                <span>
                  4315 Bragg Blvd Showroom Architecture: 55&quot; HDMI Board + 7&quot; Counter Deck +
                  NFC Proofing Coasters
                </span>
              </h3>
              <button
                onClick={() => setShowRigGuide(false)}
                className="text-slate-400 hover:text-white font-mono text-[11px] underline cursor-pointer"
              >
                Close Blueprint
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#090C11] border border-cyan-500/50 p-3.5 rounded-none space-y-2">
                <div className="text-cyan-400 font-black font-mono uppercase">
                  1. Bragg Blvd Wi-Fi &amp; QR Proofing Funnel
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Contractors and Fort Bragg unit reps walking into <strong>4315 Bragg Blvd</strong>{' '}
                  see your live 55&quot; Showroom TV board and scan or tap to send artwork directly to{' '}
                  <strong>(910) 920-0863</strong> on WhatsApp.
                </p>
              </div>

              <div className="bg-[#090C11] border border-emerald-500/50 p-3.5 rounded-none space-y-2">
                <div className="text-emerald-400 font-black font-mono uppercase">
                  2. 7&quot; Countertop Touch Deck (Next to Heat Press)
                </div>
                <p className="text-slate-300 leading-relaxed">
                  While running the DTF shirt press or laying 3M cast vinyl in the wrap bay, tap the{' '}
                  <strong>7&quot; Counter Touch Deck</strong> or your smartphone to toggle Wrap Bay
                  availability or 24-Hr Rush Print slots in real time.
                </p>
              </div>

              <div className="bg-[#090C11] border border-amber-500/50 p-3.5 rounded-none space-y-2">
                <div className="text-amber-400 font-black font-mono uppercase">
                  3. Silent B2B / Military Unit Tier Switcher
                </div>
                <p className="text-slate-300 leading-relaxed">
                  When a Fort Bragg unit rep or 5-van fleet manager walks in, tap{' '}
                  <strong>Unit -10%</strong> or <strong>Fleet -15%</strong>. The TV flashes the{' '}
                  <strong>Veteran Shield Bumper</strong> for 1.3s and updates every board price cleanly
                  with zero crossed-out numbers!
                </p>
              </div>

              <div className="bg-[#090C11] border border-slate-700 p-3.5 rounded-none space-y-2">
                <div className="text-cyan-300 font-black font-mono uppercase">
                  4. Dual-Monitor HDMI Presentation Mode
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-300">
                  <li>
                    Click <strong>&quot;Launch 2nd HDMI Window (?tv=1#tv-display)&quot;</strong> in the
                    top bar.
                  </li>
                  <li>
                    Drag that window onto your 55&quot; Showroom HDMI TV or portable monitor and press{' '}
                    <kbd className="bg-slate-800 px-1 border border-slate-600 font-mono">F11</kbd>.
                  </li>
                  <li>
                    Tap any control on the right to watch both screens sync in under 50ms!
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MAIN WORKSPACE: SHOWROOM TWIN (LEFT) + CONTROLLER (RIGHT)           */}
      {/* =================================================================== */}
      <div className="flex-1 max-w-[1640px] w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================================================================= */}
        {/* LEFT 8 COLUMNS: 4315 BRAGG BLVD SHOWROOM & WRAP BAY DIGITAL TWIN  */}
        {/* ================================================================= */}
        <div className="lg:col-span-8 space-y-3">
          {/* Interactive Showroom TV Control Bar */}
          <div className="bg-[#0D1118] border border-slate-800 p-3 flex flex-wrap items-center justify-between gap-2 rounded-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-400 animate-pulse rounded-none" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white font-mono">
                {isTvZoomed
                  ? '📺 55" Showroom HDMI Board (Magnified 16:9 View)'
                  : '🏢 4315 Bragg Blvd Wrap Bay & Showroom Wall (Click TV to Magnify)'}
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              {/* Switch TV Theme directly */}
              <button
                onClick={() =>
                  setTvBoardTheme(
                    tvBoardTheme === 'carbonCyan' ? 'tacticalGold' : 'carbonCyan'
                  )
                }
                className="px-2.5 py-1 rounded-none text-xs font-mono font-bold bg-[#141B26] hover:bg-slate-800 text-slate-200 border border-slate-700 cursor-pointer transition"
              >
                🎨 Theme: {isTacticalTheme ? 'Tactical Gold (Fort Bragg)' : 'Carbon Cyan'}
              </button>

              {/* Toggle Auto-Rotate */}
              <button
                onClick={() =>
                  setAnnouncements(prev => ({ ...prev, tvRotateMode: !prev.tvRotateMode }))
                }
                className={`px-2.5 py-1 rounded-none text-xs font-mono font-bold border cursor-pointer transition ${
                  announcements.tvRotateMode
                    ? 'bg-emerald-600 text-white border-emerald-400'
                    : 'bg-[#141B26] text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                🔄 Rotate: {announcements.tvRotateMode ? 'ON' : 'OFF'}
              </button>

              {/* Magnify / Shrink TV */}
              <button
                onClick={() => setIsTvZoomed(!isTvZoomed)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-none text-xs font-black uppercase tracking-wider transition cursor-pointer border ${
                  isTvZoomed
                    ? 'bg-cyan-400 text-slate-950 border-cyan-200 shadow-lg'
                    : 'bg-[#132030] text-cyan-300 border-cyan-500/50 hover:bg-cyan-400 hover:text-slate-950'
                }`}
              >
                {isTvZoomed ? (
                  <ZoomOut className="w-3.5 h-3.5" />
                ) : (
                  <ZoomIn className="w-3.5 h-3.5" />
                )}
                <span>{isTvZoomed ? 'Show Wrap Bay & Wall' : 'Magnify 55" TV'}</span>
              </button>

              {/* Open Full 1080p TV Modal */}
              <button
                onClick={() => {
                  setIsShopSimOpen(false);
                  setIsTvBoardOpen(true);
                }}
                className="px-2.5 py-1 rounded-none text-xs font-mono font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition"
              >
                📺 Full 1080p USB Export
              </button>
            </div>
          </div>

          {/* =============================================================== */}
          {/* INTERACTIVE 4315 BRAGG BLVD WRAP BAY & SHOWROOM STAGE           */}
          {/* =============================================================== */}
          <div className="relative w-full aspect-[16/10] border-2 border-cyan-500/50 bg-[#070A0F] shadow-2xl overflow-hidden select-none rounded-none">
            {/* Architectural Showroom Wall & Wrap Bay Environment */}
            <div
              className={`absolute inset-0 flex flex-col justify-between transition-all duration-500 ${
                isTvZoomed ? 'opacity-20 blur-[2px] scale-105' : 'opacity-100 scale-100'
              }`}
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 15%, rgba(6, 182, 212, 0.14), transparent 65%), linear-gradient(180deg, #0B1018 0%, #070A0F 65%, #0D131C 100%)'
              }}
            >
              {/* Showroom Top Structural Truss & Bay Header */}
              <div className="bg-[#0B0F17]/95 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-black uppercase">
                    📍 4315 BRAGG BLVD • FAYETTEVILLE, NC 28303
                  </span>
                  <span className="text-amber-400 font-bold hidden sm:inline">
                    ★ VETERAN-OWNED &amp; LATINO-OWNED SHOWROOM
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 font-black uppercase border ${
                      announcements.wrapBayOpen
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                        : 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                    }`}
                  >
                    {announcements.wrapBayOpen
                      ? '🟢 BAY DOOR: OPEN FOR FLEET INTAKE'
                      : '🚐 BAY DOOR: ACTIVE WRAP INSTALL'}
                  </span>
                  <span
                    className={`px-2 py-0.5 font-black uppercase border ${
                      announcements.rushPrintOpen
                        ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50'
                        : 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                    }`}
                  >
                    {announcements.rushPrintOpen
                      ? '⚡ 24H RUSH PRESS: OPEN'
                      : '🔒 RUSH QUEUE: FULL'}
                  </span>
                </div>
              </div>

              {/* Lower Showroom Counter & Wrap Bay Floor Showcase (Visible when TV is unzoomed) */}
              <div className="mt-auto grid grid-cols-3 gap-3 p-3 bg-[#090D14]/95 border-t-2 border-slate-800">
                {/* Bay Slot 1: Alpha Beavers Commercial Van in Wrap Bay */}
                <div className="bg-[#0E141F] border border-slate-700/80 p-2 flex items-center gap-2.5 rounded-none">
                  <img
                    src="./images/alpha-beavers-van-wrap.jpg"
                    alt="Alpha Beavers LLC Commercial Van Wrap in 4315 Bragg Blvd Bay"
                    className="w-20 h-14 object-cover border border-cyan-400/60 shrink-0 rounded-none"
                  />
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono font-black uppercase text-cyan-400">
                      Wrap Bay #1 • RAM ProMaster
                    </div>
                    <div className="text-xs font-bold text-white truncate">
                      Alpha Beavers LLC Fleet Build
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 truncate">
                      3M Cast Vinyl + UV Overlaminate
                    </div>
                  </div>
                </div>

                {/* Bay Slot 2: Fort Bragg Airborne Apparel Press Station */}
                <div className="bg-[#0E141F] border border-slate-700/80 p-2 flex items-center gap-2.5 rounded-none">
                  <img
                    src="./images/military-airborne-tshirt.jpg"
                    alt="Allied Airborne Paratrooper Custom T-Shirt Print"
                    className="w-20 h-14 object-cover border border-amber-400/60 shrink-0 rounded-none"
                  />
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono font-black uppercase text-amber-400">
                      DTF &amp; Sublimation Press
                    </div>
                    <div className="text-xs font-bold text-white truncate">
                      Fort Bragg Airborne Unit Tees
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 truncate">
                      Zero Minimums • 24–48 Hr Turnaround
                    </div>
                  </div>
                </div>

                {/* Bay Slot 3: Precision Plotter & Window Graphics Station */}
                <div className="bg-[#0E141F] border border-slate-700/80 p-2 flex items-center gap-2.5 rounded-none">
                  <img
                    src="./images/custom-car-decal-pink.jpg"
                    alt="Custom Multi-Layer Pink and Red Contour Car Window Decal"
                    className="w-20 h-14 object-cover border border-rose-400/60 shrink-0 rounded-none"
                  />
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono font-black uppercase text-rose-400">
                      Optical Plotter Cut Bay
                    </div>
                    <div className="text-xs font-bold text-white truncate">
                      Multi-Layer Contour Decals
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 truncate">
                      WhatsApp Proofs: {shopInfo.phoneDisplay}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================= */}
            {/* LIVE 1280x720 HD INTERACTIVE 55" SHOWROOM HDMI TV BOARD       */}
            {/* Unzoomed: Mounted prominently on Showroom Wall above counter  */}
            {/* Zoomed: Expands to full stage for crisp inspection            */}
            {/* ============================================================= */}
            <div
              ref={tvBezelRef}
              onClick={() => setIsTvZoomed(!isTvZoomed)}
              title={
                isTvZoomed
                  ? 'Click to return to full Showroom & Wrap Bay view'
                  : 'Click to magnify the live 55" Showroom HDMI TV screen'
              }
              style={{
                left: isTvZoomed ? '2%' : '7%',
                top: isTvZoomed ? '3%' : '9%',
                width: isTvZoomed ? '96%' : '86%',
                height: isTvZoomed ? '94%' : '72%'
              }}
              className={`absolute z-30 transition-all duration-500 ease-out cursor-pointer overflow-hidden bg-[#080B10] rounded-none ${
                syncFlash
                  ? 'ring-4 ring-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.95)]'
                  : isTvZoomed
                  ? 'ring-4 ring-cyan-400 shadow-[0_0_70px_rgba(0,0,0,0.95)]'
                  : 'ring-2 ring-cyan-400/90 shadow-[0_15px_50px_rgba(0,0,0,0.9)] hover:ring-4 hover:ring-cyan-300'
              }`}
            >
              {/* True 1280x720 HD Canvas scaled proportionally into the TV bezel */}
              <div
                style={{
                  width: '1280px',
                  height: '720px',
                  transform: `scale(${tvScale.x}, ${tvScale.y})`,
                  transformOrigin: 'top left'
                }}
                className={`relative flex flex-col justify-between select-none rounded-none ${
                  isTacticalTheme
                    ? 'bg-[#111612] text-[#F4F1EA]'
                    : 'bg-[#090D14] text-[#F1F5F9]'
                }`}
              >
                {/* ========================================================= */}
                {/* 1. VETERAN SHIELD EMBLEM SCREEN BUMPER FLASH (1.3s)       */}
                {/* Silent B2B / Fort Bragg Unit Tier Change — Zero Strike! */}
                {/* ========================================================= */}
                {shieldFlashing && (
                  <div className="absolute inset-0 z-50 bg-[#05070B] flex flex-col items-center justify-center text-center animate-fadeIn rounded-none p-8 border-4 border-amber-400">
                    <div className="relative mb-5 flex items-center justify-center">
                      <div className="absolute -inset-8 bg-amber-500/25 blur-2xl animate-pulse" />
                      <div className="relative w-36 h-36 bg-[#111722] border-4 border-amber-400 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(245,158,11,0.85)] rounded-none">
                        <Shield className="w-16 h-16 text-amber-400 mb-1" />
                        <span className="font-mono font-black text-xs uppercase tracking-widest text-white">
                          910 PRINTSHOP
                        </span>
                      </div>
                    </div>
                    <div className="bg-amber-400 text-slate-950 font-mono font-black text-lg uppercase px-6 py-1.5 tracking-widest mb-3 rounded-none">
                      🛡️ VETERAN-OWNED &amp; LATINO-OWNED • 4315 BRAGG BLVD
                    </div>
                    <h2 className="text-5xl font-black uppercase tracking-wider text-white font-mono">
                      COMMERCIAL FLEET, FORT BRAGG UNIT &amp; CUSTOM PRINT BOARD
                    </h2>
                    <p className="text-cyan-400 font-mono font-bold text-lg mt-2 tracking-wide">
                      HABLAMOS ESPAÑOL • CALL OR WHATSAPP (910) 920-0863
                    </p>
                  </div>
                )}

                {/* ========================================================= */}
                {/* 2. TOP HEADER BAR (78px)                                  */}
                {/* ========================================================= */}
                <div
                  className={`h-[78px] px-6 flex items-center justify-between border-b-4 shrink-0 rounded-none ${
                    isTacticalTheme
                      ? 'bg-[#171E18] text-white border-amber-500'
                      : 'bg-[#0E1520] text-white border-cyan-400'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-13 h-13 flex flex-col items-center justify-center font-mono font-black border-2 shrink-0 rounded-none ${
                        isTacticalTheme
                          ? 'bg-amber-500 text-slate-950 border-amber-200'
                          : 'bg-cyan-400 text-slate-950 border-white'
                      }`}
                    >
                      <span className="text-lg leading-none">910</span>
                      <span className="text-[9px] tracking-widest uppercase">PRINT</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-mono font-black uppercase px-2 py-0.5 tracking-wider rounded-none ${
                            isTacticalTheme
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-rose-600 text-white'
                          }`}
                        >
                          VETERAN &amp; LATINO OWNED
                        </span>
                        <span className="text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                          4315 Bragg Blvd • Fayetteville, NC • Hablamos Español
                        </span>
                      </div>
                      <h1 className="text-3xl font-black uppercase tracking-wider leading-none mt-1 font-mono">
                        910 PRINTSHOP — WRAPS, APPAREL, DECALS &amp; SIGNAGE
                      </h1>
                    </div>
                  </div>

                  {/* Right Live Bay & Rush Badges */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`px-3 py-1.5 font-mono font-black text-xs uppercase border-2 rounded-none ${
                        announcements.wrapBayOpen
                          ? 'bg-emerald-950/90 text-emerald-300 border-emerald-400'
                          : 'bg-amber-950/90 text-amber-300 border-amber-400'
                      }`}
                    >
                      {announcements.wrapBayOpen ? '🟢 WRAP BAY OPEN' : '🚐 FLEET INSTALL IN BAY'}
                    </div>

                    <div
                      className={`px-3 py-1.5 font-mono font-black text-xs uppercase border-2 rounded-none ${
                        announcements.rushPrintOpen
                          ? 'bg-cyan-950/90 text-cyan-300 border-cyan-400'
                          : 'bg-rose-900/90 text-white border-rose-400'
                      }`}
                    >
                      {announcements.rushPrintOpen ? '⚡ 24H RUSH PRESS OPEN' : '🔒 RUSH PRESS FULL'}
                    </div>

                    <div className="text-right font-mono pl-2 border-l border-slate-700">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">
                        Call / WhatsApp Proofs
                      </div>
                      <div className="text-lg font-black text-amber-400 leading-tight">
                        (910) 920-0863
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* 3. MAIN 3-COLUMN HD BOARD OR ROTATING PORTFOLIO SPOTLIGHT */}
                {/* ========================================================= */}
                {rotateSlide === 1 && announcements.tvRotateMode ? (
                  /* ROTATING PORTFOLIO & PACKAGE SPOTLIGHT SLIDE */
                  <div className="flex-1 p-6 flex flex-col justify-between bg-[#0B1018] text-white rounded-none">
                    <div className="flex items-center justify-between border-b-2 border-cyan-500/40 pb-3">
                      <div>
                        <span className="bg-cyan-400 text-slate-950 font-mono font-black text-xs uppercase px-3 py-1 tracking-widest rounded-none">
                          ★ REAL FAYETTEVILLE &amp; FORT BRAGG PORTFOLIO BUILDS
                        </span>
                        <h2 className="text-4xl font-black uppercase tracking-wider mt-2 text-white font-mono">
                          BUILT IN OUR 4315 BRAGG BLVD WRAP BAY &amp; PRINT STUDIO
                        </h2>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-xs text-slate-400 uppercase">Instant WhatsApp Proofs</div>
                        <div className="text-2xl font-black text-amber-400">(910) 920-0863</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-5 my-auto py-3">
                      {portfolio.map(work => (
                        <div
                          key={work.id}
                          className="bg-[#111824] border-2 border-cyan-500/50 flex flex-col justify-between overflow-hidden rounded-none shadow-xl"
                        >
                          <div className="relative h-48 overflow-hidden bg-black">
                            <img
                              src={work.image}
                              alt={work.alt}
                              className="w-full h-full object-cover rounded-none"
                            />
                            <span className="absolute top-2 left-2 bg-slate-950/90 text-cyan-300 border border-cyan-400/50 font-mono font-black text-[11px] uppercase px-2.5 py-0.5 rounded-none">
                              {work.badge}
                            </span>
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="text-[11px] font-mono uppercase text-amber-400 font-bold">
                                {work.clientType}
                              </div>
                              <h3 className="text-lg font-black uppercase text-white mt-0.5 leading-snug">
                                {work.title}
                              </h3>
                              <p className="text-xs text-slate-300 mt-1.5 line-clamp-2">
                                {work.specs}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* STANDARD 3-COLUMN HD SHOWROOM BOARD */
                  <div className="flex-1 grid grid-cols-3 gap-3.5 p-3.5 overflow-hidden">
                    {/* COLUMN 1: COMMERCIAL VEHICLE WRAPS & FLEET GRAPHICS */}
                    <div
                      className={`flex flex-col justify-between p-3.5 border-2 rounded-none ${
                        isTacticalTheme
                          ? 'bg-[#161D17] border-amber-500/40 text-slate-100'
                          : 'bg-[#0F1622] border-cyan-500/40 text-slate-100'
                      }`}
                    >
                      <div>
                        <div
                          className={`flex items-baseline justify-between border-b-2 pb-1.5 mb-2 ${
                            isTacticalTheme
                              ? 'border-amber-500 text-amber-400'
                              : 'border-cyan-400 text-cyan-300'
                          }`}
                        >
                          <h2 className="text-xl font-black uppercase tracking-wider font-mono leading-none">
                            1. Vehicle &amp; Fleet Wraps
                          </h2>
                          <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                            3M / Avery Cast
                          </span>
                        </div>

                        <div className="space-y-2">
                          {catalog.wraps?.items.map(item => {
                            const isBooked = !item.inStock;
                            const ep = getEffectivePriceObj(item.price, item.numericPrice);
                            return (
                              <div
                                key={item.id}
                                className={`flex items-center justify-between py-1.5 border-b border-slate-800 ${
                                  isBooked ? 'opacity-50' : ''
                                }`}
                              >
                                <div className="pr-2 min-w-0">
                                  <div className="text-[14px] font-extrabold uppercase tracking-tight text-white truncate">
                                    {item.name}
                                  </div>
                                  <div className="text-[10px] font-mono text-slate-400 truncate">
                                    {item.turnaround} • {item.unit}
                                  </div>
                                </div>

                                {isBooked ? (
                                  <span className="bg-amber-600 text-slate-950 text-[10px] font-mono font-black px-2 py-0.5 uppercase shrink-0 rounded-none">
                                    BAY BOOKED
                                  </span>
                                ) : (
                                  <div className="font-mono font-black shrink-0 text-right">
                                    <span
                                      className={`text-[17px] ${
                                        isTacticalTheme ? 'text-amber-400' : 'text-cyan-300'
                                      }`}
                                    >
                                      {ep.current}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Portfolio Thumbnail Strip inside Column 1 */}
                      <div className="pt-2 border-t border-slate-800 flex items-center gap-2.5">
                        <img
                          src="./images/alpha-beavers-van-wrap.jpg"
                          alt="Alpha Beavers Van Wrap"
                          className="w-16 h-11 object-cover border border-cyan-400/60 shrink-0 rounded-none"
                        />
                        <div className="text-[10px] font-mono leading-tight">
                          <div className="text-amber-400 font-black uppercase">
                            Featured Build: Alpha Beavers LLC
                          </div>
                          <div className="text-slate-400">
                            Full &amp; Partial Fleet Wraps @ 4315 Bragg Blvd
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* COLUMN 2: CUSTOM T-SHIRTS, UNIT APPAREL & SIGNAGE */}
                    <div
                      className={`flex flex-col justify-between p-3.5 border-2 rounded-none ${
                        isTacticalTheme
                          ? 'bg-[#161D17] border-amber-500/40 text-slate-100'
                          : 'bg-[#0F1622] border-cyan-500/40 text-slate-100'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Custom Apparel */}
                        <div>
                          <div
                            className={`flex items-baseline justify-between border-b-2 pb-1 mb-1.5 ${
                              isTacticalTheme
                                ? 'border-amber-500 text-amber-400'
                                : 'border-cyan-400 text-cyan-300'
                            }`}
                          >
                            <h2 className="text-lg font-black uppercase tracking-wider font-mono leading-none">
                              2. Custom Apparel &amp; Unit Tees
                            </h2>
                            <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">
                              Zero Minimums
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {catalog.apparel?.items.map(item => {
                              const isOut = !item.inStock;
                              const ep = getEffectivePriceObj(item.price, item.numericPrice);
                              return (
                                <div
                                  key={item.id}
                                  className={`flex items-center justify-between py-1 border-b border-slate-800/90 ${
                                    isOut ? 'opacity-45' : ''
                                  }`}
                                >
                                  <div className="pr-2 min-w-0">
                                    <div className="text-[13px] font-extrabold uppercase text-white truncate">
                                      {item.name}
                                    </div>
                                    <div className="text-[10px] font-mono text-slate-400 truncate">
                                      {item.unit} • {item.turnaround}
                                    </div>
                                  </div>
                                  {isOut ? (
                                    <span className="bg-rose-600 text-white text-[10px] font-mono font-black px-1.5 py-0.5 uppercase shrink-0 rounded-none">
                                      QUEUE FULL
                                    </span>
                                  ) : (
                                    <span
                                      className={`text-[16px] font-mono font-black shrink-0 ${
                                        isTacticalTheme ? 'text-amber-400' : 'text-cyan-300'
                                      }`}
                                    >
                                      {ep.current}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Banners, Magnets & Decals */}
                        <div>
                          <div
                            className={`flex items-baseline justify-between border-b-2 pb-1 mb-1.5 ${
                              isTacticalTheme
                                ? 'border-amber-500/60 text-amber-300'
                                : 'border-cyan-400/60 text-cyan-300'
                            }`}
                          >
                            <h3 className="text-lg font-black uppercase tracking-wider font-mono leading-none">
                              3. Magnets, Banners &amp; Decals
                            </h3>
                            <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                              24–48 Hr Turn
                            </span>
                          </div>

                          <div className="space-y-1">
                            {[
                              ...(catalog.signage?.items.slice(0, 2) || []),
                              ...(catalog.decals?.items.slice(0, 2) || [])
                            ].map(item => {
                              const isOut = !item.inStock;
                              const ep = getEffectivePriceObj(item.price, item.numericPrice);
                              return (
                                <div
                                  key={item.id}
                                  className={`flex items-center justify-between py-1 border-b border-slate-800/80 ${
                                    isOut ? 'opacity-45' : ''
                                  }`}
                                >
                                  <span className="text-[13px] font-bold uppercase text-white truncate pr-2">
                                    {item.name}
                                  </span>
                                  {isOut ? (
                                    <span className="bg-rose-600 text-white text-[10px] font-mono font-black px-1.5 py-0.5 uppercase shrink-0 rounded-none">
                                      BOOKED
                                    </span>
                                  ) : (
                                    <span
                                      className={`text-[15px] font-mono font-black shrink-0 ${
                                        isTacticalTheme ? 'text-amber-400' : 'text-cyan-300'
                                      }`}
                                    >
                                      {ep.current}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center gap-2.5">
                        <img
                          src="./images/military-airborne-tshirt.jpg"
                          alt="Military Airborne Shirt Print"
                          className="w-12 h-11 object-cover border border-amber-400/60 shrink-0 rounded-none"
                        />
                        <img
                          src="./images/custom-car-decal-pink.jpg"
                          alt="Custom Pink Window Decal"
                          className="w-12 h-11 object-cover border border-rose-400/60 shrink-0 rounded-none"
                        />
                        <div className="text-[10px] font-mono leading-tight">
                          <div className="text-emerald-400 font-black uppercase">
                            DTF • Sublimation • Cast Vinyl
                          </div>
                          <div className="text-slate-400">
                            Unit Morale Shirts, Window Perf &amp; Stickers
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* COLUMN 3: TURNKEY LAUNCH BUNDLES & B2B PACKAGES */}
                    <div
                      className={`flex flex-col justify-between p-3.5 border-2 rounded-none ${
                        isTacticalTheme
                          ? 'bg-[#161D17] border-amber-500/40 text-slate-100'
                          : 'bg-[#0F1622] border-cyan-500/40 text-slate-100'
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div
                          className={`flex items-center justify-between border-b-2 pb-1.5 ${
                            isTacticalTheme
                              ? 'border-amber-500 text-amber-400'
                              : 'border-cyan-400 text-cyan-300'
                          }`}
                        >
                          <h2 className="text-xl font-black uppercase tracking-wider font-mono leading-none">
                            ★ Turnkey Launch Bundles
                          </h2>
                          <span className="bg-amber-400 text-slate-950 text-[10px] font-mono font-black px-1.5 py-0.5 uppercase rounded-none">
                            All-In Pricing
                          </span>
                        </div>

                        <div className="space-y-2">
                          {packages.map(pkg => {
                            const isOut = !pkg.inStock;
                            const ep = getEffectivePriceObj(pkg.price, pkg.numericPrice);
                            return (
                              <div
                                key={pkg.id}
                                className={`p-2.5 border bg-[#0B1018] rounded-none ${
                                  isTacticalTheme ? 'border-amber-500/40' : 'border-slate-700'
                                } ${isOut ? 'opacity-45' : ''}`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0">
                                    <span className="text-[9px] font-mono font-black uppercase text-amber-400 block">
                                      {pkg.badge}
                                    </span>
                                    <div className="text-[13px] font-extrabold uppercase text-white truncate">
                                      {pkg.name}
                                    </div>
                                  </div>
                                  {isOut ? (
                                    <span className="bg-rose-600 text-white text-[10px] font-mono font-black px-1.5 py-0.5 uppercase shrink-0 rounded-none">
                                      BOOKED
                                    </span>
                                  ) : (
                                    <span className="text-[17px] font-mono font-black text-emerald-400 shrink-0">
                                      {ep.current}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                                  {pkg.includes.join(' • ')}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 text-[11px] font-mono font-bold flex items-center justify-between text-amber-300">
                        <span>📲 WhatsApp Artwork: (910) 920-0863</span>
                        <span>500 16pt Biz Cards $75</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================= */}
                {/* 4. BOTTOM STATUS & LOCATION TICKER BAR (62px)             */}
                {/* ========================================================= */}
                <div
                  className={`h-[62px] px-6 flex items-center justify-between border-t-4 shrink-0 rounded-none ${
                    isTacticalTheme
                      ? 'bg-[#171E18] border-amber-500 text-white'
                      : 'bg-[#0D131D] border-cyan-400 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`font-mono font-black text-xs uppercase px-2.5 py-1 shrink-0 rounded-none ${
                        isTacticalTheme ? 'bg-amber-500 text-slate-950' : 'bg-cyan-400 text-slate-950'
                      }`}
                    >
                      {currentMode.statusBadge || 'SHOWROOM STATUS'}
                    </span>
                    <span className="text-lg font-black uppercase tracking-wider font-mono truncate">
                      {currentMode.name}
                    </span>
                    <span className="text-xs font-mono text-slate-400 hidden xl:inline truncate">
                      ({currentMode.hours})
                    </span>
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-400 shrink-0">
                    4315 Bragg Blvd • Proofs via WhatsApp (910) 920-0863
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT 4 COLUMNS: 7" COUNTER TOUCH DECK OR SHOP OWNER SMARTPHONE   */}
        {/* ================================================================= */}
        <div className="lg:col-span-4 flex flex-col items-center space-y-2.5">
          {/* 1-Click Switcher: 7" Countertop Touch Deck vs Shop Owner Smartphone */}
          <div className="w-full max-w-[430px] grid grid-cols-2 gap-1.5 bg-[#0D1118] p-1.5 border border-slate-800 rounded-none">
            <button
              onClick={() => setControlDevice('counter7')}
              className={`py-2 px-2 text-[11px] font-mono font-black uppercase transition cursor-pointer border rounded-none ${
                controlDevice === 'counter7'
                  ? 'bg-cyan-400 text-slate-950 border-white shadow'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              🖥️ 7&quot; Counter Touch Deck
            </button>
            <button
              onClick={() => setControlDevice('phone')}
              className={`py-2 px-2 text-[11px] font-mono font-black uppercase transition cursor-pointer border rounded-none ${
                controlDevice === 'phone'
                  ? 'bg-emerald-400 text-slate-950 border-white shadow'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              📱 Shop Owner Smartphone
            </button>
          </div>

          {/* Hardware Frame: 7" Countertop Touch Deck OR Shop Owner Smartphone */}
          <div
            className={`w-full bg-[#090C12] rounded-none shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col transition-all ${
              controlDevice === 'counter7'
                ? 'max-w-[430px] border-[8px] border-slate-900 ring-2 ring-cyan-500/60'
                : 'max-w-[395px] border-4 border-slate-700'
            }`}
          >
            {/* Top Bezel / Status Bar */}
            <div className="bg-slate-950 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400 rounded-none">
              {controlDevice === 'counter7' ? (
                <>
                  <span className="font-black text-cyan-300 flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 text-cyan-400" />
                    <span>7&quot; SHOWROOM COUNTER DECK (BY HEAT PRESS)</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-black">
                    <span>⚡ HDMI LINKED</span>
                  </span>
                </>
              ) : (
                <>
                  <span className="font-bold text-white flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>OWNER SMARTPHONE REMOTE</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Wifi className="w-3.5 h-3.5 animate-pulse" />
                    <span>5G • 4315 BRAGG SYNC</span>
                  </span>
                </>
              )}
            </div>

            {/* Live Showroom 55" TV Mini-Mirror Strip on 7" Counter Deck */}
            {controlDevice === 'counter7' && (
              <div className="bg-[#0F1622] border-b-2 border-cyan-500/40 px-3.5 py-2 flex items-center justify-between gap-2 text-[10px] font-mono rounded-none">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="px-1.5 py-0.5 bg-emerald-400 text-slate-950 font-black uppercase shrink-0 rounded-none">
                    55&quot; TV Mirror
                  </span>
                  <span className="text-slate-200 truncate font-bold">
                    {announcements.wrapBayOpen ? '🟢 Bay Open' : '🚐 In-Bay Wrap'} •{' '}
                    {tierPct > 0 ? `🛡️ Tier -${tierPct}% Active` : 'Standard Retail'}
                  </span>
                </div>
                <span className="text-cyan-300 font-bold shrink-0">Always On</span>
              </div>
            )}

            {/* Controller App Header */}
            <div className="bg-gradient-to-r from-[#101928] to-[#0B101A] p-3.5 border-b border-cyan-500/30 rounded-none">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block font-bold">
                    {controlDevice === 'counter7'
                      ? 'Showroom Countertop Touch Deck'
                      : 'Shop Owner Pocket Controller'}
                  </span>
                  <h3 className="text-sm font-black text-white uppercase tracking-wide font-mono mt-0.5">
                    Tap Below → Updates 55&quot; Showroom TV Live
                  </h3>
                </div>
                <button
                  onClick={resetToDefaults}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[10px] font-mono flex items-center gap-1 cursor-pointer rounded-none"
                  title="Reset all catalog items & tiers back to default"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* 3 Controller Mode Tabs */}
              <div className="grid grid-cols-3 gap-1 mt-3 bg-slate-950 p-1 border border-slate-800 rounded-none">
                <button
                  onClick={() => setPhoneTab('bay')}
                  className={`py-1.5 text-[10px] font-black uppercase font-mono transition cursor-pointer rounded-none ${
                    phoneTab === 'bay'
                      ? 'bg-cyan-400 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🚐 Bay &amp; Tiers
                </button>
                <button
                  onClick={() => setPhoneTab('pricing')}
                  className={`py-1.5 text-[10px] font-black uppercase font-mono transition cursor-pointer rounded-none ${
                    phoneTab === 'pricing'
                      ? 'bg-cyan-400 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  💲 +$10 / -$10
                </button>
                <button
                  onClick={() => setPhoneTab('mode')}
                  className={`py-1.5 text-[10px] font-black uppercase font-mono transition cursor-pointer rounded-none ${
                    phoneTab === 'mode'
                      ? 'bg-cyan-400 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  📍 Presets/HDMI
                </button>
              </div>
            </div>

            {/* ============================================================= */}
            {/* CONTROLLER BODY CONTENT                                       */}
            {/* ============================================================= */}
            <div className="p-3.5 space-y-3.5 max-h-[540px] overflow-y-auto bg-[#0B0F17] rounded-none">
              {/* TAB 1: WRAP BAY, 24H RUSH SLOT & SILENT B2B / MILITARY TIERS */}
              {phoneTab === 'bay' && (
                <>
                  {/* Silent B2B / Fleet / Fort Bragg Unit Pricing Tiers */}
                  <div className="bg-[#111826] border-2 border-amber-500/70 p-3 space-y-2 rounded-none">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-black uppercase text-amber-400 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" />
                        <span>Silent B2B / Military Unit Pricing Tier</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">
                        {tierPct > 0 ? `-${tierPct}% Active` : 'Standard Retail'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-relaxed">
                      Fires the 1.3s <strong>Veteran Shield Emblem Bumper Flash</strong> and updates
                      all board prices cleanly with zero crossed-out numbers:
                    </p>
                    <div className="grid grid-cols-4 gap-1">
                      {[
                        { label: 'Retail 0%', val: 0 },
                        { label: 'Contractor -5%', val: 5 },
                        { label: 'Unit -10%', val: 10 },
                        { label: 'Fleet -15%', val: 15 }
                      ].map(tier => (
                        <button
                          key={tier.val}
                          onClick={() => triggerVolumeTier(tier.val)}
                          className={`py-2 px-1 font-mono font-black text-[10px] uppercase cursor-pointer border transition rounded-none ${
                            tierPct === tier.val
                              ? 'bg-amber-400 text-slate-950 border-white shadow'
                              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {tier.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Master Wrap Bay & 24-Hr Rush Print Slot Switches */}
                  <div className="grid grid-cols-2 gap-2">
                    <div
                      className={`p-2.5 border-2 rounded-none flex flex-col justify-between ${
                        announcements.wrapBayOpen
                          ? 'bg-emerald-950/30 border-emerald-500/60'
                          : 'bg-amber-950/40 border-amber-500/70'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] font-mono font-black uppercase text-white flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Wrap Bay Door</span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-1">
                          {announcements.wrapBayOpen
                            ? 'Open for walk-in measurements & intake'
                            : 'Active fleet wrap install in progress'}
                        </p>
                      </div>
                      <button
                        onClick={toggleWrapBayStatus}
                        className={`mt-2 w-full py-1.5 font-mono font-black text-[10px] uppercase cursor-pointer border transition rounded-none ${
                          announcements.wrapBayOpen
                            ? 'bg-emerald-500 text-slate-950 border-emerald-300'
                            : 'bg-amber-500 text-slate-950 border-amber-300'
                        }`}
                      >
                        {announcements.wrapBayOpen ? '🟢 BAY OPEN (TAP TO BOOK)' : '🚐 IN-BAY INSTALL'}
                      </button>
                    </div>

                    <div
                      className={`p-2.5 border-2 rounded-none flex flex-col justify-between ${
                        announcements.rushPrintOpen
                          ? 'bg-cyan-950/30 border-cyan-500/60'
                          : 'bg-rose-950/40 border-rose-500/70'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] font-mono font-black uppercase text-white flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>24-Hr Rush Press</span>
                        </div>
                        <p className="text-[10px] text-slate-300 mt-1">
                          {announcements.rushPrintOpen
                            ? 'Same-day / 24h shirts & banners open'
                            : 'Rush press queue full for today'}
                        </p>
                      </div>
                      <button
                        onClick={toggleRushPrintStatus}
                        className={`mt-2 w-full py-1.5 font-mono font-black text-[10px] uppercase cursor-pointer border transition rounded-none ${
                          announcements.rushPrintOpen
                            ? 'bg-cyan-400 text-slate-950 border-cyan-200'
                            : 'bg-rose-600 text-white border-rose-400'
                        }`}
                      >
                        {announcements.rushPrintOpen ? '⚡ RUSH SLOT OPEN' : '🔒 RUSH QUEUE FULL'}
                      </button>
                    </div>
                  </div>

                  {/* 1-Tap In-Bay / Booked Toggle on Wrap & Apparel Services */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase text-cyan-400 font-bold">
                      <span>Tap Service to Toggle In-Bay / Booked:</span>
                      <span>TV Status</span>
                    </div>

                    {[...quickWraps.slice(0, 3), ...quickApparel.slice(0, 2)].map(item => {
                      const catKey = item.id.startsWith('wrap-') ? 'wraps' : 'apparel';
                      const ep = getEffectivePriceObj(item.price, item.numericPrice);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItemAvailability(catKey, item.id)}
                          className={`p-2 border flex items-center justify-between gap-2 cursor-pointer transition rounded-none ${
                            item.inStock
                              ? 'bg-[#121926] hover:bg-[#182233] border-slate-800 text-white'
                              : 'bg-rose-950/40 border-rose-600/60 text-slate-300'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate">{item.name}</div>
                            <div className="text-[11px] font-mono text-cyan-400">{ep.current}</div>
                          </div>

                          <span
                            className={`px-2 py-1 text-[10px] font-mono font-black uppercase shrink-0 border rounded-none ${
                              item.inStock
                                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-amber-500 text-slate-950 border-amber-300'
                            }`}
                          >
                            {item.inStock ? '🟢 AVAILABLE' : '🚐 BAY BOOKED'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* TAB 2: LIVE +$10 / -$10 PRICE ADJUSTERS & BUNDLE EDITOR */}
              {phoneTab === 'pricing' && (
                <div className="space-y-3.5">
                  <div className="bg-cyan-500/10 border border-cyan-500/40 p-2.5 text-[11px] text-cyan-200 leading-relaxed rounded-none">
                    <strong>Live Price Adjuster:</strong> Tap <strong>-$10</strong> or{' '}
                    <strong>+$10</strong> on any wrap, apparel pack, or signage item and watch the
                    55&quot; Showroom TV board update immediately.
                  </div>

                  {/* Quick +/- $10 Price Stepper on Wraps & Apparel */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                      1-Tap Service Price Stepper (-$10 / +$10):
                    </div>
                    {[
                      ...quickWraps.slice(0, 3).map(i => ({ ...i, catKey: 'wraps' })),
                      ...quickApparel.slice(0, 2).map(i => ({ ...i, catKey: 'apparel' })),
                      ...quickSignage.slice(0, 1).map(i => ({ ...i, catKey: 'signage' }))
                    ].map(item => {
                      const ep = getEffectivePriceObj(item.price, item.numericPrice);
                      return (
                        <div
                          key={item.id}
                          className="bg-[#121926] border border-slate-800 p-2 flex items-center justify-between gap-2 rounded-none"
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white truncate">{item.name}</div>
                            <div className="text-xs font-mono font-black text-amber-400">
                              {ep.current}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleStepPrice(item.catKey, item, -10)}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white font-mono font-black text-xs border border-slate-600 cursor-pointer rounded-none"
                            >
                              -$10
                            </button>
                            <button
                              onClick={() => handleStepPrice(item.catKey, item, 10)}
                              className="px-2.5 py-1 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-black text-xs cursor-pointer rounded-none"
                            >
                              +$10
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Featured Launch Bundle Availability Toggles */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                      Toggle Turnkey Bundles on TV:
                    </div>
                    {packages.map(pkg => (
                      <div
                        key={pkg.id}
                        onClick={() => togglePackageAvailability(pkg.id)}
                        className={`p-2 border flex items-center justify-between gap-2 cursor-pointer transition rounded-none ${
                          pkg.inStock
                            ? 'bg-[#121926] border-slate-800 text-white'
                            : 'bg-rose-950/40 border-rose-600/50 text-slate-400'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">{pkg.name}</div>
                          <div className="text-[10px] font-mono text-emerald-400">{pkg.price}</div>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border rounded-none ${
                            pkg.inStock
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-rose-600 text-white border-rose-400'
                          }`}
                        >
                          {pkg.inStock ? 'ACTIVE' : 'BOOKED'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SHOP STATUS PRESETS, TV THEMES & 2ND HDMI LAUNCHER */}
              {phoneTab === 'mode' && (
                <div className="space-y-4">
                  {/* TV Board Theme Selector */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                      1. 55&quot; Showroom TV Theme:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setTvBoardTheme('carbonCyan')}
                        className={`p-2.5 border text-left cursor-pointer transition rounded-none ${
                          tvBoardTheme === 'carbonCyan'
                            ? 'bg-[#101C2E] text-cyan-300 border-cyan-400 font-black shadow-md'
                            : 'bg-[#121926] text-slate-300 border-slate-800'
                        }`}
                      >
                        <div className="text-xs font-black uppercase">🟦 Carbon Cyan</div>
                        <div className="text-[10px] opacity-85 mt-0.5">
                          Matte Carbon + Neon Cyan/Crimson
                        </div>
                      </button>

                      <button
                        onClick={() => setTvBoardTheme('tacticalGold')}
                        className={`p-2.5 border text-left cursor-pointer transition rounded-none ${
                          tvBoardTheme === 'tacticalGold'
                            ? 'bg-[#1A241B] text-amber-400 border-amber-400 font-black shadow-md'
                            : 'bg-[#121926] text-slate-300 border-slate-800'
                        }`}
                      >
                        <div className="text-xs font-black uppercase">🪖 Tactical Gold</div>
                        <div className="text-[10px] opacity-85 mt-0.5">
                          Fort Bragg Olive + Veteran Gold
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* 1-Tap Shop Status Presets */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                      2. 1-Tap Showroom &amp; Bay Status Preset:
                    </div>
                    {(shopStatus?.presets || []).map(preset => {
                      const isCurrent = currentMode.id === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => updateCurrentShopMode(preset)}
                          className={`w-full p-2.5 border text-left flex items-center justify-between gap-2 cursor-pointer transition rounded-none ${
                            isCurrent
                              ? 'bg-emerald-950/50 border-emerald-400 text-white'
                              : 'bg-[#121926] hover:bg-[#182233] border-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="text-[10px] font-mono font-black text-amber-400 uppercase">
                              {preset.statusBadge}
                            </div>
                            <div className="text-xs font-bold truncate mt-0.5">{preset.name}</div>
                            <div className="text-[10px] font-mono text-slate-400 truncate">
                              {preset.hours}
                            </div>
                          </div>
                          {isCurrent && (
                            <span className="bg-emerald-400 text-slate-950 font-mono font-black text-[10px] px-1.5 py-0.5 uppercase shrink-0 rounded-none">
                              LIVE
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* 1-Click 2nd HDMI Window Launcher */}
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <button
                      onClick={handleLaunchSecondHdmiWindow}
                      className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-black text-xs uppercase tracking-wider border border-emerald-400 cursor-pointer flex items-center justify-center gap-2 rounded-none shadow-lg"
                    >
                      <Monitor className="w-4 h-4" />
                      <span>Launch 2nd HDMI Window (?tv=1#tv-display)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Controller Bottom Bar */}
            <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 text-center rounded-none">
              <div className="text-[10px] font-mono text-slate-400">
                ⚡ Syncs live to <strong>4315 Bragg Blvd Showroom TV</strong> &amp;{' '}
                <strong>2nd HDMI Window</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
