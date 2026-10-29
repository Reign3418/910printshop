import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SHOP_INFO,
  SERVICE_CATALOG,
  SHOP_PACKAGES,
  PORTFOLIO_SHOWCASE,
  INITIAL_SHOP_STATUS,
  INITIAL_ANNOUNCEMENTS
} from '../data/shopData';

const ShopContext = createContext(null);

const STORAGE_KEY_CATALOG = '910printshop_catalog_v1';
const STORAGE_KEY_PACKAGES = '910printshop_packages_v1';
const STORAGE_KEY_STATUS = '910printshop_status_v1';
const STORAGE_KEY_ANNOUNCE = '910printshop_announce_v1';
const STORAGE_KEY_THEME = '910printshop_theme_v1';
const STORAGE_KEY_TV_THEME = '910printshop_tv_theme_v1';

export function ShopProvider({ children }) {
  const [catalog, setCatalog] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CATALOG);
      return saved ? JSON.parse(saved) : SERVICE_CATALOG;
    } catch {
      return SERVICE_CATALOG;
    }
  });

  const [packages, setPackages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PACKAGES);
      return saved ? JSON.parse(saved) : SHOP_PACKAGES;
    } catch {
      return SHOP_PACKAGES;
    }
  });

  const [shopStatus, setShopStatus] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATUS);
      return saved ? JSON.parse(saved) : INITIAL_SHOP_STATUS;
    } catch {
      return INITIAL_SHOP_STATUS;
    }
  });

  const [announcements, setAnnouncements] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANNOUNCE);
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  // 3 Distinct Design Concepts: 'carbon' (Garage Carbon) | 'tactical' (Vinyl & Sticker Lab) | 'studio' (Print Studio)
  const [themeVersion, setThemeVersion] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      return saved || 'carbon';
    } catch {
      return 'carbon';
    }
  });

  const [tvBoardTheme, setTvBoardTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TV_THEME);
      return saved || 'carbonCyan';
    } catch {
      return 'carbonCyan';
    }
  });

  // Quote Tray / Estimate Cart
  const [quoteItems, setQuoteItems] = useState([]);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);

  // Modals & White Papers (URL hash & query-param aware for NFC / QR / HDMI TV)
  const [isPackagesModalOpen, setIsPackagesModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#packages' || window.location.search.includes('packages=1');
    }
    return false;
  });

  const [isShopAdminOpen, setIsShopAdminOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#admin' || window.location.search.includes('admin=1');
    }
    return false;
  });

  const [isTvBoardOpen, setIsTvBoardOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#tv-board' || window.location.hash === '#tv-display' || window.location.search.includes('tv=1');
    }
    return false;
  });

  const [isShopSimOpen, setIsShopSimOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#shop-sim' || window.location.hash === '#trailer-sim' || window.location.search.includes('sim=1');
    }
    return false;
  });

  const [isDiscoveryWhitePageOpen, setIsDiscoveryWhitePageOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#whitepaper' || window.location.hash === '#discovery' || window.location.search.includes('whitepaper=1');
    }
    return false;
  });

  const [isEstimatorModalOpen, setIsEstimatorModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#estimator' || window.location.search.includes('estimator=1');
    }
    return false;
  });

  const [lastSyncPulse, setLastSyncPulse] = useState(null);
  const [lanSyncInfo, setLanSyncInfo] = useState({ active: false, lanIp: '192.168.137.1', port: 3000 });
  const lastLanVersionRef = React.useRef(0);
  const isApplyingRemoteRef = React.useRef(false);

  // Listen for URL hash changes (NFC coasters, QR badges, direct links)
  useEffect(() => {
    const handleHashChange = () => {
      const h = window.location.hash;
      if (h === '#admin') setIsShopAdminOpen(true);
      if (h === '#packages') setIsPackagesModalOpen(true);
      if (h === '#tv-board' || h === '#tv-display') setIsTvBoardOpen(true);
      if (h === '#shop-sim' || h === '#trailer-sim') setIsShopSimOpen(true);
      if (h === '#whitepaper' || h === '#discovery') setIsDiscoveryWhitePageOpen(true);
      if (h === '#estimator') setIsEstimatorModalOpen(true);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persist to localStorage & broadcast cross-tab / LAN sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CATALOG, JSON.stringify(catalog));
    } catch { /* ignore */ }
  }, [catalog]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PACKAGES, JSON.stringify(packages));
    } catch { /* ignore */ }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STATUS, JSON.stringify(shopStatus));
    } catch { /* ignore */ }
  }, [shopStatus]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ANNOUNCE, JSON.stringify(announcements));
    } catch { /* ignore */ }
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, themeVersion);
    } catch { /* ignore */ }
  }, [themeVersion]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TV_THEME, tvBoardTheme);
    } catch { /* ignore */ }
  }, [tvBoardTheme]);

  // Cross-tab storage listener (so ?tv=1 second window updates in <50ms)
  useEffect(() => {
    const handleStorage = (e) => {
      try {
        if (e.key === STORAGE_KEY_CATALOG && e.newValue) setCatalog(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEY_PACKAGES && e.newValue) setPackages(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEY_STATUS && e.newValue) setShopStatus(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEY_ANNOUNCE && e.newValue) setAnnouncements(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEY_TV_THEME && e.newValue) setTvBoardTheme(e.newValue);
        setLastSyncPulse(Date.now());
      } catch { /* ignore */ }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Local Wi-Fi LAN Sync Poll (when running Vite dev server on shop laptop)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isLocalHost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.startsWith('192.168.') ||
      window.location.hostname.startsWith('10.');
    if (!isLocalHost) return;

    const timer = setInterval(async () => {
      try {
        const res = await fetch('/__shop_sync');
        if (!res.ok) return;
        const data = await res.json();
        if (data.ok) {
          setLanSyncInfo({ active: true, lanIp: data.lanIp, port: data.port });
          if (data.state && data.state.updatedAt > lastLanVersionRef.current) {
            isApplyingRemoteRef.current = true;
            lastLanVersionRef.current = data.state.updatedAt;
            if (data.state.catalog) setCatalog(data.state.catalog);
            if (data.state.packages) setPackages(data.state.packages);
            if (data.state.bayStatus) setShopStatus(data.state.bayStatus);
            if (data.state.announcements) setAnnouncements(data.state.announcements);
            if (data.state.tvBoardTheme) setTvBoardTheme(data.state.tvBoardTheme);
            setLastSyncPulse(Date.now());
            setTimeout(() => {
              isApplyingRemoteRef.current = false;
            }, 150);
          }
        }
      } catch { /* offline or static host */ }
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  const pushLanSync = async (nextState) => {
    if (isApplyingRemoteRef.current) return;
    try {
      const res = await fetch('/__shop_sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          catalog,
          packages,
          bayStatus: shopStatus,
          announcements,
          tvBoardTheme,
          ...nextState
        })
      });
      if (res.ok) {
        const d = await res.json();
        if (d.updatedAt) lastLanVersionRef.current = d.updatedAt;
      }
    } catch { /* static host fallback */ }
  };

  // Actions
  const toggleItemAvailability = (categoryKey, itemId) => {
    setCatalog(prev => {
      const cat = prev[categoryKey];
      if (!cat) return prev;
      const next = {
        ...prev,
        [categoryKey]: {
          ...cat,
          items: cat.items.map(it =>
            it.id === itemId ? { ...it, inStock: !it.inStock } : it
          )
        }
      };
      pushLanSync({ catalog: next });
      return next;
    });
    setLastSyncPulse(Date.now());
  };

  const editCatalogItem = (categoryKey, itemId, updates) => {
    setCatalog(prev => {
      const cat = prev[categoryKey];
      if (!cat) return prev;
      const next = {
        ...prev,
        [categoryKey]: {
          ...cat,
          items: cat.items.map(it =>
            it.id === itemId ? { ...it, ...updates } : it
          )
        }
      };
      pushLanSync({ catalog: next });
      return next;
    });
    setLastSyncPulse(Date.now());
  };

  const togglePackageAvailability = (pkgId) => {
    setPackages(prev => {
      const next = prev.map(p => (p.id === pkgId ? { ...p, inStock: !p.inStock } : p));
      pushLanSync({ packages: next });
      return next;
    });
    setLastSyncPulse(Date.now());
  };

  const editPackage = (pkgId, updates) => {
    setPackages(prev => {
      const next = prev.map(p => (p.id === pkgId ? { ...p, ...updates } : p));
      pushLanSync({ packages: next });
      return next;
    });
    setLastSyncPulse(Date.now());
  };

  const toggleWrapBayStatus = () => {
    setAnnouncements(prev => {
      const next = { ...prev, wrapBayOpen: !prev.wrapBayOpen };
      pushLanSync({ announcements: next });
      return next;
    });
    setLastSyncPulse(Date.now());
  };

  const toggleRushPrintStatus = () => {
    setAnnouncements(prev => {
      const next = { ...prev, rushPrintOpen: !prev.rushPrintOpen };
      pushLanSync({ announcements: next });
      return next;
    });
    setLastSyncPulse(Date.now());
  };

  const triggerVolumeTier = (percentDiscount) => {
    setAnnouncements(prev => {
      const next = {
        ...prev,
        priceTierDiscount: Number(percentDiscount) || 0,
        shieldFlashTimestamp: Date.now()
      };
      pushLanSync({ announcements: next });
      return next;
    });
    setLastSyncPulse(Date.now());
  };

  const updateCurrentShopMode = (modeObj) => {
    setShopStatus(prev => {
      const next = { ...prev, currentMode: modeObj };
      pushLanSync({ bayStatus: next });
      return next;
    });
    setLastSyncPulse(Date.now());
  };

  const resetToDefaults = () => {
    setCatalog(SERVICE_CATALOG);
    setPackages(SHOP_PACKAGES);
    setShopStatus(INITIAL_SHOP_STATUS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setLastSyncPulse(Date.now());
    pushLanSync({
      catalog: SERVICE_CATALOG,
      packages: SHOP_PACKAGES,
      bayStatus: INITIAL_SHOP_STATUS,
      announcements: INITIAL_ANNOUNCEMENTS
    });
  };

  // Quote Builder / Estimate Cart Helpers
  const addToQuote = (item, customNotes = '') => {
    setQuoteItems(prev => {
      const existing = prev.find(q => q.id === item.id && q.customNotes === customNotes);
      if (existing) {
        return prev.map(q =>
          q.id === item.id && q.customNotes === customNotes
            ? { ...q, qty: q.qty + 1 }
            : q
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          numericPrice: item.numericPrice || parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0,
          unit: item.unit || 'estimate',
          customNotes,
          qty: 1
        }
      ];
    });
  };

  const updateQuoteQty = (index, delta) => {
    setQuoteItems(prev =>
      prev
        .map((q, idx) => (idx === index ? { ...q, qty: q.qty + delta } : q))
        .filter(q => q.qty > 0)
    );
  };

  const removeFromQuote = (index) => {
    setQuoteItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const clearQuote = () => setQuoteItems([]);

  const quoteItemCount = quoteItems.reduce((sum, q) => sum + q.qty, 0);
  const quoteSubtotal = quoteItems.reduce((sum, q) => sum + q.numericPrice * q.qty, 0);

  // Silent Volume / Military / Fleet Tier Pricing helper
  const getEffectivePriceObj = (rawPrice, numPrice) => {
    const base = numPrice || parseFloat(String(rawPrice || '').replace(/[^0-9.]/g, '')) || 0;
    const tierPct = Number(announcements.priceTierDiscount || 0);
    if (!tierPct || base <= 15) {
      return { isTiered: false, current: rawPrice, numeric: base };
    }
    const discounted = Math.round(base * (1 - tierPct / 100));
    return {
      isTiered: true,
      current: `$${discounted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      numeric: discounted
    };
  };

  return (
    <ShopContext.Provider
      value={{
        shopInfo: SHOP_INFO,
        portfolio: PORTFOLIO_SHOWCASE,
        catalog,
        setCatalog,
        packages,
        setPackages,
        shopStatus,
        setShopStatus,
        announcements,
        setAnnouncements,
        themeVersion,
        setThemeVersion,
        tvBoardTheme,
        setTvBoardTheme,
        quoteItems,
        addToQuote,
        updateQuoteQty,
        removeFromQuote,
        clearQuote,
        quoteItemCount,
        quoteSubtotal,
        isQuoteDrawerOpen,
        setIsQuoteDrawerOpen,
        isPackagesModalOpen,
        setIsPackagesModalOpen,
        isShopAdminOpen,
        setIsShopAdminOpen,
        isTvBoardOpen,
        setIsTvBoardOpen,
        isShopSimOpen,
        setIsShopSimOpen,
        isDiscoveryWhitePageOpen,
        setIsDiscoveryWhitePageOpen,
        isEstimatorModalOpen,
        setIsEstimatorModalOpen,
        toggleItemAvailability,
        editCatalogItem,
        togglePackageAvailability,
        editPackage,
        toggleWrapBayStatus,
        toggleRushPrintStatus,
        triggerVolumeTier,
        updateCurrentShopMode,
        resetToDefaults,
        getEffectivePriceObj,
        lastSyncPulse,
        lanSyncInfo
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return ctx;
}
