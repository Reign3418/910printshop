import React from 'react';
import { useShop } from '../context/ShopContext';
import { Shield, Zap, Phone } from 'lucide-react';

export default function TopMarqueeBar() {
  const { announcements, shopInfo } = useShop();

  return (
    <div className="bg-[#06080B] border-b border-[#1E293B] px-4 py-1.5 text-[11px] font-mono text-slate-300 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 min-w-0 truncate">
        <span className="inline-flex items-center gap-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-2 py-0.5 font-bold uppercase shrink-0">
          <Shield className="w-3 h-3" />
          <span>Veteran &amp; Latino Owned</span>
        </span>
        <span className="truncate text-slate-200 font-semibold">
          {announcements.marqueeText}
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-3 shrink-0">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 font-bold uppercase ${
            announcements.wrapBayOpen
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 ${
              announcements.wrapBayOpen ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
            }`}
          />
          {announcements.wrapBayOpen ? 'Wrap Bay: Open' : 'Wrap Bay: Booking Next Week'}
        </span>

        {announcements.rushPrintOpen && (
          <span className="inline-flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 font-bold uppercase">
            <Zap className="w-3 h-3" />
            <span>24h Rush Press Active</span>
          </span>
        )}

        <a
          href={`tel:${shopInfo.phoneRaw}`}
          className="inline-flex items-center gap-1 text-cyan-300 hover:text-white font-bold"
        >
          <Phone className="w-3 h-3" />
          <span>{shopInfo.phoneDisplay}</span>
        </a>
      </div>
    </div>
  );
}
