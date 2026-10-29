import React from 'react';
import { useShop } from '../../context/ShopContext';
import TopMarqueeBar from '../TopMarqueeBar';
import Header from '../Header';
import HeroShopCard from '../HeroShopCard';
import MainCatalogSection from '../MainCatalogSection';
import PackagesSpotlight from '../PackagesSpotlight';
import PortfolioSection from '../PortfolioSection';
import Footer from '../Footer';
import { MapPin, Calculator, Sparkles } from 'lucide-react';

export default function CarbonLayout() {
  const { shopStatus, announcements, setIsEstimatorModalOpen, setIsPackagesModalOpen } = useShop();
  const current = shopStatus.currentMode;

  return (
    <div className="bg-[#0B0D10] text-[#F8FAFC] w-full max-w-full overflow-x-hidden">
      {/* Desktop Only: Top Marquee */}
      <div className="hidden md:block">
        <TopMarqueeBar />
      </div>

      <Header />

      {/* Mobile Only (<768px): Ultra-Compact 1-Line Bragg Blvd + Instant Quote Bar -> Straight to Services! */}
      <div className="md:hidden bg-[#11161F] border-b border-[#222E40] px-3 py-2 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 min-w-0 truncate">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="font-bold text-cyan-200 truncate">4315 Bragg Blvd</span>
          <span className="text-slate-400 text-[11px] shrink-0">
            ({announcements.wrapBayOpen ? 'Bay Open' : 'Booking'})
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setIsEstimatorModalOpen(true)}
            className="bg-cyan-400 text-slate-950 font-black text-[10px] uppercase px-2 py-1 rounded-none flex items-center gap-1 shadow cursor-pointer"
          >
            <Calculator className="w-3 h-3" />
            <span>Calculator</span>
          </button>
          <button
            onClick={() => setIsPackagesModalOpen(true)}
            className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2 py-1 rounded-none flex items-center gap-1 shadow cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>Deals</span>
          </button>
        </div>
      </div>

      {!announcements.wrapBayOpen && (
        <div className="md:hidden bg-amber-950/80 border-b border-amber-500/50 px-3 py-1.5 text-[11px] text-amber-200 font-mono font-bold text-center">
          🚐 WRAP BAY AT CAPACITY THIS WEEK • BOOKING NEXT WEEK &amp; 24H SHIRT/BANNER PRESS OPEN!
        </div>
      )}

      {/* Desktop Only (>=768px): Full Hero Card & Featured Packages */}
      <div className="hidden md:block">
        <HeroShopCard />
        <PackagesSpotlight />
      </div>

      {/* Main Interactive Service Catalog (Renders IMMEDIATELY at the top on Mobile!) */}
      <MainCatalogSection />

      {/* Real Portfolio Showcase (Alpha Beavers Van Wrap, Military Shirt, Pink Decal) */}
      <PortfolioSection />

      {/* Mobile Only: Packages Below Portfolio */}
      <div className="md:hidden">
        <PackagesSpotlight />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
