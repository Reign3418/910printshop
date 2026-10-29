import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Download,
  Maximize2,
  Tv,
  Check,
  RefreshCw,
  Sparkles,
  Phone,
  Usb,
  Wifi,
  Cable,
  ChevronDown,
  ChevronUp,
  Shield,
  FileText,
  Truck,
  Zap
} from 'lucide-react';

export default function TvBoardModal() {
  const {
    shopInfo,
    portfolio,
    catalog,
    packages,
    shopStatus,
    announcements,
    tvBoardTheme,
    setTvBoardTheme,
    isTvBoardOpen,
    setIsTvBoardOpen,
    setIsDiscoveryWhitePageOpen,
    getEffectivePriceObj
  } = useShop();

  const boardRef = useRef(null);
  const containerRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [shieldFlashing, setShieldFlashing] = useState(false);

  // Trigger the 1.3-second "Veteran Shield Emblem Screen Bumper Flash" whenever Volume Tier changes
  useEffect(() => {
    if (!announcements.shieldFlashTimestamp) return;
    setShieldFlashing(true);
    const t = setTimeout(() => setShieldFlashing(false), 1300);
    return () => clearTimeout(t);
  }, [announcements.shieldFlashTimestamp]);

  // Fit 1920x1080 into any screen viewport without distortion
  useEffect(() => {
    if (!isTvBoardOpen) return;

    const handleResize = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth;
        const availableHeight = containerRef.current.clientHeight;

        const scaleX = (availableWidth - 32) / 1920;
        const scaleY = (availableHeight - 32) / 1080;
        const fittedScale = Math.min(scaleX, scaleY, 1);
        setScale(Math.max(fittedScale, 0.2));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isTvBoardOpen, showSetupGuide]);

  if (!isTvBoardOpen) return null;

  const isTacticalTheme = tvBoardTheme === 'tacticalGold';
  const currentMode = shopStatus?.currentMode || shopStatus?.presets?.[0] || {
    id: 'standard-open',
    name: '4315 Bragg Blvd Showroom — Open & Taking Orders',
    address: '4315 Bragg Blvd, Fayetteville, NC 28303',
    hours: 'Mon–Fri 9AM–6PM • Sat 10AM–4PM',
    statusBadge: 'WRAP BAY & PRINT PRESS OPEN',
    notes: 'Walk-ins welcome on Bragg Blvd or message us on WhatsApp (910) 920-0863 for instant proofs.'
  };

  // 1-Click Export 1080p Image for USB Drive
  const handleDownloadImage = async () => {
    if (!boardRef.current) return;
    setIsExporting(true);

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(boardRef.current, {
        scale: 1, // Board is natively 1920x1080
        width: 1920,
        height: 1080,
        useCORS: true,
        allowTaint: true,
        backgroundColor: isTacticalTheme ? '#111612' : '#090D14',
        logging: false
      });

      const image = canvas.toDataURL('image/jpeg', 0.96);
      const link = document.createElement('a');
      link.href = image;
      const dateStr = new Date().toISOString().slice(0, 10);
      link.download = `910PrintShop_Showroom_TV_1080p_${tvBoardTheme}_${dateStr}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4500);
    } catch (err) {
      console.error('Failed to export 1080p Showroom TV image:', err);
      alert('Error generating 1080p TV board image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Fullscreen request error:', err);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col overflow-hidden text-white font-sans rounded-none animate-fadeIn">
      {/* =================================================================== */}
      {/* TOP TV CONTROLS BAR                                                 */}
      {/* =================================================================== */}
      <div className="bg-[#0B0F17] border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0 z-20 rounded-none">
        {/* Left Info */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-none bg-cyan-400 text-slate-950 font-black">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-none border border-cyan-500/40">
                1080p Showroom Display Hub
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline font-mono">
                Native 1920 × 1080 (16:9 Zero-Distortion Auto-Scale)
              </span>
            </div>
            <h3 className="text-base font-black text-white uppercase tracking-wider leading-none mt-1 font-mono">
              4315 Bragg Blvd Showroom TV Board &amp; USB Image Exporter
            </h3>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Theme Switcher for TV */}
          <div className="flex items-center bg-[#111824] p-1 rounded-none border border-slate-700 text-xs font-mono">
            <button
              onClick={() => setTvBoardTheme('carbonCyan')}
              className={`px-2.5 py-1 rounded-none font-bold transition cursor-pointer flex items-center gap-1 ${
                tvBoardTheme === 'carbonCyan'
                  ? 'bg-cyan-400 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>Carbon Cyan</span>
            </button>
            <button
              onClick={() => setTvBoardTheme('tacticalGold')}
              className={`px-2.5 py-1 rounded-none font-bold transition cursor-pointer flex items-center gap-1 ${
                tvBoardTheme === 'tacticalGold'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Fort Liberty Olive/Slate + Veteran Gold theme"
            >
              <span>Tactical Gold</span>
            </button>
          </div>

          {/* Setup Guide Button */}
          <button
            onClick={() => setShowSetupGuide(!showSetupGuide)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#121A26] hover:bg-[#1A2536] text-cyan-300 hover:text-white text-xs font-bold transition cursor-pointer border border-cyan-500/30 font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">4 Ways to Run on Showroom TV</span>
            {showSetupGuide ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Master White Paper Button */}
          <button
            onClick={() => setIsDiscoveryWhitePageOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-white text-slate-950 hover:bg-amber-100 text-xs font-black transition cursor-pointer border border-slate-300 shadow-sm font-mono uppercase"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>📄 Master White Paper</span>
          </button>

          {/* Download 1080p Image Button */}
          <button
            onClick={handleDownloadImage}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition cursor-pointer shadow-lg disabled:opacity-50 border border-emerald-400 font-mono uppercase"
            title="Export high-resolution 1920x1080 JPG to save on a USB flash drive"
          >
            {isExporting ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>
              {isExporting ? 'Generating 1080p JPG...' : '⬇️ Download 1080p JPG for USB Drive'}
            </span>
          </button>

          {/* Fullscreen TV Mode */}
          <button
            onClick={handleToggleFullscreen}
            className="p-2 rounded-none bg-[#121A26] hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700"
            title="Toggle Fullscreen on Showroom TV"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Close */}
          <button
            onClick={() => setIsTvBoardOpen(false)}
            className="p-2 rounded-none bg-[#121A26] hover:bg-rose-900 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Success Notification Bar */}
      {exportSuccess && (
        <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 flex items-center justify-center gap-2 shrink-0 rounded-none font-mono">
          <Check className="w-4 h-4" />
          <span>
            Success! Downloaded{' '}
            <strong>
              910PrintShop_Showroom_TV_1080p_{tvBoardTheme}_{new Date().toISOString().slice(0, 10)}.jpg
            </strong>{' '}
            (1920 × 1080). Copy to any USB flash drive and plug into your Showroom TV!
          </span>
        </div>
      )}

      {/* Slide-Down Showroom TV Deployment Guide */}
      {showSetupGuide && (
        <div className="bg-[#0F1520] border-b border-cyan-500/40 p-4 sm:p-6 overflow-y-auto max-h-72 shrink-0 z-10 shadow-2xl rounded-none">
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-cyan-400 font-mono">
                  4315 Bragg Blvd Showroom Deployment Options
                </span>
                <h4 className="text-base font-black text-white uppercase tracking-wider font-mono mt-0.5">
                  How to Run This 1080p Board on Your Lobby or Wrap Bay TV
                </h4>
              </div>
              <button
                onClick={() => setShowSetupGuide(false)}
                className="text-xs text-slate-400 hover:text-white font-bold font-mono cursor-pointer"
              >
                ✕ Close Guide
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#090D14] p-4 rounded-none border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono">
                  <Usb className="w-4 h-4" />
                  <span>1. USB Flash Drive (Zero Wi-Fi)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Click <strong>&quot;Download 1080p JPG for USB Drive&quot;</strong> above, copy to
                  any thumb drive, and plug directly into your Showroom TV&apos;s USB port.
                </p>
              </div>

              <div className="bg-[#090D14] p-4 rounded-none border border-cyan-500/50 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold font-mono">
                  <Wifi className="w-4 h-4" />
                  <span>2. Smart TV Browser (Live Sync)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Open this URL with <code>?tv=1</code> on your Smart TV browser. Every price, bay
                  status, or unit tier change updates live on the wall!
                </p>
              </div>

              <div className="bg-[#090D14] p-4 rounded-none border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold font-mono">
                  <Tv className="w-4 h-4" />
                  <span>3. $20 Fire Stick / Raspberry Pi</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Plug a Fire Stick or Raspberry Pi into the TV HDMI port to run the live board 24/7
                  with zero monthly digital signage subscription fees.
                </p>
              </div>

              <div className="bg-[#090D14] p-4 rounded-none border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold font-mono">
                  <Cable className="w-4 h-4" />
                  <span>4. Direct HDMI Second Screen</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Connect your shop design PC or counter laptop via HDMI, drag this window over, and
                  hit Fullscreen.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MAIN PREVIEW CONTAINER WITH DYNAMIC 1920x1080 AUTO-SCALING          */}
      {/* =================================================================== */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto flex items-center justify-center p-3 sm:p-6 bg-[#05070B]"
      >
        <div
          style={{
            width: '1920px',
            height: '1080px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            boxShadow: '0 30px 100px rgba(0,0,0,0.95)',
            imageRendering: '-webkit-optimize-contrast'
          }}
          className="shrink-0 transition-transform duration-150 rounded-none"
        >
          {/* =============================================================== */}
          {/* THE EXACT 1920 x 1080 SHOWROOM DISPLAY BOARD CANVAS             */}
          {/* =============================================================== */}
          <div
            ref={boardRef}
            id="tv-board-canvas"
            className={`relative w-[1920px] h-[1080px] flex flex-col justify-between overflow-hidden select-none border-4 rounded-none ${
              isTacticalTheme
                ? 'bg-[#111612] border-amber-500 text-[#F4F1EA]'
                : 'bg-[#090D14] border-cyan-400 text-white'
            }`}
          >
            {/* ============================================================= */}
            {/* VETERAN SHIELD EMBLEM SCREEN BUMPER FLASH (1.3s)              */}
            {/* ============================================================= */}
            {shieldFlashing && (
              <div className="absolute inset-0 z-50 bg-[#05070B] flex flex-col items-center justify-center p-12 text-center animate-fadeIn rounded-none border-8 border-amber-400">
                <div className="w-56 h-56 bg-[#111824] border-4 border-amber-400 flex flex-col items-center justify-center shadow-[0_0_90px_rgba(245,158,11,0.9)] rounded-none mb-8">
                  <Shield className="w-28 h-28 text-amber-400 mb-2" />
                  <span className="font-mono font-black text-xl uppercase tracking-widest text-white">
                    910 PRINTSHOP
                  </span>
                </div>
                <div className="bg-amber-400 text-slate-950 font-mono font-black text-2xl uppercase px-8 py-2 tracking-widest mb-4 rounded-none">
                  🛡️ VETERAN-OWNED &amp; LATINO-OWNED • 4315 BRAGG BLVD, FAYETTEVILLE, NC
                </div>
                <div className="text-6xl font-black uppercase text-white tracking-wider font-mono">
                  COMMERCIAL WRAPS • UNIT APPAREL • DECALS &amp; SIGNAGE
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* 1. TOP HEADER BAR (EXACT 120px HEIGHT)                        */}
            {/* ============================================================= */}
            <div
              className={`h-[120px] px-10 flex items-center justify-between shrink-0 shadow-lg border-b-4 rounded-none ${
                isTacticalTheme
                  ? 'bg-[#171E18] border-amber-500 text-white'
                  : 'bg-[#0E1520] border-cyan-400 text-white'
              }`}
            >
              {/* Brand Emblem & Showroom Title */}
              <div className="flex items-center gap-6">
                <div
                  className={`w-20 h-20 rounded-none border-4 flex flex-col items-center justify-center font-mono font-black shadow-xl ${
                    isTacticalTheme
                      ? 'bg-amber-500 text-slate-950 border-amber-200'
                      : 'bg-cyan-400 text-slate-950 border-white'
                  }`}
                >
                  <span className="text-3xl leading-none">910</span>
                  <span className="text-xs tracking-widest uppercase mt-0.5">PRINT</span>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-mono font-black uppercase tracking-wider px-3 py-0.5 rounded-none ${
                        isTacticalTheme
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      Veteran-Owned &amp; Latino-Owned • Hablamos Español
                    </span>
                    <span className="text-sm font-mono font-bold tracking-wider uppercase text-amber-300">
                      📍 {shopInfo.address}
                    </span>
                  </div>
                  <h1 className="text-5xl font-black uppercase tracking-wider leading-none mt-2 font-mono">
                    910 PRINTSHOP — COMMERCIAL WRAPS, APPAREL &amp; SIGNAGE
                  </h1>
                </div>
              </div>

              {/* Center Live Wrap Bay & 24h Rush Status Badges */}
              <div className="flex items-center gap-4">
                <div
                  className={`px-5 py-2.5 border-2 font-mono font-black text-base uppercase rounded-none flex items-center gap-2 ${
                    announcements.wrapBayOpen
                      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-400'
                      : 'bg-amber-950/90 text-amber-300 border-amber-400'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span>
                    {announcements.wrapBayOpen
                      ? '🟢 WRAP BAY: OPEN FOR INTAKE'
                      : '🚐 WRAP BAY: ACTIVE FLEET INSTALL'}
                  </span>
                </div>

                <div
                  className={`px-5 py-2.5 border-2 font-mono font-black text-base uppercase rounded-none flex items-center gap-2 ${
                    announcements.rushPrintOpen
                      ? 'bg-cyan-950/90 text-cyan-300 border-cyan-400'
                      : 'bg-rose-950/90 text-rose-300 border-rose-400'
                  }`}
                >
                  <Zap className="w-5 h-5" />
                  <span>
                    {announcements.rushPrintOpen
                      ? '⚡ 24-HR RUSH PRESS: OPEN'
                      : '🔒 24-HR RUSH PRESS: FULL'}
                  </span>
                </div>
              </div>

              {/* Right Phone / WhatsApp CTA */}
              <div className="text-right font-mono">
                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Call or WhatsApp Logo &amp; Vehicle Photos
                </div>
                <div className="flex items-center justify-end gap-2 text-3xl font-black text-amber-400 mt-0.5">
                  <Phone className="w-6 h-6 text-emerald-400" />
                  <span>{shopInfo.phoneDisplay}</span>
                </div>
                <div className="text-xs font-bold text-emerald-400">
                  Fast Digital Proofs • Zero Minimums on Custom Tees
                </div>
              </div>
            </div>

            {/* ============================================================= */}
            {/* 2. MAIN 3-COLUMN CONTENT BOARD (EXACT 865px HEIGHT)           */}
            {/* ============================================================= */}
            <div className="h-[865px] px-8 py-5 grid grid-cols-3 gap-6 shrink-0">
              {/* =========================================================== */}
              {/* COLUMN 1: COMMERCIAL VEHICLE WRAPS & CUSTOM DECALS          */}
              {/* =========================================================== */}
              <div
                className={`rounded-none p-5 flex flex-col justify-between shadow-xl border-2 ${
                  isTacticalTheme
                    ? 'bg-[#161D17] border-amber-500/40 text-white'
                    : 'bg-[#0F1622] border-cyan-500/40 text-white'
                }`}
              >
                <div>
                  {/* Wraps Header */}
                  <div
                    className={`border-b-4 pb-2 mb-3 flex items-baseline justify-between ${
                      isTacticalTheme ? 'border-amber-500' : 'border-cyan-400'
                    }`}
                  >
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-wider font-mono">
                        Commercial Vehicle &amp; Fleet Wraps
                      </h2>
                      <p
                        className={`text-xs font-mono font-bold uppercase ${
                          isTacticalTheme ? 'text-amber-300' : 'text-cyan-300'
                        }`}
                      >
                        3M &amp; Avery Dennison Cast Vinyl • Installed @ 4315 Bragg Blvd
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-bold uppercase">
                      Bay #1
                    </span>
                  </div>

                  {/* Wraps List */}
                  <div className="space-y-2 mb-4">
                    {catalog.wraps?.items.map(item => {
                      const isBooked = !item.inStock;
                      const ep = getEffectivePriceObj(item.price, item.numericPrice);
                      return (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between py-1.5 border-b border-slate-800 ${
                            isBooked ? 'opacity-45' : ''
                          }`}
                        >
                          <div className="flex-1 pr-3 min-w-0">
                            <span className="text-[17px] font-extrabold uppercase tracking-tight block leading-tight truncate">
                              {item.name}
                            </span>
                            <span className="text-[12px] font-mono text-slate-400 block mt-0.5 truncate">
                              {item.turnaround} • {item.unit}
                            </span>
                          </div>
                          <div className="shrink-0 text-right font-mono">
                            {isBooked ? (
                              <span className="bg-amber-500 text-slate-950 font-black text-xs uppercase px-2 py-0.5 rounded-none">
                                BAY BOOKED
                              </span>
                            ) : (
                              <span
                                className={`text-[21px] font-black ${
                                  isTacticalTheme ? 'text-amber-400' : 'text-cyan-300'
                                }`}
                              >
                                {ep.current}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Custom Vinyl Decals & Window Perf */}
                  <div
                    className={`border-b-2 pb-1.5 mb-2.5 flex items-baseline justify-between ${
                      isTacticalTheme
                        ? 'border-amber-500/60 text-amber-300'
                        : 'border-cyan-400/60 text-cyan-300'
                    }`}
                  >
                    <h3 className="text-xl font-black uppercase tracking-wider font-mono">
                      Custom Vinyl Decals &amp; Window Perf
                    </h3>
                    <span className="text-xs font-mono text-slate-400 uppercase font-bold">
                      Plotter Cut
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {catalog.decals?.items.map(item => {
                      const isOut = !item.inStock;
                      const ep = getEffectivePriceObj(item.price, item.numericPrice);
                      return (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between py-1 border-b border-slate-800 ${
                            isOut ? 'opacity-45' : ''
                          }`}
                        >
                          <div className="flex-1 pr-3 min-w-0">
                            <span className="text-[16px] font-extrabold uppercase block truncate">
                              {item.name}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 block truncate">
                              {item.unit} • {item.turnaround}
                            </span>
                          </div>
                          <div className="shrink-0 text-right font-mono">
                            {isOut ? (
                              <span className="bg-rose-600 text-white font-black text-xs uppercase px-2 py-0.5 rounded-none">
                                BOOKED
                              </span>
                            ) : (
                              <span
                                className={`text-[19px] font-black ${
                                  isTacticalTheme ? 'text-amber-400' : 'text-cyan-300'
                                }`}
                              >
                                {ep.current}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Real Portfolio Feature Card inside Column 1 */}
                <div className="pt-3 border-t-2 border-slate-800 flex items-center gap-3.5">
                  <img
                    src="./images/alpha-beavers-van-wrap.jpg"
                    alt="Alpha Beavers LLC Commercial Van Wrap"
                    className="w-28 h-18 object-cover border-2 border-cyan-400 shrink-0 rounded-none"
                  />
                  <div className="font-mono text-xs leading-snug">
                    <div className="text-amber-400 font-black uppercase">
                      ★ Bragg Blvd Build: Alpha Beavers LLC RAM ProMaster
                    </div>
                    <div className="text-slate-300 mt-0.5">
                      High-contrast rear barn doors + side fleet graphics engineered for 2-second
                      readability in traffic.
                    </div>
                  </div>
                </div>
              </div>

              {/* =========================================================== */}
              {/* COLUMN 2: CUSTOM APPAREL, MAGNETS, BANNERS & PRINT          */}
              {/* =========================================================== */}
              <div
                className={`rounded-none p-5 flex flex-col justify-between shadow-xl border-2 ${
                  isTacticalTheme
                    ? 'bg-[#161D17] border-amber-500/40 text-white'
                    : 'bg-[#0F1622] border-cyan-500/40 text-white'
                }`}
              >
                <div>
                  {/* Custom Apparel Header */}
                  <div
                    className={`border-b-4 pb-2 mb-2.5 flex items-baseline justify-between ${
                      isTacticalTheme ? 'border-amber-500' : 'border-cyan-400'
                    }`}
                  >
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-wider font-mono">
                        Custom T-Shirts &amp; Fort Liberty Unit Gear
                      </h2>
                      <p
                        className={`text-xs font-mono font-bold uppercase ${
                          isTacticalTheme ? 'text-amber-300' : 'text-cyan-300'
                        }`}
                      >
                        Full-Color DTF, Dye Sublimation &amp; Workwear • Zero Minimums
                      </p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                      No Minimums
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-3.5">
                    {catalog.apparel?.items.map(item => {
                      const isOut = !item.inStock;
                      const ep = getEffectivePriceObj(item.price, item.numericPrice);
                      return (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between py-1.5 border-b border-slate-800 ${
                            isOut ? 'opacity-45' : ''
                          }`}
                        >
                          <div className="flex-1 pr-3 min-w-0">
                            <span className="text-[16px] font-extrabold uppercase block truncate">
                              {item.name}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 block truncate">
                              {item.unit} • {item.turnaround}
                            </span>
                          </div>
                          <div className="shrink-0 text-right font-mono">
                            {isOut ? (
                              <span className="bg-rose-600 text-white font-black text-xs uppercase px-2 py-0.5 rounded-none">
                                QUEUE FULL
                              </span>
                            ) : (
                              <span
                                className={`text-[20px] font-black ${
                                  isTacticalTheme ? 'text-amber-400' : 'text-cyan-300'
                                }`}
                              >
                                {ep.current}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Car Magnets, Banners & Yard Signs */}
                  <div
                    className={`border-b-2 pb-1 mb-2 flex items-baseline justify-between ${
                      isTacticalTheme
                        ? 'border-amber-500/60 text-amber-300'
                        : 'border-cyan-400/60 text-cyan-300'
                    }`}
                  >
                    <h3 className="text-xl font-black uppercase tracking-wider font-mono">
                      Truck Magnets, 4&apos;×8&apos; Banners &amp; Yard Signs
                    </h3>
                    <span className="text-xs font-mono text-slate-400 uppercase font-bold">
                      24–48 Hr Turn
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-3.5">
                    {catalog.signage?.items.map(item => {
                      const isOut = !item.inStock;
                      const ep = getEffectivePriceObj(item.price, item.numericPrice);
                      return (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between py-1 border-b border-slate-800 ${
                            isOut ? 'opacity-45' : ''
                          }`}
                        >
                          <div className="flex-1 pr-3 min-w-0">
                            <span className="text-[15px] font-extrabold uppercase block truncate">
                              {item.name}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 block truncate">
                              {item.unit} • {item.turnaround}
                            </span>
                          </div>
                          <div className="shrink-0 text-right font-mono">
                            {isOut ? (
                              <span className="bg-rose-600 text-white font-black text-xs uppercase px-2 py-0.5 rounded-none">
                                BOOKED
                              </span>
                            ) : (
                              <span
                                className={`text-[19px] font-black ${
                                  isTacticalTheme ? 'text-amber-400' : 'text-cyan-300'
                                }`}
                              >
                                {ep.current}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Business Cards, Flyers & Sublimation */}
                  <div
                    className={`border-b-2 pb-1 mb-2 flex items-baseline justify-between ${
                      isTacticalTheme
                        ? 'border-amber-500/60 text-amber-300'
                        : 'border-cyan-400/60 text-cyan-300'
                    }`}
                  >
                    <h3 className="text-lg font-black uppercase tracking-wider font-mono">
                      16pt Business Cards, Flyers &amp; Sublimation
                    </h3>
                  </div>

                  <div className="space-y-1">
                    {catalog.print?.items.map(item => {
                      const ep = getEffectivePriceObj(item.price, item.numericPrice);
                      return (
                        <div
                          key={item.id}
                          className="flex justify-between items-baseline py-1 border-b border-slate-800"
                        >
                          <span className="text-[15px] font-bold uppercase truncate pr-2">
                            {item.name}
                          </span>
                          <span
                            className={`text-[17px] font-black font-mono shrink-0 ${
                              isTacticalTheme ? 'text-amber-400' : 'text-cyan-300'
                            }`}
                          >
                            {ep.current}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t-2 border-slate-800 text-center text-xs font-mono uppercase font-bold text-amber-300">
                  ★ Bring Your Own Garments or Choose From Our Tactical &amp; High-Vis Catalog ★
                </div>
              </div>

              {/* =========================================================== */}
              {/* COLUMN 3: TURNKEY BUNDLES & REAL PORTFOLIO PHOTOGRAPHY      */}
              {/* =========================================================== */}
              <div
                className={`rounded-none p-5 flex flex-col justify-between shadow-xl border-2 ${
                  isTacticalTheme
                    ? 'bg-[#161D17] border-amber-500/40 text-white'
                    : 'bg-[#0F1622] border-cyan-500/40 text-white'
                }`}
              >
                <div>
                  {/* Turnkey Bundles Header */}
                  <div
                    className={`border-b-4 pb-2 mb-3 flex items-baseline justify-between ${
                      isTacticalTheme ? 'border-amber-500' : 'border-cyan-400'
                    }`}
                  >
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-wider font-mono">
                        Turnkey Contractor &amp; Unit Bundles
                      </h2>
                      <p
                        className={`text-xs font-mono font-bold uppercase ${
                          isTacticalTheme ? 'text-amber-300' : 'text-cyan-300'
                        }`}
                      >
                        Complete Day-1 Branding Packages • Ready in Days
                      </p>
                    </div>
                    <span className="bg-amber-400 text-slate-950 text-xs font-mono font-black px-2 py-0.5 uppercase rounded-none">
                      Bundle &amp; Save
                    </span>
                  </div>

                  {/* 4 Featured Packages */}
                  <div className="space-y-2.5 mb-4">
                    {packages.map(pkg => {
                      const isOut = !pkg.inStock;
                      const ep = getEffectivePriceObj(pkg.price, pkg.numericPrice);
                      return (
                        <div
                          key={pkg.id}
                          className={`p-3 border-2 bg-[#0B1018] rounded-none ${
                            isTacticalTheme ? 'border-amber-500/40' : 'border-slate-700'
                          } ${isOut ? 'opacity-45' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <span className="text-[10px] font-mono font-black uppercase text-amber-400 block">
                                {pkg.badge} • {pkg.savingsText}
                              </span>
                              <div className="text-[16px] font-extrabold uppercase text-white truncate mt-0.5">
                                {pkg.name}
                              </div>
                            </div>
                            {isOut ? (
                              <span className="bg-rose-600 text-white font-mono font-black text-xs px-2 py-0.5 uppercase shrink-0 rounded-none">
                                BOOKED
                              </span>
                            ) : (
                              <span className="text-[22px] font-mono font-black text-emerald-400 shrink-0">
                                {ep.current}
                              </span>
                            )}
                          </div>
                          <ul className="mt-1.5 space-y-0.5 text-[11px] font-mono text-slate-300">
                            {pkg.includes.map((inc, i) => (
                              <li key={i} className="truncate">
                                ✓ {inc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  {/* Showroom Portfolio Proof Gallery */}
                  <div
                    className={`border-b-2 pb-1 mb-2.5 flex items-baseline justify-between ${
                      isTacticalTheme
                        ? 'border-amber-500/60 text-amber-300'
                        : 'border-cyan-400/60 text-cyan-300'
                    }`}
                  >
                    <h3 className="text-lg font-black uppercase tracking-wider font-mono">
                      Printed &amp; Installed @ 4315 Bragg Blvd
                    </h3>
                    <span className="text-xs font-mono text-slate-400 uppercase font-bold">
                      @910printshop
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {portfolio.map(work => (
                      <div
                        key={work.id}
                        className="bg-[#090D14] border border-slate-700 overflow-hidden rounded-none"
                      >
                        <img
                          src={work.image}
                          alt={work.alt}
                          className="w-full h-24 object-cover rounded-none"
                        />
                        <div className="p-1.5 font-mono">
                          <div className="text-[10px] font-black uppercase text-cyan-300 truncate">
                            {work.category}
                          </div>
                          <div className="text-[10px] text-slate-300 truncate">{work.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Notice */}
                <div className="pt-2 border-t-2 border-slate-800 flex items-center justify-between text-xs font-mono font-bold text-emerald-400">
                  <span>📲 TEXT / WHATSAPP ARTWORK: (910) 920-0863</span>
                  <span className="text-slate-400">Mon–Fri 9AM–6PM • Sat 10AM–4PM</span>
                </div>
              </div>
            </div>

            {/* ============================================================= */}
            {/* 3. BOTTOM FOOTER & SHOWROOM STATUS TICKER (EXACT 95px HEIGHT) */}
            {/* ============================================================= */}
            <div
              className={`h-[95px] px-10 flex items-center justify-between shrink-0 shadow-2xl border-t-4 rounded-none ${
                isTacticalTheme
                  ? 'bg-[#171E18] border-amber-500 text-white'
                  : 'bg-[#0D131D] border-cyan-400 text-white'
              }`}
            >
              {/* Left Showroom Mode Badge */}
              <div className="flex items-center gap-4">
                <span
                  className={`font-black text-sm uppercase px-3.5 py-2 rounded-none font-mono tracking-wider ${
                    isTacticalTheme ? 'bg-amber-500 text-slate-950' : 'bg-cyan-400 text-slate-950'
                  }`}
                >
                  {currentMode.statusBadge || 'SHOWROOM OPEN'}
                </span>
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-wider leading-none font-mono">
                    {currentMode.name}
                  </h4>
                  <p className="text-xs font-mono mt-1 text-slate-300 font-bold">
                    📍 {shopInfo.address} • {currentMode.hours}
                  </p>
                </div>
              </div>

              {/* Center Callout */}
              <div className="text-center font-mono text-xs">
                <div className="font-black uppercase tracking-wider text-amber-300 text-sm">
                  ★ COMMERCIAL FLEET WRAPS • FORT LIBERTY UNIT SHIRTS • MAGNETS &amp; BANNERS ★
                </div>
                <div className="text-slate-300 text-xs mt-1">
                  📲 Message <strong>(910) 920-0863</strong> on WhatsApp with your logo or vehicle
                  photo for a fast proof!
                </div>
              </div>

              {/* Right Branding */}
              <div className="text-right font-mono">
                <div className="text-lg font-black uppercase tracking-widest leading-none text-white">
                  910 PRINTSHOP • FAYETTEVILLE, NC
                </div>
                <div className="text-xs text-emerald-400 font-bold mt-1">
                  Veteran-Owned • Latino-Owned • Hablamos Español
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
