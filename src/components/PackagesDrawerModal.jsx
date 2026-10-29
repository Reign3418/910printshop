import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Sparkles, CheckCircle2, Plus, MessageCircle } from 'lucide-react';

export default function PackagesDrawerModal() {
  const {
    isPackagesModalOpen,
    setIsPackagesModalOpen,
    packages,
    addToQuote,
    setIsQuoteDrawerOpen,
    getEffectivePriceObj
  } = useShop();

  if (!isPackagesModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto p-3 sm:p-6 flex justify-center items-start animate-fadeIn">
      <div className="bg-[#0E131A] text-white border-2 border-amber-500/60 shadow-2xl max-w-3xl w-full my-4 rounded-none overflow-hidden">
        <div className="bg-[#080B0F] border-b border-[#1E293B] px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block">
                Turnkey Fleet, Contractor &amp; Fort Liberty Unit Bundles
              </span>
              <h2 className="text-xl font-black uppercase font-['Bebas_Neue'] tracking-wider">
                910 PrintShop Featured Package Deals
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsPackagesModalOpen(false)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 cursor-pointer rounded-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map((pkg) => {
            const pObj = getEffectivePriceObj(pkg.price, pkg.numericPrice);
            return (
              <div
                key={pkg.id}
                className="bg-[#131A24] border border-[#28364A] p-4 flex flex-col justify-between space-y-4 rounded-none"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold uppercase px-2 py-0.5">
                      {pkg.badge}
                    </span>
                    <span className="text-xl font-black font-mono text-cyan-300">
                      {pObj.current}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-white">{pkg.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{pkg.description}</p>

                  <ul className="space-y-1 pt-1">
                    {pkg.includes.map((inc, i) => (
                      <li key={i} className="text-xs text-slate-200 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToQuote({
                        ...pkg,
                        price: pObj.current,
                        numericPrice: pObj.numeric
                      });
                      setIsPackagesModalOpen(false);
                      setIsQuoteDrawerOpen(true);
                    }}
                    disabled={!pkg.inStock}
                    className="flex-1 py-2.5 px-3 bg-cyan-400 hover:bg-cyan-300 disabled:bg-slate-700 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer rounded-none"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{pkg.inStock ? 'Add Package to Quote' : 'Currently Booked'}</span>
                  </button>

                  <a
                    href={`https://wa.me/19109200863?text=${encodeURIComponent(
                      `Hi 910 PrintShop! I'm interested in the ${pkg.name} (${pObj.current}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-none"
                    title="Ask on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
