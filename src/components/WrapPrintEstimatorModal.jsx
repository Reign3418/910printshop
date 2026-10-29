import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Calculator,
  Car,
  Shirt,
  Flag,
  CheckCircle2,
  MessageCircle,
  Phone,
  Plus,
  Sparkles
} from 'lucide-react';

const VEHICLE_CLASSES = [
  { id: 'cargo-van', name: 'Commercial Cargo Van (RAM ProMaster / Ford Transit / Sprinter)', baseFull: 2650, basePartial: 1150, baseDoors: 325 },
  { id: 'pickup-truck', name: 'Full-Size Pickup / Crew Cab Work Truck (F-150 / RAM / Silverado)', baseFull: 2450, basePartial: 995, baseDoors: 295 },
  { id: 'box-trailer', name: 'Box Truck / Food Trailer / Enclosed Utility Trailer (16–24 ft)', baseFull: 3100, basePartial: 1450, baseDoors: 425 },
  { id: 'sedan-suv', name: 'Company Sedan / Crossover / Compact Fleet SUV', baseFull: 2150, basePartial: 850, baseDoors: 275 }
];

const WRAP_COVERAGE = [
  { id: 'partial', name: 'High-ROI Partial Wrap (Rear Doors + Sides — Most Popular!)', multiplier: 1.0, field: 'basePartial' },
  { id: 'full', name: 'Full Bumper-to-Bumper Commercial Wrap', multiplier: 1.0, field: 'baseFull' },
  { id: 'doors', name: 'Cab Doors + Tailgate Logo, Phone & USDOT Kit', multiplier: 1.0, field: 'baseDoors' }
];

const SHIRT_TYPES = [
  { id: 'dtf-ringspun', name: 'Soft Ringspun Cotton Tee (Full-Color DTF Print)', basePrice: 24 },
  { id: 'tactical-moisture', name: 'Military PT / Moisture-Wicking Tactical Performance Tee', basePrice: 26 },
  { id: 'safety-hivis', name: 'High-Visibility ANSI Safety Green / Orange Crew Shirt', basePrice: 25 },
  { id: 'heavy-hoodie', name: 'Heavyweight Fleece Pullover Hoodie (Front + Full Back)', basePrice: 45 }
];

export default function WrapPrintEstimatorModal() {
  const {
    isEstimatorModalOpen,
    setIsEstimatorModalOpen,
    addToQuote,
    setIsQuoteDrawerOpen,
    shopInfo
  } = useShop();

  const [activeTab, setActiveTab] = useState('wrap'); // 'wrap' | 'apparel' | 'signage'

  // Wrap Calculator State
  const [vehicleClass, setVehicleClass] = useState('cargo-van');
  const [coverageType, setCoverageType] = useState('partial');
  const [includeWindowPerf, setIncludeWindowPerf] = useState(true);
  const [includeDesignSetup, setIncludeDesignSetup] = useState(false);
  const [fleetCount, setFleetCount] = useState(1);

  // Apparel Calculator State
  const [shirtType, setShirtType] = useState('dtf-ringspun');
  const [shirtQty, setShirtQty] = useState(25);
  const [printLocations, setPrintLocations] = useState('front-back'); // 'front' | 'front-back' | 'front-back-sleeve'

  // Banner / Magnet Calculator State
  const [bannerWidth, setBannerWidth] = useState(8);
  const [bannerHeight, setBannerHeight] = useState(4);
  const [magnetPairs, setMagnetPairs] = useState(1);
  const [yardSignPacks, setYardSignPacks] = useState(0);

  if (!isEstimatorModalOpen) return null;

  // Compute Vehicle Wrap Estimate
  const selectedVehicle = VEHICLE_CLASSES.find((v) => v.id === vehicleClass) || VEHICLE_CLASSES[0];
  const selectedCoverage = WRAP_COVERAGE.find((c) => c.id === coverageType) || WRAP_COVERAGE[0];
  const singleWrapBase = selectedVehicle[selectedCoverage.field];
  const windowPerfAddon = includeWindowPerf ? 185 : 0;
  const designAddon = includeDesignSetup ? 150 : 0;
  const rawWrapTotal = (singleWrapBase + windowPerfAddon + designAddon) * fleetCount;
  const fleetDiscountPct = fleetCount >= 3 ? 10 : fleetCount === 2 ? 5 : 0;
  const finalWrapEstimate = Math.round(rawWrapTotal * (1 - fleetDiscountPct / 100));

  // Compute Apparel Bulk Estimate
  const selectedShirt = SHIRT_TYPES.find((s) => s.id === shirtType) || SHIRT_TYPES[0];
  const qtyDiscountMultiplier =
    shirtQty >= 50 ? 0.55 : shirtQty >= 25 ? 0.62 : shirtQty >= 12 ? 0.72 : 1.0;
  const locationAddon =
    printLocations === 'front-back-sleeve' ? 4.5 : printLocations === 'front-back' ? 2.5 : 0;
  const unitShirtPrice = Math.max(
    11.5,
    Math.round((selectedShirt.basePrice * qtyDiscountMultiplier + locationAddon) * 100) / 100
  );
  const finalApparelEstimate = Math.round(unitShirtPrice * shirtQty);

  // Compute Banner & Signage Estimate
  const sqFt = Math.max(4, bannerWidth * bannerHeight);
  const bannerEstimate = Math.round(sqFt * 3.6);
  const magnetEstimate = magnetPairs * 95;
  const yardSignsEstimate = yardSignPacks * 165;
  const finalSignageEstimate = bannerEstimate + magnetEstimate + yardSignsEstimate;

  const currentTotal =
    activeTab === 'wrap'
      ? finalWrapEstimate
      : activeTab === 'apparel'
      ? finalApparelEstimate
      : finalSignageEstimate;

  const currentSummaryText =
    activeTab === 'wrap'
      ? `${fleetCount}x ${selectedVehicle.name} (${selectedCoverage.name})${
          includeWindowPerf ? ' + Rear Window Perf' : ''
        }${includeDesignSetup ? ' + Custom Artwork Package' : ''} — Est. $${finalWrapEstimate.toLocaleString()}`
      : activeTab === 'apparel'
      ? `${shirtQty}x ${selectedShirt.name} (${printLocations.replace(/-/g, ' + ')}) @ $${unitShirtPrice.toFixed(
          2
        )}/ea — Est. $${finalApparelEstimate.toLocaleString()}`
      : `${bannerWidth}'x${bannerHeight}' Heavy Vinyl Banner ($${bannerEstimate})${
          magnetPairs > 0 ? ` + ${magnetPairs} Pair(s) 30-Mil Truck Magnets ($${magnetEstimate})` : ''
        }${
          yardSignPacks > 0 ? ` + ${yardSignPacks * 10} Yard Signs ($${yardSignsEstimate})` : ''
        } — Est. $${finalSignageEstimate.toLocaleString()}`;

  const handleAddEstimateToQuote = () => {
    addToQuote(
      {
        id: `est-${activeTab}-${Date.now()}`,
        name:
          activeTab === 'wrap'
            ? `Custom Wrap Estimate: ${selectedCoverage.name}`
            : activeTab === 'apparel'
            ? `Custom Apparel Run (${shirtQty} pcs)`
            : `Custom Banner & Signage Pack`,
        price: `$${currentTotal.toFixed(2)}`,
        numericPrice: currentTotal,
        unit: 'custom estimate'
      },
      currentSummaryText
    );
    setIsEstimatorModalOpen(false);
    setIsQuoteDrawerOpen(true);
  };

  const whatsappDirectHref = `https://wa.me/19109200863?text=${encodeURIComponent(
    `Hi 910 PrintShop! I used your online Quote Estimator and would like to lock in a proof for:\n\n• ${currentSummaryText}\n\nMy name & timeline:`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto p-2 sm:p-6 flex justify-center items-start animate-fadeIn">
      <div className="bg-[#0E131A] text-white border-2 border-cyan-500/60 shadow-2xl max-w-3xl w-full my-4 rounded-none overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#080B0F] border-b border-[#1E293B] px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="bg-amber-500 text-slate-950 p-2 rounded-none font-black">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 block">
                Interactive 910 PrintShop Pricing Engine
              </span>
              <h2 className="text-lg sm:text-xl font-black uppercase font-['Bebas_Neue'] tracking-wider text-white">
                Instant Vehicle Wrap, Unit Apparel &amp; Banner Estimator
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsEstimatorModalOpen(false)}
            className="p-2 bg-[#161F2C] hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-none cursor-pointer"
            aria-label="Close Estimator"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-3 border-b border-[#1E293B] bg-[#0B0F15]">
          <button
            type="button"
            onClick={() => setActiveTab('wrap')}
            className={`py-3 px-2 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider border-b-2 transition cursor-pointer rounded-none ${
              activeTab === 'wrap'
                ? 'border-cyan-400 bg-[#131C28] text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Car className="w-4 h-4 shrink-0" />
            <span>1. Vehicle Wraps</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('apparel')}
            className={`py-3 px-2 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider border-b-2 transition cursor-pointer rounded-none ${
              activeTab === 'apparel'
                ? 'border-amber-400 bg-[#131C28] text-amber-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Shirt className="w-4 h-4 shrink-0" />
            <span>2. Unit / Crew Shirts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('signage')}
            className={`py-3 px-2 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider border-b-2 transition cursor-pointer rounded-none ${
              activeTab === 'signage'
                ? 'border-emerald-400 bg-[#131C28] text-emerald-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Flag className="w-4 h-4 shrink-0" />
            <span>3. Banners &amp; Magnets</span>
          </button>
        </div>

        {/* Calculator Body */}
        <div className="p-4 sm:p-6 space-y-6">
          {activeTab === 'wrap' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2">
                  Step 1: Select Vehicle or Trailer Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {VEHICLE_CLASSES.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVehicleClass(v.id)}
                      className={`p-3 text-left border transition cursor-pointer rounded-none ${
                        vehicleClass === v.id
                          ? 'bg-cyan-500/15 border-cyan-400 text-white'
                          : 'bg-[#121822] border-[#243044] text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="font-bold text-xs">{v.name}</div>
                      <div className="text-[11px] font-mono text-cyan-400 mt-1">
                        Partial: ${v.basePartial.toLocaleString()} • Full: ${v.baseFull.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2">
                  Step 2: Choose Wrap Coverage Level
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {WRAP_COVERAGE.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCoverageType(c.id)}
                      className={`p-3 text-left border flex items-center justify-between transition cursor-pointer rounded-none ${
                        coverageType === c.id
                          ? 'bg-cyan-500/15 border-cyan-400 text-white'
                          : 'bg-[#121822] border-[#243044] text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <span className="font-bold text-xs">{c.name}</span>
                      <span className="font-mono font-black text-sm text-cyan-300">
                        ${selectedVehicle[c.field].toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <label className="flex items-center gap-2.5 p-3 bg-[#121822] border border-[#243044] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeWindowPerf}
                    onChange={(e) => setIncludeWindowPerf(e.target.checked)}
                    className="w-4 h-4 accent-cyan-400"
                  />
                  <span className="text-xs">
                    <strong className="block text-white">+ Rear Window Perf</strong>
                    <span className="text-slate-400 font-mono">+$185 DOT See-Through</span>
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-3 bg-[#121822] border border-[#243044] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeDesignSetup}
                    onChange={(e) => setIncludeDesignSetup(e.target.checked)}
                    className="w-4 h-4 accent-cyan-400"
                  />
                  <span className="text-xs">
                    <strong className="block text-white">+ Custom Mascot/Logo</strong>
                    <span className="text-slate-400 font-mono">+$150 Vector Design</span>
                  </span>
                </label>

                <div className="p-3 bg-[#121822] border border-[#243044] flex items-center justify-between">
                  <span className="text-xs font-bold">Fleet Vehicles:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFleetCount(Math.max(1, fleetCount - 1))}
                      className="w-7 h-7 bg-slate-800 border border-slate-600 font-mono font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono font-black text-sm w-5 text-center">{fleetCount}</span>
                    <button
                      type="button"
                      onClick={() => setFleetCount(Math.min(20, fleetCount + 1))}
                      className="w-7 h-7 bg-slate-800 border border-slate-600 font-mono font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'apparel' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-amber-300 mb-2">
                  Step 1: Choose Garment Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SHIRT_TYPES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setShirtType(s.id)}
                      className={`p-3 text-left border transition cursor-pointer rounded-none ${
                        shirtType === s.id
                          ? 'bg-amber-500/15 border-amber-400 text-white'
                          : 'bg-[#121822] border-[#243044] text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="font-bold text-xs">{s.name}</div>
                      <div className="text-[11px] font-mono text-amber-400 mt-1">
                        Single Base: ${s.basePrice}/ea • Bulk Tier Discounts Auto-Applied
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-[#121822] border border-[#243044] space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-300">Quantity (Mix Sizes S–3XL):</span>
                    <span className="font-mono font-black text-amber-400">{shirtQty} Shirts</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="150"
                    value={shirtQty}
                    onChange={(e) => setShirtQty(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>1 (No Min!)</span>
                    <span>15 Crew</span>
                    <span>25 Unit Pack</span>
                    <span>50+ Max Tier</span>
                  </div>
                </div>

                <div className="p-3.5 bg-[#121822] border border-[#243044] space-y-2">
                  <span className="block text-xs font-bold text-slate-300">Print Locations:</span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {[
                      { id: 'front', label: 'Front Chest Only' },
                      { id: 'front-back', label: 'Left Chest Crest + Full Back Artwork' },
                      { id: 'front-back-sleeve', label: 'Chest + Full Back + US Flag Sleeve' }
                    ].map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setPrintLocations(loc.id)}
                        className={`py-1.5 px-2.5 text-left text-xs font-bold border cursor-pointer rounded-none ${
                          printLocations === loc.id
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                            : 'bg-[#0C1017] border-slate-800 text-slate-400'
                        }`}
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'signage' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#121822] border border-[#243044] space-y-3">
                  <div className="text-xs font-mono font-bold uppercase text-emerald-400">
                    Large-Format 13oz–18oz Vinyl Banner
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Width (Feet):</span>
                    <input
                      type="number"
                      min="2"
                      max="20"
                      value={bannerWidth}
                      onChange={(e) => setBannerWidth(Math.max(1, Number(e.target.value)))}
                      className="w-20 bg-[#0A0E14] border border-slate-700 px-2 py-1 font-mono text-right"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Height (Feet):</span>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={bannerHeight}
                      onChange={(e) => setBannerHeight(Math.max(1, Number(e.target.value)))}
                      className="w-20 bg-[#0A0E14] border border-slate-700 px-2 py-1 font-mono text-right"
                    />
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                    Size: {bannerWidth}&apos; × {bannerHeight}&apos; ({sqFt} sq.ft. w/ hems &amp; grommets) ={' '}
                    <strong className="text-emerald-300">${bannerEstimate}</strong>
                  </div>
                </div>

                <div className="p-4 bg-[#121822] border border-[#243044] space-y-3">
                  <div className="text-xs font-mono font-bold uppercase text-emerald-400">
                    Truck Magnets &amp; Coroplast Yard Signs
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Pairs of 18&quot;×24&quot; Truck Magnets ($95/pr):</span>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={magnetPairs}
                      onChange={(e) => setMagnetPairs(Math.max(0, Number(e.target.value)))}
                      className="w-20 bg-[#0A0E14] border border-slate-700 px-2 py-1 font-mono text-right"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>10-Packs of Yard Signs + Stakes ($165/pk):</span>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={yardSignPacks}
                      onChange={(e) => setYardSignPacks(Math.max(0, Number(e.target.value)))}
                      className="w-20 bg-[#0A0E14] border border-slate-700 px-2 py-1 font-mono text-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Live Estimate Readout Box */}
          <div className="bg-[#090D12] border-2 border-cyan-500/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Estimated Turnkey Shop Quote (4315 Bragg Blvd)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{currentSummaryText}</p>
              <p className="text-[11px] text-slate-500 font-mono">
                Includes free digital proof &amp; consultation • Veteran &amp; Fleet friendly
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <div className="text-[10px] font-mono uppercase text-slate-400">Estimated Total</div>
              <div className="text-3xl font-black font-mono text-cyan-300">
                ${currentTotal.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={handleAddEstimateToQuote}
              className="py-3 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer rounded-none shadow"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add to My Quote Tray</span>
            </button>

            <a
              href={whatsappDirectHref}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-none shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send to WhatsApp</span>
            </a>

            <a
              href={`tel:${shopInfo.phoneRaw}`}
              className="py-3 px-4 bg-[#182230] hover:bg-[#223042] text-white border border-slate-600 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-none"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call {shopInfo.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
