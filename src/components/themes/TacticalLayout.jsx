import React from 'react';
import { useShop } from '../../context/ShopContext';
import TopMarqueeBar from '../TopMarqueeBar';
import Header from '../Header';
import MainCatalogSection from '../MainCatalogSection';
import PackagesSpotlight from '../PackagesSpotlight';
import PortfolioSection from '../PortfolioSection';
import Footer from '../Footer';
import { Shield, Calculator, MessageCircle, Phone, MapPin, Award } from 'lucide-react';

export default function TacticalLayout() {
  const { shopInfo, shopStatus, setIsEstimatorModalOpen, setIsPackagesModalOpen } = useShop();
  const current = shopStatus.currentMode;

  return (
    <div className="bg-[#111612] text-[#F4F6F0] w-full max-w-full overflow-x-hidden">
      <div className="hidden md:block">
        <TopMarqueeBar />
      </div>

      <Header />

      {/* Mobile Slim Tactical Bar */}
      <div className="md:hidden bg-[#182019] border-b border-[#2D3C2F] px-3 py-2 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 min-w-0 truncate">
          <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-bold text-amber-300 truncate">Veteran-Owned • 4315 Bragg Blvd</span>
        </div>
        <button
          onClick={() => setIsEstimatorModalOpen(true)}
          className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2.5 py-1 rounded-none shrink-0 flex items-center gap-1 cursor-pointer"
        >
          <Calculator className="w-3 h-3" />
          <span>Unit / Wrap Quote</span>
        </button>
      </div>

      {/* Desktop Fort Liberty & Contractor Fleet Command Banner */}
      <section className="hidden md:block border-b border-[#2A382C] bg-gradient-to-b from-[#161F18] to-[#111612] py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
          <div className="col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/50 text-amber-300 px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Fort Liberty &amp; Bragg Blvd Veteran-Owned Print Command</span>
            </div>

            <h1 className="text-5xl font-black uppercase font-['Bebas_Neue'] tracking-wide text-white leading-none">
              Mission-Ready <span className="text-amber-400">Commercial Fleet Wraps</span>, Unit Apparel &amp; Ceremony Signage
            </h1>

            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              Located right at <strong className="text-white">4315 Bragg Blvd</strong>—minutes from Fort Liberty gates. Whether you need 30 custom Airborne PT/deployment shirts, a 4&apos;×8&apos; Hail &amp; Farewell vinyl banner, or a full commercial RAM ProMaster contractor wrap, our veteran-owned shop delivers on time, every time.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setIsEstimatorModalOpen(true)}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer rounded-none shadow"
              >
                <Calculator className="w-4 h-4" />
                <span>Open Unit &amp; Fleet Estimator</span>
              </button>

              <a
                href={shopInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 rounded-none"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Artwork / Crest</span>
              </a>

              <a
                href={`tel:${shopInfo.phoneRaw}`}
                className="px-4 py-3 bg-[#1B241C] border border-[#344637] text-amber-300 font-black text-xs uppercase tracking-wider flex items-center gap-2 rounded-none"
              >
                <Phone className="w-4 h-4" />
                <span>{shopInfo.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div className="col-span-5 grid grid-cols-2 gap-3">
            <div className="bg-[#18211A] border border-amber-500/40 p-3 space-y-2">
              <img
                src="./images/military-airborne-tshirt.jpg"
                alt="Fort Liberty Custom Military Shirt Print"
                className="w-full h-36 object-cover border border-[#2E3E30]"
              />
              <div className="text-xs font-black uppercase text-amber-300 font-mono">
                Unit &amp; Morale Shirts
              </div>
              <p className="text-[11px] text-stone-300">
                No minimums • Bulk 25-pack unit tiers available
              </p>
            </div>

            <div className="bg-[#18211A] border border-amber-500/40 p-3 space-y-2">
              <img
                src="./images/alpha-beavers-van-wrap.jpg"
                alt="Commercial Contractor Van Wrap Fayetteville NC"
                className="w-full h-36 object-cover border border-[#2E3E30]"
              />
              <div className="text-xs font-black uppercase text-amber-300 font-mono">
                Contractor Fleet Wraps
              </div>
              <p className="text-[11px] text-stone-300">
                Full &amp; partial wraps, 30-mil magnets &amp; USDOT kits
              </p>
            </div>
          </div>
        </div>
      </section>

      <MainCatalogSection />
      <PackagesSpotlight />
      <PortfolioSection />
      <Footer />
    </div>
  );
}
