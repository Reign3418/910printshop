import React from 'react';
import { useShop } from '../../context/ShopContext';
import Header from '../Header';
import MainCatalogSection from '../MainCatalogSection';
import PackagesSpotlight from '../PackagesSpotlight';
import PortfolioSection from '../PortfolioSection';
import Footer from '../Footer';
import { Printer, Calculator, MessageCircle, Phone, MapPin } from 'lucide-react';

export default function StudioLayout() {
  const { shopInfo, setIsEstimatorModalOpen } = useShop();

  return (
    <div className="bg-[#F8FAFC] text-slate-900 w-full max-w-full overflow-x-hidden cutting-mat-grid">
      {/* CMYK Registration Top Strip */}
      <div className="h-1.5 w-full grid grid-cols-4">
        <div className="bg-cyan-500" />
        <div className="bg-pink-500" />
        <div className="bg-amber-400" />
        <div className="bg-slate-950" />
      </div>

      <Header />

      {/* Mobile Slim Studio Bar */}
      <div className="md:hidden bg-white border-b border-slate-300 px-3 py-2 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 min-w-0 truncate">
          <MapPin className="w-3.5 h-3.5 text-pink-600 shrink-0" />
          <span className="font-bold text-slate-900 truncate">4315 Bragg Blvd • Print &amp; Wrap Studio</span>
        </div>
        <button
          onClick={() => setIsEstimatorModalOpen(true)}
          className="bg-slate-900 text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-none shrink-0 flex items-center gap-1 cursor-pointer"
        >
          <Calculator className="w-3 h-3" />
          <span>Quote</span>
        </button>
      </div>

      {/* Desktop Daylight Architectural Print Studio Header */}
      <section className="hidden md:block bg-white border-b border-slate-300 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
          <div className="col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest">
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>CMYK Large-Format Print, Dye Sublimation &amp; Vinyl Studio</span>
            </div>

            <h1 className="text-5xl font-black uppercase font-['Bebas_Neue'] tracking-wide text-slate-950 leading-none">
              Precision Custom Printing, <span className="text-pink-600">Contour Vinyl</span> &amp; Commercial Wraps
            </h1>

            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Daylight-calibrated color proofing for Fayetteville businesses, car clubs, and military units. Visit our showroom at{' '}
              <strong className="text-slate-900">4315 Bragg Blvd</strong> or send your vector/photo files directly over WhatsApp for rapid turnaround.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsEstimatorModalOpen(true)}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer rounded-none"
              >
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>Calculate Wrap or Print Order</span>
              </button>

              <a
                href={shopInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 rounded-none"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Artwork via WhatsApp</span>
              </a>

              <a
                href={`tel:${shopInfo.phoneRaw}`}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-black text-xs uppercase tracking-wider flex items-center gap-2 rounded-none"
              >
                <Phone className="w-4 h-4 text-pink-600" />
                <span>{shopInfo.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div className="col-span-4 bg-slate-50 border-2 border-slate-900 p-4 space-y-2">
            <img
              src="./images/custom-car-decal-pink.jpg"
              alt="Custom Layered Pink Contour Vinyl Decal by 910 PrintShop"
              className="w-full h-44 object-cover border border-slate-300"
            />
            <div className="text-xs font-mono font-bold uppercase text-pink-600">
              Multi-Layer Cast Vinyl Registration
            </div>
            <p className="text-xs text-slate-600">
              Custom decals, banners, business cards &amp; dye-sublimated apparel printed in-house on Bragg Blvd.
            </p>
          </div>
        </div>
      </section>

      <MainCatalogSection />
      <PortfolioSection />
      <PackagesSpotlight />
      <Footer />
    </div>
  );
}
