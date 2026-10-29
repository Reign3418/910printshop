import React from 'react';
import { useShop } from '../context/ShopContext';
import { MapPin, Phone, MessageCircle, Shield, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { shopInfo, setIsDiscoveryWhitePageOpen, setIsShopSimOpen, setIsTvBoardOpen } = useShop();

  return (
    <footer className="bg-[#06080B] border-t border-[#1E293B] text-slate-300 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Col 1: Brand & Credentials */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <img
              src="./images/alpha-beavers-van-wrap.jpg"
              alt="910 PrintShop Logo"
              className="w-10 h-10 object-cover border border-cyan-400 rounded-none"
            />
            <div>
              <h3 className="text-2xl font-black uppercase font-['Bebas_Neue'] tracking-wider text-white">
                910 PrintShop
              </h3>
              <span className="text-[11px] font-mono text-cyan-400 block">
                Veteran-Owned &amp; Latino-Owned • Fayetteville, NC
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Commercial vehicle wraps, custom military unit &amp; contractor t-shirts, weatherproof vinyl decals, removable truck magnets, large-format banners, business cards, and dye sublimation.
          </p>

          <div className="inline-flex items-center gap-1.5 bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 px-3 py-1 text-xs font-mono font-bold uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>Project Aegis™ Verified • Zero Monthly Hostage Fees</span>
          </div>
        </div>

        {/* Col 2: Direct Bragg Blvd Contact */}
        <div className="space-y-2.5 text-xs">
          <h4 className="font-mono font-black uppercase tracking-wider text-white text-sm">
            Showroom &amp; Wrap Bay
          </h4>

          <a
            href={shopInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 py-1"
          >
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{shopInfo.address}</span>
          </a>

          <a
            href={`tel:${shopInfo.phoneRaw}`}
            className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 py-1 font-mono font-bold"
          >
            <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Call Shop: {shopInfo.phoneDisplay}</span>
          </a>

          <a
            href={shopInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 py-1 font-mono font-bold"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>WhatsApp: {shopInfo.phoneDisplay}</span>
          </a>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={shopInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-[#121822] border border-slate-700 hover:border-cyan-400 text-xs font-mono flex items-center gap-1"
            >
              <span>Instagram {shopInfo.instagramHandle}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={shopInfo.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-[#121822] border border-slate-700 hover:border-cyan-400 text-xs font-mono flex items-center gap-1"
            >
              <span>Facebook</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Col 3: Platform Tools & Service Areas */}
        <div className="space-y-3 text-xs">
          <h4 className="font-mono font-black uppercase tracking-wider text-white text-sm">
            Showroom Operations &amp; Coverage
          </h4>
          <p className="text-slate-400 leading-relaxed">
            Proudly serving <strong className="text-white">Fayetteville, Fort Liberty (Fort Bragg), Spring Lake, Hope Mills, Raeford, Sanford, Dunn,</strong> and all of Cumberland, Hoke &amp; Harnett Counties.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setIsDiscoveryWhitePageOpen(true)}
              className="px-2.5 py-1.5 bg-cyan-400 text-slate-950 font-black uppercase font-mono text-[11px] cursor-pointer rounded-none"
            >
              📄 Master White Paper
            </button>
            <button
              onClick={() => setIsShopSimOpen(true)}
              className="px-2.5 py-1.5 bg-emerald-600 text-white font-black uppercase font-mono text-[11px] cursor-pointer rounded-none"
            >
              🚐 Showroom + Phone Sim
            </button>
            <button
              onClick={() => setIsTvBoardOpen(true)}
              className="px-2.5 py-1.5 bg-[#141D28] border border-cyan-500/40 text-cyan-300 font-bold uppercase font-mono text-[11px] cursor-pointer rounded-none"
            >
              📺 1080p TV Board
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
        <div>
          © {new Date().getFullYear()} 910 PrintShop • 4315 Bragg Blvd, Fayetteville, NC 28303 • All Rights Reserved.
        </div>
        <div>
          Engineered for Sub-Second Mobile Speed, WCAG 2.1 AA Accessibility &amp; Local Search Dominance
        </div>
      </div>
    </footer>
  );
}
