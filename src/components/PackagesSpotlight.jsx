import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, CheckCircle2, Plus, MessageCircle } from 'lucide-react';

export default function PackagesSpotlight() {
  const {
    packages,
    themeVersion,
    addToQuote,
    setIsQuoteDrawerOpen,
    getEffectivePriceObj
  } = useShop();

  const isStudio = themeVersion === 'studio';
  const isTactical = themeVersion === 'tactical';

  return (
    <section
      className={`py-10 px-3 sm:px-6 border-t border-b ${
        isStudio
          ? 'bg-slate-100 border-slate-300 text-slate-900'
          : isTactical
          ? 'bg-[#0C110E] border-[#263328] text-white'
          : 'bg-[#080B0F] border-[#1E293B] text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Turnkey Contractor, Fleet &amp; Fort Liberty Unit Packages</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Bebas_Neue'] tracking-wide mt-1">
              High-Impact Wrap, Vinyl &amp; Apparel Bundles
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400">
            Tap any bundle to add directly to your WhatsApp / SMS Quote Tray
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg) => {
            const pObj = getEffectivePriceObj(pkg.price, pkg.numericPrice);
            return (
              <div
                key={pkg.id}
                className={`p-5 flex flex-col justify-between gap-4 ${
                  isStudio
                    ? 'bg-white border-2 border-slate-900 shadow rounded-none'
                    : isTactical
                    ? 'diecut-sticker-card bg-[#161F18]'
                    : 'bg-[#111722] border-2 border-cyan-500/40 rounded-none'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-mono font-black text-[10px] uppercase px-2.5 py-0.5 ${
                        isTactical
                          ? 'rounded-full bg-amber-400 text-slate-950 border border-white shadow'
                          : 'bg-amber-500 text-slate-950'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                    <span
                      className={`text-xl font-black font-mono ${
                        isStudio
                          ? 'text-slate-900'
                          : isTactical
                          ? 'text-amber-300'
                          : 'text-cyan-300'
                      }`}
                    >
                      {pObj.current}
                    </span>
                  </div>

                  <h3 className="font-black text-base leading-snug">{pkg.name}</h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      isStudio ? 'text-slate-600' : 'text-stone-300'
                    }`}
                  >
                    {pkg.description}
                  </p>

                  <ul className="space-y-1.5 pt-1">
                    {pkg.includes.map((inc, idx) => (
                      <li key={idx} className="text-xs flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3.5 border-t border-slate-700/40 flex items-center gap-2 pb-1">
                  <button
                    type="button"
                    onClick={() => {
                      addToQuote({
                        ...pkg,
                        price: pObj.current,
                        numericPrice: pObj.numeric
                      });
                      setIsQuoteDrawerOpen(true);
                    }}
                    disabled={!pkg.inStock}
                    className={`flex-1 py-2.5 px-3 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer ${
                      isTactical
                        ? 'btn-3d-amber'
                        : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-none'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{pkg.inStock ? 'Add Bundle' : 'Booked'}</span>
                  </button>

                  <a
                    href={`https://wa.me/19109200863?text=${encodeURIComponent(
                      `Hi 910 PrintShop! I want to order the ${pkg.name} (${pObj.current}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 text-white ${
                      isTactical
                        ? 'btn-3d-emerald'
                        : 'bg-emerald-600 hover:bg-emerald-500 rounded-none'
                    }`}
                    title="Order via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
