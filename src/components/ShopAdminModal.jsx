import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Wrench,
  Zap,
  Shield,
  Truck,
  Check,
  RefreshCw,
  Power,
  Pencil,
  Search,
  Tv,
  Smartphone,
  MapPin,
  Megaphone,
  Package,
  Layers
} from 'lucide-react';

export default function ShopAdminModal() {
  const {
    shopInfo,
    isShopAdminOpen,
    setIsShopAdminOpen,
    setIsTvBoardOpen,
    setIsShopSimOpen,
    catalog,
    packages,
    shopStatus,
    announcements,
    setAnnouncements,
    toggleItemAvailability,
    editCatalogItem,
    togglePackageAvailability,
    editPackage,
    toggleWrapBayStatus,
    toggleRushPrintStatus,
    triggerVolumeTier,
    updateCurrentShopMode,
    resetToDefaults,
    getEffectivePriceObj
  } = useShop();

  const [activeTab, setActiveTab] = useState('command'); // 'command' | 'catalog' | 'status'
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' | 'packages' | 'wraps' | 'apparel' | 'signage' | 'decals' | 'print'
  const [searchQuery, setSearchQuery] = useState('');
  const [saveBannerMsg, setSaveBannerMsg] = useState('');

  // Editable Shop Status & Marquee form state
  const [modeName, setModeName] = useState(shopStatus?.currentMode?.name || '');
  const [modeAddress, setModeAddress] = useState(shopStatus?.currentMode?.address || '');
  const [modeHours, setModeHours] = useState(shopStatus?.currentMode?.hours || '');
  const [modeBadge, setModeBadge] = useState(shopStatus?.currentMode?.statusBadge || '');
  const [modeNotes, setModeNotes] = useState(shopStatus?.currentMode?.notes || '');
  const [marqueeInput, setMarqueeInput] = useState(announcements?.marqueeText || '');
  const [bayNoteInput, setBayNoteInput] = useState(announcements?.bayNote || '');

  // Edit Item / Package Modal state
  const [editingTarget, setEditingTarget] = useState(null); // { isPackage: bool, categoryKey, item }
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editUnitOrSavings, setEditUnitOrSavings] = useState('');
  const [editTurnaroundOrBadge, setEditTurnaroundOrBadge] = useState('');
  const [editTag, setEditTag] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    if (shopStatus?.currentMode) {
      setModeName(shopStatus.currentMode.name || '');
      setModeAddress(shopStatus.currentMode.address || '');
      setModeHours(shopStatus.currentMode.hours || '');
      setModeBadge(shopStatus.currentMode.statusBadge || '');
      setModeNotes(shopStatus.currentMode.notes || '');
    }
  }, [shopStatus]);

  useEffect(() => {
    if (announcements) {
      setMarqueeInput(announcements.marqueeText || '');
      setBayNoteInput(announcements.bayNote || '');
    }
  }, [announcements]);

  if (!isShopAdminOpen) return null;

  const notify = (msg) => {
    setSaveBannerMsg(msg);
    setTimeout(() => setSaveBannerMsg(''), 2600);
  };

  const volumeTiers = [
    {
      pct: 0,
      label: '0% Standard',
      sub: 'Retail Walk-In Pricing',
      badge: 'STANDARD RETAIL'
    },
    {
      pct: 5,
      label: '-5% Crew Tier',
      sub: 'Local Trade & Contractor Crew',
      badge: 'CREW PARTNER (-5%)'
    },
    {
      pct: 10,
      label: '-10% Military Unit',
      sub: 'Fort Liberty Unit / Airborne Spec',
      badge: 'MILITARY UNIT (-10%)'
    },
    {
      pct: 15,
      label: '-15% Commercial Fleet',
      sub: '3+ Vehicle Fleet / B2B Contract',
      badge: 'FLEET CONTRACT (-15%)'
    }
  ];

  const handleApplyPresetMode = (preset) => {
    updateCurrentShopMode(preset);
    setModeName(preset.name);
    setModeAddress(preset.address);
    setModeHours(preset.hours);
    setModeBadge(preset.statusBadge);
    setModeNotes(preset.notes || '');
    notify(`Shop Status switched to: ${preset.statusBadge}`);
  };

  const handleSaveCustomMode = (e) => {
    e.preventDefault();
    updateCurrentShopMode({
      id: 'custom-mode',
      name: modeName,
      address: modeAddress,
      hours: modeHours,
      statusBadge: modeBadge,
      notes: modeNotes
    });
    notify('Custom Showroom & Bay status published!');
  };

  const handleSaveMarquee = (e) => {
    e.preventDefault();
    setAnnouncements(prev => ({
      ...prev,
      marqueeText: marqueeInput,
      bayNote: bayNoteInput
    }));
    notify('Top Marquee Banner & Bay Note updated!');
  };

  const openEditModal = (item, categoryKey = null, isPackage = false) => {
    setEditingTarget({ isPackage, categoryKey, item });
    setEditName(item.name || '');
    setEditPrice(item.price || '');
    if (isPackage) {
      setEditUnitOrSavings(item.savingsText || '');
      setEditTurnaroundOrBadge(item.badge || '');
      setEditTag('');
    } else {
      setEditUnitOrSavings(item.unit || '');
      setEditTurnaroundOrBadge(item.turnaround || '');
      setEditTag(item.tag || '');
    }
    setEditDescription(item.description || '');
  };

  const handleSaveEditModal = (e) => {
    e.preventDefault();
    if (!editingTarget) return;
    const numericPrice = parseFloat(String(editPrice).replace(/[^0-9.]/g, '')) || 0;

    if (editingTarget.isPackage) {
      editPackage(editingTarget.item.id, {
        name: editName,
        price: editPrice,
        numericPrice,
        savingsText: editUnitOrSavings,
        badge: editTurnaroundOrBadge,
        description: editDescription
      });
      notify(`Updated Package: "${editName}"`);
    } else {
      editCatalogItem(editingTarget.categoryKey, editingTarget.item.id, {
        name: editName,
        price: editPrice,
        numericPrice,
        unit: editUnitOrSavings,
        turnaround: editTurnaroundOrBadge,
        tag: editTag,
        description: editDescription
      });
      notify(`Updated Service: "${editName}"`);
    }
    setEditingTarget(null);
  };

  const handleFactoryReset = () => {
    resetToDefaults();
    notify('Reset all catalog prices, packages, bay switches, and tiers to factory defaults!');
  };

  const categoryKeys = Object.keys(catalog || {});

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md"
      onClick={() => setIsShopAdminOpen(false)}
    >
      <div
        className="bg-stone-950 border-2 border-cyan-500 rounded-none max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden text-stone-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Command Header */}
        <div className="bg-stone-900 border-b-2 border-stone-800 p-3 sm:p-5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-none bg-cyan-400 text-stone-950 font-black">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-none border border-cyan-500/40">
                  10-Second Shop Owner Command Center
                </span>
                <span className="text-xs text-stone-400 hidden sm:inline font-mono">
                  {shopInfo.address} • {shopInfo.phoneDisplay}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider leading-none mt-1">
                910 PrintShop Live Bay, Pricing Tier &amp; Catalog Controller
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setIsShopAdminOpen(false);
                setIsTvBoardOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition cursor-pointer"
              title="Open 1080p Showroom TV Board"
            >
              <Tv className="w-4 h-4" />
              <span>TV Board</span>
            </button>

            <button
              onClick={() => {
                setIsShopAdminOpen(false);
                setIsShopSimOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-none bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider transition cursor-pointer"
              title="Open Dual-Screen Shop + Phone Simulator"
            >
              <Smartphone className="w-4 h-4" />
              <span>Live Sim</span>
            </button>

            <button
              onClick={() => setIsShopAdminOpen(false)}
              className="p-2 rounded-none bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer border border-stone-700"
              title="Close Admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-stone-900/70 border-b border-stone-800 px-3 sm:px-5 py-2 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('command')}
            className={`px-3 py-1.5 rounded-none text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'command'
                ? 'bg-cyan-400 text-stone-950'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>⚡ 1. Bay Switches &amp; B2B Tiers</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 rounded-none text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'bg-cyan-400 text-stone-950'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>📋 2. Service Catalog &amp; Packages ({categoryKeys.length} Categories)</span>
          </button>

          <button
            onClick={() => setActiveTab('status')}
            className={`px-3 py-1.5 rounded-none text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'status'
                ? 'bg-cyan-400 text-stone-950'
                : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>📍 3. Shop Presets &amp; Marquee Banner</span>
          </button>
        </div>

        {/* Instant Toast Notification */}
        {saveBannerMsg && (
          <div className="bg-emerald-600 text-white text-xs font-black py-2 px-4 flex items-center justify-center gap-2 rounded-none shrink-0">
            <Check className="w-4 h-4" />
            <span>{saveBannerMsg}</span>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: 10-SECOND BAY SWITCHES, SILENT B2B/MILITARY TIERS & QUICK PRESETS */}
          {activeTab === 'command' && (
            <div className="space-y-6">
              {/* Row 1: Wrap Bay Status + 24-Hr Rush Print Press Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Wrap Bay Toggle Card */}
                <div
                  className={`p-5 rounded-none border-2 transition ${
                    announcements.wrapBayOpen
                      ? 'bg-emerald-950/25 border-emerald-500/70'
                      : 'bg-amber-950/25 border-amber-500/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-mono font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                        <Truck className="w-4 h-4" /> 4315 Bragg Blvd Wrap Bay Status
                      </span>
                      <h4 className="text-lg font-black text-white mt-1">
                        {announcements.wrapBayOpen
                          ? '🟢 WRAP BAY OPEN FOR DROP-OFFS & QUOTES'
                          : '🟡 WRAP BAY IN FULL FLEET INSTALL (BY APPT)'}
                      </h4>
                      <p className="text-xs text-stone-400 mt-1">
                        Controls the live Wrap Bay badge on the website header, Showroom TV board, and estimator.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      toggleWrapBayStatus();
                      notify(
                        !announcements.wrapBayOpen
                          ? 'Wrap Bay marked OPEN on live site & Showroom TV!'
                          : 'Wrap Bay switched to BOOKED / BY APPOINTMENT mode!'
                      );
                    }}
                    className={`mt-4 w-full py-3 px-4 rounded-none font-black text-xs uppercase tracking-widest transition cursor-pointer flex items-center justify-center gap-2 ${
                      announcements.wrapBayOpen
                        ? 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    <span>
                      {announcements.wrapBayOpen
                        ? 'Switch Wrap Bay to "Booked / By Appt"'
                        : 'Switch Wrap Bay to "OPEN for Drop-Offs"'}
                    </span>
                  </button>
                </div>

                {/* 24-Hr Rush Print Press Toggle Card */}
                <div
                  className={`p-5 rounded-none border-2 transition ${
                    announcements.rushPrintOpen
                      ? 'bg-cyan-950/25 border-cyan-500/70'
                      : 'bg-rose-950/25 border-rose-500/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-mono font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Zap className="w-4 h-4" /> 24-Hr Rush Shirt &amp; Banner Press Slot
                      </span>
                      <h4 className="text-lg font-black text-white mt-1">
                        {announcements.rushPrintOpen
                          ? '⚡ 24-HR RUSH PRINT PRESS: SLOTS OPEN'
                          : '🔴 RUSH PRESS AT CAPACITY (STANDARD 48–72HR)'}
                      </h4>
                      <p className="text-xs text-stone-400 mt-1">
                        Lets Fort Liberty units and local contractors know if same-day / 24-hr rush printing is open today.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      toggleRushPrintStatus();
                      notify(
                        !announcements.rushPrintOpen
                          ? '24-Hr Rush Print Press marked OPEN!'
                          : '24-Hr Rush Print Press marked AT CAPACITY!'
                      );
                    }}
                    className={`mt-4 w-full py-3 px-4 rounded-none font-black text-xs uppercase tracking-widest transition cursor-pointer flex items-center justify-center gap-2 ${
                      announcements.rushPrintOpen
                        ? 'bg-rose-600 hover:bg-rose-500 text-white'
                        : 'bg-cyan-400 hover:bg-cyan-300 text-stone-950'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    <span>
                      {announcements.rushPrintOpen
                        ? 'Pause 24-Hr Rush Slot (Standard Turnaround)'
                        : 'Activate ⚡ 24-Hr Rush Print Slot'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Row 2: Silent B2B / Military Unit / Commercial Fleet Pricing Tier Controller */}
              <div className="bg-stone-900 border-2 border-amber-500/80 p-5 rounded-none space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                      <Shield className="w-4 h-4" /> Silent B2B / Military Unit / Fleet Pricing Tier (1.3s Veteran Shield Bumper)
                    </span>
                    <h4 className="text-lg font-black text-white mt-0.5">
                      1-Tap Showroom TV &amp; Catalog Price Tier Switcher
                    </h4>
                    <p className="text-xs text-stone-400">
                      Tapping a tier flashes the <strong>910 PrintShop Veteran Shield</strong> on the 55&quot; Showroom TV for 1.3 seconds and updates all catalog &amp; package prices silently—with zero crossed-out numbers!
                    </p>
                  </div>
                  <div className="bg-stone-950 border border-amber-500/50 px-3 py-2 rounded-none text-right shrink-0 font-mono">
                    <div className="text-[10px] text-stone-400 uppercase">Active Pricing Tier</div>
                    <div className="text-sm font-black text-amber-400">
                      {Number(announcements.priceTierDiscount || 0) === 0
                        ? '0% STANDARD RETAIL'
                        : `-${announcements.priceTierDiscount}% B2B / UNIT ACTIVE`}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {volumeTiers.map(tier => {
                    const isActive = Number(announcements.priceTierDiscount || 0) === tier.pct;
                    return (
                      <button
                        key={tier.pct}
                        onClick={() => {
                          triggerVolumeTier(tier.pct);
                          notify(`Activated ${tier.label} (${tier.sub}) + Flashed Veteran Shield!`);
                        }}
                        className={`p-3.5 rounded-none border-2 text-left transition cursor-pointer flex flex-col justify-between ${
                          isActive
                            ? 'bg-amber-500 text-stone-950 border-white shadow-lg'
                            : 'bg-stone-950 hover:bg-stone-800 text-stone-200 border-stone-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-mono text-sm font-black uppercase">
                              {tier.label}
                            </span>
                            {isActive && (
                              <span className="text-[10px] font-mono font-black bg-stone-950 text-amber-400 px-1.5 py-0.5 rounded-none">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-xs mt-1 ${
                              isActive ? 'text-stone-900 font-semibold' : 'text-stone-400'
                            }`}
                          >
                            {tier.sub}
                          </p>
                        </div>
                        <div
                          className={`mt-3 pt-2 border-t text-[10px] font-mono uppercase font-bold ${
                            isActive ? 'border-stone-950/20 text-stone-950' : 'border-stone-800 text-amber-400'
                          }`}
                        >
                          {tier.badge}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Quick 1-Tap Shop Mode Presets */}
              <div className="bg-stone-900 border border-stone-800 p-5 rounded-none space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-black uppercase tracking-wider text-cyan-400">
                      1-Tap Showroom &amp; Bay Mode Presets
                    </span>
                    <h4 className="text-base font-black text-white">
                      Current Mode: {shopStatus?.currentMode?.name}
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-2.5 py-1 rounded-none">
                    {shopStatus?.currentMode?.statusBadge}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(shopStatus?.presets || []).map(preset => {
                    const isCurrent = shopStatus?.currentMode?.id === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => handleApplyPresetMode(preset)}
                        className={`p-3 rounded-none border text-left transition cursor-pointer ${
                          isCurrent
                            ? 'bg-cyan-950/50 border-cyan-400 text-white'
                            : 'bg-stone-950 hover:bg-stone-800 border-stone-800 text-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-black text-amber-400 font-mono">
                            {preset.statusBadge}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-mono font-black bg-cyan-400 text-stone-950 px-1.5 py-0.5 rounded-none">
                              LIVE
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-bold text-white mt-1">{preset.name}</div>
                        <div className="text-[11px] text-stone-400 mt-0.5">{preset.hours}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ALL 5 SERVICE CATALOG CATEGORIES & FEATURED PACKAGES EDITOR */}
          {activeTab === 'catalog' && (
            <div className="space-y-4">
              {/* Filter & Search Bar */}
              <div className="bg-stone-900 border border-stone-800 p-4 rounded-none flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search wraps, shirts, magnets, banners, decals, or packages..."
                    className="w-full bg-stone-950 border border-stone-700 rounded-none pl-9 pr-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                  {[
                    { key: 'all', label: 'All Services & Packages' },
                    { key: 'packages', label: '★ Featured Bundles (4)' },
                    { key: 'wraps', label: '1. Vehicle Wraps' },
                    { key: 'apparel', label: '2. Apparel & Unit Shirts' },
                    { key: 'signage', label: '3. Magnets & Banners' },
                    { key: 'decals', label: '4. Decals & Window Perf' },
                    { key: 'print', label: '5. Cards & Sublimation' }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setSelectedCategory(tab.key)}
                      className={`px-2.5 py-1.5 rounded-none font-bold transition cursor-pointer whitespace-nowrap border ${
                        selectedCategory === tab.key
                          ? 'bg-cyan-400 text-stone-950 border-cyan-400'
                          : 'bg-stone-950 text-stone-300 hover:text-white border-stone-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Packages Section */}
              {(selectedCategory === 'all' || selectedCategory === 'packages') && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                    <h4 className="text-xs font-mono font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Package className="w-4 h-4" /> Featured Launch &amp; Fort Liberty Unit Packages ({packages.length})
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {packages
                      .filter(pkg => {
                        if (!searchQuery.trim()) return true;
                        const q = searchQuery.toLowerCase();
                        return (
                          pkg.name.toLowerCase().includes(q) ||
                          pkg.description.toLowerCase().includes(q) ||
                          pkg.badge.toLowerCase().includes(q)
                        );
                      })
                      .map(pkg => {
                        const eff = getEffectivePriceObj(pkg.price, pkg.numericPrice);
                        return (
                          <div
                            key={pkg.id}
                            className={`p-4 rounded-none border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              pkg.inStock
                                ? 'bg-stone-900 border-stone-800'
                                : 'bg-rose-950/20 border-rose-800/60 opacity-80'
                            }`}
                          >
                            <div className="space-y-1 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-mono font-black uppercase bg-amber-500 text-stone-950 px-2 py-0.5 rounded-none">
                                  PACKAGE BUNDLE
                                </span>
                                <span className="text-[10px] font-mono font-bold uppercase bg-stone-800 text-stone-300 px-2 py-0.5 rounded-none">
                                  {pkg.badge}
                                </span>
                                <span
                                  className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-none ${
                                    pkg.inStock
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                                      : 'bg-rose-950 text-rose-300 border border-rose-600/40'
                                  }`}
                                >
                                  {pkg.inStock ? '🟢 AVAILABLE' : '🔴 PAUSED / BOOKED'}
                                </span>
                              </div>
                              <div className="flex items-baseline gap-2.5">
                                <h5 className="text-sm font-black text-white">{pkg.name}</h5>
                                <span className="text-sm font-mono font-black text-cyan-400">
                                  {eff.current}
                                </span>
                                {eff.isTiered && (
                                  <span className="text-[10px] font-mono text-amber-400">
                                    (Base: {pkg.price})
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-stone-400 line-clamp-1">{pkg.description}</p>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  togglePackageAvailability(pkg.id);
                                  notify(`Toggled availability for "${pkg.name}"`);
                                }}
                                className={`px-3 py-1.5 rounded-none text-xs font-bold transition cursor-pointer border ${
                                  pkg.inStock
                                    ? 'bg-stone-950 hover:bg-rose-950 text-stone-300 border-stone-700'
                                    : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                                }`}
                              >
                                {pkg.inStock ? 'Pause Package' : 'Mark Available'}
                              </button>

                              <button
                                onClick={() => openEditModal(pkg, null, true)}
                                className="px-3 py-1.5 rounded-none bg-cyan-400 hover:bg-cyan-300 text-stone-950 font-black text-xs transition cursor-pointer flex items-center gap-1"
                              >
                                <Pencil className="w-3 h-3" />
                                <span>Edit Price / Info</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* All 5 Service Catalog Categories */}
              {categoryKeys
                .filter(catKey => selectedCategory === 'all' || selectedCategory === catKey)
                .map(catKey => {
                  const cat = catalog[catKey];
                  if (!cat) return null;

                  const filteredItems = (cat.items || []).filter(item => {
                    if (!searchQuery.trim()) return true;
                    const q = searchQuery.toLowerCase();
                    return (
                      item.name.toLowerCase().includes(q) ||
                      (item.description && item.description.toLowerCase().includes(q)) ||
                      (item.tag && item.tag.toLowerCase().includes(q))
                    );
                  });

                  if (filteredItems.length === 0) return null;

                  return (
                    <div key={catKey} className="space-y-2.5 pt-2">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                        <h4 className="text-xs font-mono font-black uppercase tracking-wider text-cyan-400">
                          {cat.title} ({filteredItems.length})
                        </h4>
                        <span className="text-[11px] text-stone-400 font-mono">{cat.badge}</span>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {filteredItems.map(item => {
                          const eff = getEffectivePriceObj(item.price, item.numericPrice);
                          return (
                            <div
                              key={item.id}
                              className={`p-3.5 rounded-none border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                item.inStock
                                  ? 'bg-stone-900 border-stone-800'
                                  : 'bg-rose-950/20 border-rose-800/60 opacity-80'
                              }`}
                            >
                              <div className="space-y-1 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[10px] font-mono font-bold uppercase bg-stone-800 text-stone-300 px-2 py-0.5 rounded-none">
                                    {item.tag || cat.badge}
                                  </span>
                                  {item.turnaround && (
                                    <span className="text-[10px] font-mono text-amber-400 bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded-none">
                                      ⏱ {item.turnaround}
                                    </span>
                                  )}
                                  <span
                                    className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-none ${
                                      item.inStock
                                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                                        : 'bg-rose-950 text-rose-300 border border-rose-600/40'
                                    }`}
                                  >
                                    {item.inStock ? '🟢 ACTIVE' : '🔴 PAUSED / BOOKED'}
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-baseline gap-2">
                                  <h5 className="text-sm font-black text-white">{item.name}</h5>
                                  <span className="text-sm font-mono font-black text-cyan-400">
                                    {eff.current}
                                  </span>
                                  <span className="text-[11px] text-stone-400 font-mono">
                                    ({item.unit})
                                  </span>
                                </div>
                                <p className="text-xs text-stone-400 line-clamp-1">
                                  {item.description}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  onClick={() => {
                                    toggleItemAvailability(catKey, item.id);
                                    notify(`Toggled availability for "${item.name}"`);
                                  }}
                                  className={`px-3 py-1.5 rounded-none text-xs font-bold transition cursor-pointer border ${
                                    item.inStock
                                      ? 'bg-stone-950 hover:bg-rose-950 text-stone-300 border-stone-700'
                                      : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                                  }`}
                                >
                                  {item.inStock ? 'Pause Slot' : 'Mark Active'}
                                </button>

                                <button
                                  onClick={() => openEditModal(item, catKey, false)}
                                  className="px-3 py-1.5 rounded-none bg-cyan-400 hover:bg-cyan-300 text-stone-950 font-black text-xs transition cursor-pointer flex items-center gap-1"
                                >
                                  <Pencil className="w-3 h-3" />
                                  <span>Edit</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* TAB 3: SHOP STATUS PRESETS & TOP MARQUEE BANNER */}
          {activeTab === 'status' && (
            <div className="space-y-6">
              {/* Top Marquee Banner Editor */}
              <form
                onSubmit={handleSaveMarquee}
                className="bg-stone-900 border border-stone-800 p-5 rounded-none space-y-4"
              >
                <div>
                  <span className="text-xs font-mono font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Megaphone className="w-4 h-4" /> Top Marquee Ticker &amp; Showroom Note
                  </span>
                  <h4 className="text-base font-black text-white mt-0.5">
                    Update Live Announcement Ticker Across Website &amp; 55&quot; TV
                  </h4>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-stone-400 uppercase mb-1">
                      Top Scrolling Marquee Text
                    </label>
                    <input
                      type="text"
                      value={marqueeInput}
                      onChange={e => setMarqueeInput(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-stone-400 uppercase mb-1">
                      Showroom Walk-In / WhatsApp Sub-Note
                    </label>
                    <input
                      type="text"
                      value={bayNoteInput}
                      onChange={e => setBayNoteInput(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-cyan-400 hover:bg-cyan-300 text-stone-950 font-black px-5 py-2.5 rounded-none text-xs uppercase tracking-wider transition cursor-pointer"
                  >
                    Save Marquee &amp; Bay Note
                  </button>
                </div>
              </form>

              {/* Custom Shop Mode Form */}
              <form
                onSubmit={handleSaveCustomMode}
                className="bg-stone-900 border border-stone-800 p-5 rounded-none space-y-4"
              >
                <div>
                  <span className="text-xs font-mono font-black text-cyan-400 uppercase tracking-wider">
                    Custom Showroom &amp; Bay Status
                  </span>
                  <h4 className="text-base font-black text-white mt-0.5">
                    Customize Active Showroom Headline, Hours &amp; Status Badge
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-stone-400 uppercase mb-1">
                      Showroom Headline / Mode Name
                    </label>
                    <input
                      type="text"
                      value={modeName}
                      onChange={e => setModeName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-stone-400 uppercase mb-1">
                      Status Badge Pill
                    </label>
                    <input
                      type="text"
                      value={modeBadge}
                      onChange={e => setModeBadge(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-stone-400 uppercase mb-1">
                      Location / Corridor Text
                    </label>
                    <input
                      type="text"
                      value={modeAddress}
                      onChange={e => setModeAddress(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-stone-400 uppercase mb-1">
                      Active Hours / Cutoff Note
                    </label>
                    <input
                      type="text"
                      value={modeHours}
                      onChange={e => setModeHours(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-700 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-stone-400 uppercase mb-1">
                    Customer Dispatch Note
                  </label>
                  <input
                    type="text"
                    value={modeNotes}
                    onChange={e => setModeNotes(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black px-5 py-2.5 rounded-none text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Publish Custom Shop Status
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-900 border-t-2 border-stone-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleFactoryReset}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-stone-400 hover:text-rose-400 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Factory Defaults</span>
          </button>

          <button
            onClick={() => setIsShopAdminOpen(false)}
            className="bg-cyan-400 hover:bg-cyan-300 text-stone-950 font-black px-5 py-2.5 rounded-none text-xs uppercase tracking-wider transition cursor-pointer"
          >
            Done (Return to Live Shop)
          </button>
        </div>
      </div>

      {/* Sub-Modal: Edit Catalog Item or Package */}
      {editingTarget && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/90"
          onClick={() => setEditingTarget(null)}
        >
          <div
            className="bg-stone-900 border-2 border-cyan-400 rounded-none max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 text-stone-100"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-lg font-black text-white uppercase flex items-center gap-2">
                <Pencil className="w-4 h-4 text-cyan-400" />
                <span>
                  {editingTarget.isPackage ? 'Edit Featured Package' : 'Edit Service Item'}
                </span>
              </h3>
              <button
                onClick={() => setEditingTarget(null)}
                className="text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditModal} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono font-bold text-stone-300 uppercase mb-1">
                  Service / Package Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-stone-300 uppercase mb-1">
                    Base Price *
                  </label>
                  <input
                    type="text"
                    required
                    value={editPrice}
                    onChange={e => setEditPrice(e.target.value)}
                    placeholder="e.g. $1,150.00"
                    className="w-full bg-stone-950 border border-stone-700 rounded-none px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-stone-300 uppercase mb-1">
                    {editingTarget.isPackage ? 'Savings Callout' : 'Pricing Unit'}
                  </label>
                  <input
                    type="text"
                    value={editUnitOrSavings}
                    onChange={e => setEditUnitOrSavings(e.target.value)}
                    placeholder={editingTarget.isPackage ? '24/7 Rolling Billboard' : 'installed'}
                    className="w-full bg-stone-950 border border-stone-700 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-stone-300 uppercase mb-1">
                    {editingTarget.isPackage ? 'Package Badge' : 'Est. Turnaround Time'}
                  </label>
                  <input
                    type="text"
                    value={editTurnaroundOrBadge}
                    onChange={e => setEditTurnaroundOrBadge(e.target.value)}
                    placeholder={editingTarget.isPackage ? 'Best Value' : '1–2 Business Days'}
                    className="w-full bg-stone-950 border border-stone-700 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {!editingTarget.isPackage && (
                  <div>
                    <label className="block text-xs font-mono font-bold text-stone-300 uppercase mb-1">
                      Highlight Tag
                    </label>
                    <input
                      type="text"
                      value={editTag}
                      onChange={e => setEditTag(e.target.value)}
                      placeholder="Featured on Bragg Blvd"
                      className="w-full bg-stone-950 border border-stone-700 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-stone-300 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-none px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setEditingTarget(null)}
                  className="px-4 py-2 rounded-none text-xs font-bold text-stone-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-400 hover:bg-cyan-300 text-stone-950 font-black px-5 py-2.5 rounded-none text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
