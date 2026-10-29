import React, { useState, Suspense, lazy } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import DesignSwitcherBar from './components/DesignSwitcherBar';
import CarbonLayout from './components/themes/CarbonLayout';
import PackagesDrawerModal from './components/PackagesDrawerModal';
import QuoteDrawer from './components/QuoteDrawer';
import WrapPrintEstimatorModal from './components/WrapPrintEstimatorModal';
import SiteGateModal from './components/SiteGateModal';
import { Phone, MessageCircle, Calculator, FileText } from 'lucide-react';

const TacticalLayout = lazy(() => import('./components/themes/TacticalLayout'));
const StudioLayout = lazy(() => import('./components/themes/StudioLayout'));
const ShopAdminModal = lazy(() => import('./components/ShopAdminModal'));
const TvBoardModal = lazy(() => import('./components/TvBoardModal'));
const ShopTwinModal = lazy(() => import('./components/ShopTwinModal'));
const DiscoveryWhitePage = lazy(() => import('./components/DiscoveryWhitePage'));

function AppContent({ onLockSite }) {
  const {
    themeVersion,
    shopInfo,
    setIsEstimatorModalOpen,
    quoteItemCount,
    setIsQuoteDrawerOpen
  } = useShop();

  return (
    <div
      className={`min-h-screen flex flex-col font-sans pb-20 md:pb-0 w-full max-w-full overflow-x-hidden relative ${
        themeVersion === 'studio'
          ? 'bg-[#F8FAFC] text-slate-900 selection:bg-pink-600 selection:text-white'
          : themeVersion === 'tactical'
          ? 'bg-[#111612] text-[#F4F6F0] selection:bg-amber-500 selection:text-black'
          : 'bg-[#0B0D10] text-[#F8FAFC] selection:bg-cyan-400 selection:text-black'
      }`}
    >
      {/* 0. Top Design & Operations Switcher Bar */}
      <DesignSwitcherBar onLockSite={onLockSite} />

      {/* 1. Dynamic Concept Layout */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest text-cyan-400">
            Loading 910 PrintShop Concept Layout...
          </div>
        }
      >
        {themeVersion === 'tactical' && <TacticalLayout />}
        {themeVersion === 'studio' && <StudioLayout />}
      </Suspense>
      {themeVersion === 'carbon' && <CarbonLayout />}

      {/* 2. Shared Drawers & Modals */}
      <PackagesDrawerModal />
      <QuoteDrawer />
      <WrapPrintEstimatorModal />
      <Suspense fallback={null}>
        <ShopAdminModal />
        <TvBoardModal />
        <ShopTwinModal />
        <DiscoveryWhitePage />
      </Suspense>

      {/* 3. Mobile Bottom Quick-Action Bar for Customers (<768px) */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 p-2 px-2.5 flex items-center justify-between gap-2 shadow-lg border-t ${
          themeVersion === 'studio'
            ? 'bg-white border-slate-300'
            : themeVersion === 'tactical'
            ? 'bg-[#0D120E] border-[#29382B] pb-3'
            : 'bg-[#090C11] border-[#1E293B]'
        }`}
      >
        <a
          href={`tel:${shopInfo.phoneRaw}`}
          className={`flex-1 flex items-center justify-center gap-1 font-black py-2.5 px-2 text-xs uppercase tracking-wider ${
            themeVersion === 'tactical'
              ? 'btn-3d-cyan'
              : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-none shadow'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Shop</span>
        </a>

        <a
          href={shopInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 flex items-center justify-center gap-1 font-black py-2.5 px-2 text-xs uppercase tracking-wider ${
            themeVersion === 'tactical'
              ? 'btn-3d-emerald'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white rounded-none shadow'
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => setIsEstimatorModalOpen(true)}
          className={`flex-1 flex items-center justify-center gap-1 font-black py-2.5 px-2 text-xs uppercase tracking-wider cursor-pointer ${
            themeVersion === 'tactical'
              ? 'btn-3d-amber'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-none shadow'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Estimate</span>
        </button>

        {quoteItemCount > 0 && (
          <button
            onClick={() => setIsQuoteDrawerOpen(true)}
            className={`flex-1 flex items-center justify-center gap-1 font-black py-2.5 px-2 text-xs uppercase tracking-wider animate-pulse cursor-pointer ${
              themeVersion === 'tactical'
                ? 'btn-3d-magenta'
                : 'bg-pink-600 hover:bg-pink-500 text-white rounded-none shadow'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Quote ({quoteItemCount})</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem('910printshop_site_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const handleLockSite = () => {
    try {
      sessionStorage.removeItem('910printshop_site_unlocked');
    } catch {
      // ignore storage errors
    }
    setIsUnlocked(false);
  };

  if (!isUnlocked) {
    return <SiteGateModal onUnlock={() => setIsUnlocked(true)} />;
  }

  return (
    <ShopProvider>
      <AppContent onLockSite={handleLockSite} />
    </ShopProvider>
  );
}
