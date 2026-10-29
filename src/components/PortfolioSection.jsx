import React from 'react';
import { useShop } from '../context/ShopContext';
import { ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PortfolioSection() {
  const { portfolio, shopInfo, themeVersion } = useShop();
  const isStudio = themeVersion === 'studio';
  const isTactical = themeVersion === 'tactical';

  return (
    <section
      id="work"
      className={`py-10 sm:py-14 px-3 sm:px-6 ${
        isStudio
          ? 'bg-white text-slate-900'
          : isTactical
          ? 'bg-transparent text-white'
          : 'bg-[#0D1117] text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/60 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 block">
              Real Fayetteville &amp; Fort Bragg Builds • Printed &amp; Installed In-House
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase font-['Bebas_Neue'] tracking-wide mt-0.5">
              Our Wraps, Vinyls &amp; Stickers on the Streets of the 910
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pb-1">
            <a
              href={shopInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                isTactical
                  ? 'btn-3d-magenta'
                  : 'bg-pink-600 hover:bg-pink-500 text-white rounded-none shadow'
              }`}
            >
              <span>Follow {shopInfo.instagramHandle}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={shopInfo.instagramReelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isTactical
                  ? 'btn-3d-cyan'
                  : 'bg-[#161F2C] hover:bg-[#202D40] text-cyan-300 border border-cyan-500/40 rounded-none'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Watch Wrap Reel</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between overflow-hidden group ${
                isStudio
                  ? 'bg-slate-50 border border-slate-300 shadow rounded-none'
                  : isTactical
                  ? 'diecut-sticker-card bg-[#151D17] p-3'
                  : 'bg-[#131A24] border border-[#263447] rounded-none'
              }`}
            >
              <div>
                <div
                  className={`relative aspect-square w-full overflow-hidden bg-black ${
                    isTactical ? 'rounded-2xl border-2 border-white/80' : ''
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    className={`absolute top-3 left-3 font-mono font-black text-[10px] uppercase px-3 py-1 shadow ${
                      isTactical
                        ? 'rounded-full bg-amber-400 text-slate-950 border-2 border-white shadow-[0_3px_0_#000]'
                        : 'bg-cyan-400 text-slate-950'
                    }`}
                  >
                    {item.badge}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-[11px] font-mono text-amber-400 uppercase font-bold">
                    {item.clientType}
                  </div>
                  <h3 className="font-black text-base leading-snug">{item.title}</h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      isStudio ? 'text-slate-600' : 'text-stone-300'
                    }`}
                  >
                    {item.highlight}
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 border-t border-slate-800/50 text-[11px] font-mono text-stone-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{item.specs}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
