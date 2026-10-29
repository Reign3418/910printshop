import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Car,
  Shirt,
  Flag,
  Sticker,
  CreditCard,
  Plus,
  Calculator,
  Clock,
  MessageCircle,
  Check
} from 'lucide-react';

const CATEGORY_ICONS = {
  wraps: Car,
  apparel: Shirt,
  signage: Flag,
  decals: Sticker,
  print: CreditCard
};

export default function MainCatalogSection() {
  const {
    catalog,
    themeVersion,
    addToQuote,
    setIsQuoteDrawerOpen,
    setIsEstimatorModalOpen,
    getEffectivePriceObj,
    announcements
  } = useShop();

  const [activeCategory, setActiveCategory] = useState('all');
  const [addedItemId, setAddedItemId] = useState(null);

  const isStudio = themeVersion === 'studio';
  const isTactical = themeVersion === 'tactical';

  const categories = Object.values(catalog);
  const displayedCategories =
    activeCategory === 'all'
      ? categories
      : categories.filter((c) => c.id === activeCategory);

  const handleQuickAdd = (item, effectivePrice) => {
    addToQuote({
      ...item,
      price: effectivePrice.current,
      numericPrice: effectivePrice.numeric
    });
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1100);
  };

  return (
    <section
      id="services"
      className={`py-6 sm:py-12 px-3 sm:px-6 ${
        isStudio
          ? 'bg-[#F8FAFC] text-slate-900 cutting-mat-grid'
          : isTactical
          ? 'bg-[#111612] text-[#F4F6F0]'
          : 'bg-[#0B0D10] text-white carbon-weave'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Section Header + Category Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4 border-slate-800/80">
          <div>
            <span
              className={`text-xs font-mono font-bold uppercase tracking-widest block ${
                isStudio
                  ? 'text-cyan-700'
                  : isTactical
                  ? 'text-amber-400'
                  : 'text-cyan-400'
              }`}
            >
              4315 Bragg Blvd • Direct Shop Pricing &amp; Turnaround Guide
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Bebas_Neue'] tracking-wide mt-0.5">
              Commercial Wraps, Custom Shirts, Decals &amp; Signage
            </h2>
          </div>

          <button
            onClick={() => setIsEstimatorModalOpen(true)}
            className={`self-start md:self-auto px-4 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer rounded-none shadow ${
              isTactical
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Open Custom Size &amp; Fleet Calculator</span>
          </button>
        </div>

        {/* Category Filter Tabs (Zero-Overflow Scrollable Strip on Mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-2 text-xs font-black uppercase tracking-wider shrink-0 border cursor-pointer rounded-none ${
              activeCategory === 'all'
                ? isStudio
                  ? 'bg-slate-900 text-white border-slate-900'
                  : isTactical
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-cyan-400 text-slate-950 border-cyan-300'
                : isStudio
                ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                : 'bg-[#141A23] text-slate-300 border-[#263244] hover:border-slate-500'
            }`}
          >
            All Services ({categories.reduce((acc, c) => acc + c.items.length, 0)})
          </button>

          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Car;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-2 text-xs font-bold uppercase tracking-wider shrink-0 border flex items-center gap-1.5 cursor-pointer rounded-none ${
                  active
                    ? isStudio
                      ? 'bg-slate-900 text-white border-slate-900'
                      : isTactical
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-cyan-400 text-slate-950 border-cyan-300'
                    : isStudio
                    ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    : 'bg-[#141A23] text-slate-300 border-[#263244] hover:border-slate-500'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.title.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Category Blocks */}
        <div className="space-y-8">
          {displayedCategories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Car;
            return (
              <div key={cat.id} className="space-y-3">
                {/* Category Banner */}
                <div
                  className={`p-3.5 sm:p-4 border-l-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    isStudio
                      ? 'bg-white border-l-slate-900 border border-slate-300 shadow-sm'
                      : isTactical
                      ? 'bg-[#171F18] border-l-amber-500 border border-[#2A382C]'
                      : 'bg-[#121720] border-l-cyan-400 border border-[#222D3D]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-5 h-5 shrink-0 ${
                        isStudio
                          ? 'text-slate-900'
                          : isTactical
                          ? 'text-amber-400'
                          : 'text-cyan-400'
                      }`}
                    />
                    <div>
                      <h3 className="text-lg sm:text-xl font-black uppercase font-['Bebas_Neue'] tracking-wider">
                        {cat.title}
                      </h3>
                      <p
                        className={`text-xs ${
                          isStudio ? 'text-slate-600' : 'text-slate-400'
                        }`}
                      >
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`self-start sm:self-auto text-[10px] font-mono font-bold uppercase px-2.5 py-1 border ${
                      isStudio
                        ? 'bg-slate-100 border-slate-300 text-slate-800'
                        : isTactical
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                        : 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                    }`}
                  >
                    {cat.badge}
                  </span>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {cat.items.map((item) => {
                    const priceObj = getEffectivePriceObj(item.price, item.numericPrice);
                    const isAdded = addedItemId === item.id;
                    const bayPaused = item.isWrapBayItem && !announcements.wrapBayOpen;

                    return (
                      <div
                        key={item.id}
                        className={`p-4 border flex flex-col justify-between gap-3 transition rounded-none ${
                          isStudio
                            ? 'bg-white border-slate-300 hover:border-slate-900 shadow-sm'
                            : isTactical
                            ? 'bg-[#161D17] border-[#29362B] hover:border-amber-500/60'
                            : 'bg-[#11161F] border-[#222C3C] hover:border-cyan-400/60'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                {item.tag && (
                                  <span
                                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 ${
                                      isStudio
                                        ? 'bg-cyan-100 text-cyan-900'
                                        : isTactical
                                        ? 'bg-amber-500/20 text-amber-300'
                                        : 'bg-cyan-500/15 text-cyan-300'
                                    }`}
                                  >
                                    {item.tag}
                                  </span>
                                )}
                                {bayPaused && (
                                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                    Booking Next Week
                                  </span>
                                )}
                              </div>
                              <h4 className="font-black text-base leading-snug">
                                {item.name}
                              </h4>
                            </div>

                            <div className="text-right shrink-0">
                              <div
                                className={`text-lg sm:text-xl font-black font-mono ${
                                  isStudio
                                    ? 'text-slate-900'
                                    : isTactical
                                    ? 'text-amber-400'
                                    : 'text-cyan-300'
                                }`}
                              >
                                {priceObj.current}
                              </div>
                              <div className="text-[10px] font-mono text-slate-400">
                                {item.unit}
                              </div>
                            </div>
                          </div>

                          <p
                            className={`text-xs leading-relaxed ${
                              isStudio ? 'text-slate-600' : 'text-slate-300'
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{item.turnaround}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleQuickAdd(item, priceObj)}
                              disabled={!item.inStock}
                              className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer rounded-none transition ${
                                !item.inStock
                                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                  : isAdded
                                  ? 'bg-emerald-600 text-white'
                                  : isTactical
                                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                                  : isStudio
                                  ? 'bg-slate-900 hover:bg-slate-800 text-white'
                                  : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                                  <span>{item.inStock ? 'Add to Quote' : 'Booked'}</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => setIsQuoteDrawerOpen(true)}
                              className={`p-1.5 border text-[11px] font-mono cursor-pointer rounded-none ${
                                isStudio
                                  ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                                  : 'border-slate-700 text-slate-300 hover:border-cyan-400'
                              }`}
                              title="Open Quote Tray"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
