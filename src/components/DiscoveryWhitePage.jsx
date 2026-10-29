import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Printer,
  Search,
  MapPin,
  Smartphone,
  Tv,
  Shield,
  Truck,
  Zap,
  Globe,
  CheckCircle2,
  Cpu,
  QrCode,
  Award,
  PhoneCall
} from 'lucide-react';

export default function DiscoveryWhitePage() {
  const {
    shopInfo,
    isDiscoveryWhitePageOpen,
    setIsDiscoveryWhitePageOpen,
    setIsShopSimOpen,
    setIsTvBoardOpen,
    setIsEstimatorModalOpen
  } = useShop();

  if (!isDiscoveryWhitePageOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm overflow-y-auto p-2 sm:p-6 flex justify-center items-start print:p-0 print:bg-white print:static animate-fadeIn"
      onClick={() => setIsDiscoveryWhitePageOpen(false)}
    >
      {/* Document Container */}
      <div
        className="bg-white text-stone-900 rounded-none shadow-2xl max-w-4xl w-full my-4 border-2 border-stone-900 overflow-hidden print:shadow-none print:border-none print:m-0 print:rounded-none"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden on print) */}
        <div className="bg-stone-950 text-stone-200 px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 print:hidden border-b border-stone-800">
          <div className="flex items-center gap-2 min-w-0">
            <span className="bg-cyan-400 text-stone-950 font-black text-[11px] px-2 py-0.5 rounded-none font-mono uppercase shrink-0">
              📄 Master Playbook
            </span>
            <span className="text-xs text-stone-300 font-medium truncate">
              Showroom Tech, Fleet Lead-Gen &amp; Local Search Architecture — Prepared for 910 PrintShop
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-1.5">
            <button
              onClick={() => {
                setIsDiscoveryWhitePageOpen(false);
                setIsShopSimOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition cursor-pointer flex items-center gap-1"
              title="Open Live Shop + Phone Simulator"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>🚐 Open Live Sim</span>
            </button>

            <button
              onClick={() => {
                setIsDiscoveryWhitePageOpen(false);
                setIsTvBoardOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-none bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black transition cursor-pointer flex items-center gap-1"
              title="Open 1080p Showroom TV Board"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>📺 Showroom TV Board</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition cursor-pointer border border-stone-700"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={() => setIsDiscoveryWhitePageOpen(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition cursor-pointer border border-stone-700"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* White Paper Header */}
        <div className="p-6 sm:p-8 border-b-2 border-stone-200 bg-stone-50 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-cyan-800 text-xs font-black uppercase tracking-widest block font-mono">
                Meat &amp; Potatoes First • Showroom, Wrap Bay &amp; Local Search Playbook
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
                910 PrintShop Field, Showroom &amp; Lead-Gen Architecture
              </h1>
              <p className="text-sm text-stone-600 mt-1">
                Five high-impact options built specifically for <strong>{shopInfo.address}</strong>—combining a 55&quot; Showroom TV Menu Board, Front-Counter Touch Control, NFC/QR Wrapped Fleet Badges, Fort Bragg Unit Pipelines, and Google Maps 3-Pack dominance with <strong>$0/month software bills</strong> and a <strong>2-second USB fail-safe</strong>.
              </p>
            </div>

            <div className="text-left sm:text-right text-xs text-stone-600 shrink-0 font-mono bg-white p-3.5 rounded-none border-2 border-stone-300 space-y-0.5">
              <div><strong>Shop:</strong> {shopInfo.name}</div>
              <div><strong>Showroom:</strong> {shopInfo.address}</div>
              <div><strong>Direct / WhatsApp:</strong> {shopInfo.phoneDisplay}</div>
              <div><strong>Ownership:</strong> Veteran-Owned &amp; Latino-Owned</div>
              <div><strong>Monthly SaaS Fees:</strong> $0.00 / mo</div>
            </div>
          </div>

          {/* Quick Interactive Launch Bar (Hidden on print) */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200 print:hidden text-xs">
            <span className="font-mono font-bold text-stone-500 uppercase text-[10px]">
              Interactive Demos Built Into This Site:
            </span>
            <button
              onClick={() => {
                setIsDiscoveryWhitePageOpen(false);
                setIsShopSimOpen(true);
              }}
              className="px-2.5 py-1 rounded-none bg-white hover:bg-cyan-50 border border-stone-300 font-bold text-stone-800 cursor-pointer"
            >
              🚐 Launch Dual-Screen Showroom + Phone Simulator
            </button>
            <button
              onClick={() => {
                setIsDiscoveryWhitePageOpen(false);
                setIsTvBoardOpen(true);
              }}
              className="px-2.5 py-1 rounded-none bg-white hover:bg-cyan-50 border border-stone-300 font-bold text-stone-800 cursor-pointer"
            >
              📺 Launch 1080p Showroom TV Board + PNG Exporter
            </button>
            <button
              onClick={() => {
                setIsDiscoveryWhitePageOpen(false);
                setIsEstimatorModalOpen(true);
              }}
              className="px-2.5 py-1 rounded-none bg-white hover:bg-cyan-50 border border-stone-300 font-bold text-stone-800 cursor-pointer"
            >
              🧮 Launch Interactive Wrap &amp; Print Quote Builder
            </button>
          </div>
        </div>

        {/* Document Body — MEAT & POTATOES AT THE VERY TOP */}
        <div className="p-6 sm:p-10 space-y-10 text-stone-800 leading-relaxed text-sm">
          {/* Section 1: Five Field, Showroom & Fleet Revenue Options */}
          <section className="space-y-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2 border-b-2 border-stone-200 pb-2">
              <span className="w-6 h-6 rounded-none bg-cyan-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                1
              </span>
              The Meat &amp; Potatoes: Five Showroom, Wrap Bay &amp; Lead-Gen Options
            </h2>

            <p className="text-xs text-stone-600">
              National sign and wrap franchises pay $300+/month for cloud digital signage boxes, custom estimator subscriptions, and fleet CRM tools. Every single capability below is engineered directly into your platform for <strong>$0/month</strong>:
            </p>

            <div className="space-y-4">
              {/* Option 1: The Raspberry Pi "Showroom-Box" */}
              <div className="border-2 border-emerald-600 bg-emerald-50/40 p-5 rounded-none space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-emerald-700 text-white font-mono font-black text-[10px] uppercase px-2.5 py-0.5 rounded-none flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> Option 1 • Turn-Key Showroom TV Appliance
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-900">
                    ~$35–$45 One-Time Hardware • $0/mo SaaS Fees
                  </span>
                </div>
                <h3 className="font-black text-base text-stone-900">
                  🍓 The Raspberry Pi &quot;Showroom-Box&quot; (Plugs Straight Into Your 55&quot; Showroom TV USB + HDMI)
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Walk-in contractors and Fort Bragg soldiers at <strong>4315 Bragg Blvd</strong> immediately see a crisp 1080p Digital Service &amp; Pricing Board on your 55&quot; Showroom TV—complete with live Wrap Bay availability, 24-Hr Rush Print press status, and scannable WhatsApp QR codes:
                </p>
                <ul className="text-xs space-y-1.5 text-stone-700 list-disc list-inside">
                  <li>
                    <strong>Zero Extra Power Cords Needed:</strong> A stick-of-gum sized <strong>Raspberry Pi Zero 2 W</strong> (or Pi 4) Velcros behind your 55&quot; Showroom TV, drawing power straight from the <strong>TV&apos;s USB service port</strong> and outputting crisp 1080p video to <strong>HDMI 1</strong>.
                  </li>
                  <li>
                    <strong>Turn On the Showroom TV &amp; Work:</strong> Flip on the TV at 9:00 AM and the Showroom Board boots automatically into full-screen kiosk mode in ~15 seconds—with 3 selectable visual themes (<em>Garage Carbon Cyan</em>, <em>Fort Bragg Tactical Gold</em>, or <em>Daylight Showroom White</em>).
                  </li>
                  <li>
                    <strong>The 2-Second USB Thumb-Drive Fail-Safe:</strong> Your Showroom TV Board includes a built-in <strong>1-Click 1920×1080 PNG USB Exporter</strong>. Keep a USB thumb drive plugged into the TV permanently—if Wi-Fi ever blinks, press <code>INPUT → USB</code> on your remote and your static HD price board is up in 2 seconds flat.
                  </li>
                </ul>
              </div>

              {/* Option 2: 7-Inch Countertop Touch Deck & Smartphone Sync */}
              <div className="border-2 border-amber-500 bg-amber-50/40 p-5 rounded-none space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-amber-500 text-stone-950 font-mono font-black text-[10px] uppercase px-2.5 py-0.5 rounded-none flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Option 2 • Front-Counter Control &amp; Silent B2B/Military Tiers
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-900">
                    Built In • Instant &lt;50ms Cross-Screen Sync
                  </span>
                </div>
                <h3 className="font-black text-base text-stone-900">
                  🖥️ The 7-Inch Countertop Touch Deck &amp; Smartphone Sync (With 1.3s Veteran Shield Bumper)
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Whether you are laying cast vinyl in the wrap bay, running the DTF transfer press, or quoting a fleet manager at the front counter, you control every price, turnaround time, and bay status badge in one tap:
                </p>
                <ul className="text-xs space-y-1.5 text-stone-700 list-disc list-inside">
                  <li>
                    <strong>1-Tap Wrap Bay &amp; Rush Press Switches:</strong> Flip the Wrap Bay between <code>OPEN FOR DROP-OFFS</code> and <code>BOOKED / BY APPT</code>, or toggle the <code>⚡ 24-HR RUSH PRINT PRESS</code> slot on and off from your phone or countertop screen.
                  </li>
                  <li>
                    <strong>Silent B2B, Military Unit &amp; Fleet Pricing Tiers (<code>0%</code>, <code>-5%</code>, <code>-10%</code>, <code>-15%</code>):</strong> When a Fort Bragg S-4 representative or a 5-van HVAC fleet owner walks up to the counter, tap <code>-10% Military Unit</code> or <code>-15% Commercial Fleet</code> on your phone.
                  </li>
                  <li>
                    <strong>The 1.3-Second Veteran Shield TV Bumper:</strong> The 55&quot; Showroom TV briefly flashes a crisp <strong>910 PrintShop Veteran-Owned Shield</strong> for 1.3 seconds and seamlessly re-renders every package and wrap price at the new fleet/unit rate—with <strong>zero messy crossed-out numbers</strong> or &quot;discount&quot; clutter on screen.
                  </li>
                </ul>
              </div>

              {/* Option 3: Weatherproof QR + NFC "Wrapped by 910 PrintShop" Corner Badges */}
              <div className="border-2 border-cyan-600 bg-cyan-50/30 p-5 rounded-none space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-cyan-700 text-white font-mono font-black text-[10px] uppercase px-2.5 py-0.5 rounded-none flex items-center gap-1">
                    <QrCode className="w-3 h-3" /> Option 3 • 24/7 Rolling Lead-Gen Terminals
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-900">
                    ~$0.30 per UV Laminated NFC + QR Badge
                  </span>
                </div>
                <h3 className="font-black text-base text-stone-900">
                  📲 Weatherproof QR + NFC &quot;Wrapped by 910 PrintShop&quot; Corner Badges
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Every commercial RAM ProMaster van (like <em>Alpha Beavers LLC</em>), enclosed food trailer, work pickup, and rear window perf that rolls out of your <strong>4315 Bragg Blvd</strong> bay is seen by thousands of Fayetteville drivers every week. Turn every completed vehicle into an interactive salesperson:
                </p>
                <ul className="text-xs space-y-1.5 text-stone-700 list-disc list-inside">
                  <li>
                    <strong>Tap or Scan Right on the Rear Quarter Panel:</strong> Apply a sleek, UV-overlaminated 3&quot;×1.5&quot; <strong>&quot;WRAPPED BY 910 PRINTSHOP • SCAN OR TAP FOR INSTANT FLEET QUOTE&quot;</strong> badge with an embedded NTAG213 NFC microchip under the cast vinyl on the rear bumper or door jamb.
                  </li>
                  <li>
                    <strong>Opens the Instant Wrap/Print Quote Builder on Tap (<code>#estimator</code>):</strong> When another roofer, plumber, or food-truck owner at the Home Depot or Lowe&apos;s parking lot scans or taps that badge with their iPhone/Android, it launches straight into your <strong>Interactive Vehicle Wrap &amp; Print Quote Builder</strong>.
                  </li>
                  <li>
                    <strong>Front-Counter NFC Register Coin (<code>#admin</code>):</strong> Stick one waterproof NFC coin right under your front counter at 4315 Bragg Blvd—tap your phone to it to pop open the <strong>Shop Owner Command Center</strong> in half a second.
                  </li>
                </ul>
              </div>

              {/* Option 4: Fort Bragg Unit & Bragg Blvd Contractor Fleet Pipeline */}
              <div className="border border-stone-300 bg-white p-5 rounded-none space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-stone-900 text-amber-400 font-mono font-black text-[10px] uppercase px-2.5 py-0.5 rounded-none flex items-center gap-1">
                    <Award className="w-3 h-3" /> Option 4 • Military Unit &amp; Local Trades Pipeline
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-600">
                    Bilingual (EN/ES) + WhatsApp Direct Proofing
                  </span>
                </div>
                <h3 className="font-black text-base text-stone-900">
                  🪖 Fort Bragg Unit &amp; Bragg Blvd Contractor Fleet Pipeline (Zero-Friction Ordering)
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Located minutes from the Yadkin Road and All American Freeway gates on <strong>Bragg Blvd</strong>, and proudly <strong>Veteran-Owned &amp; Latino-Owned (Hablamos Español)</strong>, 910 PrintShop is uniquely positioned to own two high-margin repeat markets simultaneously:
                </p>
                <ul className="text-xs space-y-1.5 text-stone-700 list-disc list-inside">
                  <li>
                    <strong>Fort Bragg Airborne &amp; Unit Morale Pipeline:</strong> Pre-packaged 25-packs and 30-packs for PT shirts, Hail &amp; Farewell plaques/tumblers, deployment hoodies, and 4&apos;×8&apos; unit ceremony vinyl banners with brass grommets—so unit supply sergeants and FRG leaders can approve proofs via WhatsApp in 60 seconds.
                  </li>
                  <li>
                    <strong>&quot;Truck-to-Jobsite&quot; Contractor Launch Bundles:</strong> Turnkey $349–$1,245 packages combining 30-mil Truck Door Magnets or Partial Cargo Van Wraps + 15 High-Vis Crew Work Shirts + 500 16pt Business Cards + Coroplast Yard Signs.
                  </li>
                  <li>
                    <strong>Zero-Friction WhatsApp Artwork &amp; Vehicle Photo Dispatch:</strong> Instead of dead email forms that sit unread in spam folders, the Quote Builder compiles the customer&apos;s itemized vehicle type, shirt sizes, and turnaround request into a 1-tap WhatsApp message to <code>(910) 920-0863</code> so they can attach their logo vector or truck photo immediately.
                  </li>
                </ul>
              </div>

              {/* Option 5: Google Maps 3-Pack, Click-to-Call & AI Search Dominance */}
              <div className="border-2 border-stone-800 bg-stone-50 p-5 rounded-none space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-stone-900 text-cyan-400 font-mono font-black text-[10px] uppercase px-2.5 py-0.5 rounded-none flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Option 5 • Local SEO + GEO AI Search Architecture
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-700">
                    24/7 Organic Lead Engine • $0 Ad Spend Required
                  </span>
                </div>
                <h3 className="font-black text-base text-stone-900">
                  🔍 Google Maps 3-Pack, Click-to-Call (<code>tel:9109200863</code>) &amp; AI Search (<code>GEO</code> / <code>llms.txt</code> / Schema.org) Dominance
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  When a contractor or soldier searches <em>&quot;commercial van wrap Fayetteville NC&quot;</em>, <em>&quot;custom unit t-shirts near Fort Bragg&quot;</em>, or <em>&quot;imprenta y rotulación de vehículos en Fayetteville&quot;</em> on Google, Siri, or ChatGPT, your site is engineered to rank #1 across <strong>Fayetteville, Fort Bragg, Hope Mills, Spring Lake, Raeford, and Sanford</strong>:
                </p>
                <ul className="text-xs space-y-1.5 text-stone-700 list-disc list-inside">
                  <li>
                    <strong>Rich Schema.org <code>LocalBusiness</code> + <code>OfferCatalog</code> Graph:</strong> Declares your exact street coordinates (<code>4315 Bragg Blvd, Fayetteville, NC 28303</code>), direct phone (<code>(910) 920-0863</code>), Veteran-Owned &amp; Latino-Owned credentials, and itemized pricing directly to Google Maps crawlers.
                  </li>
                  <li>
                    <strong>Dedicated AI Answer Engine Index (<code>/llms.txt</code>):</strong> Machine-readable Generative Engine Optimization (GEO) index so ChatGPT, Perplexity, Apple Intelligence, and Google AI Overviews cite <strong>910 PrintShop</strong> first with direct click-to-call and WhatsApp links.
                  </li>
                  <li>
                    <strong>Instant Mobile Speed (&lt;200ms Load):</strong> Zero bloated WordPress plugins—loads instantaneously on cellular connections along Bragg Blvd, on Fort Bragg, or on active construction jobsites.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Zero-Downtime Fail-Safe & Crawl-Walk-Run Rollout */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2 border-b-2 border-stone-200 pb-2">
              <span className="w-6 h-6 rounded-none bg-emerald-700 text-white flex items-center justify-center text-xs font-bold font-mono">
                2
              </span>
              Our #1 Rule: Zero Downtime, Zero Overwhelm &amp; The &quot;2-Second USB Fail-Safe&quot;
            </h2>

            <div className="bg-emerald-50 border-2 border-emerald-600 p-5 rounded-none space-y-3 text-xs">
              <h3 className="font-black text-sm sm:text-base text-emerald-950 uppercase tracking-wide">
                🛡️ Shop Tech Must Never Slow Down Your Wrap Bay or Print Press
              </h3>
              <p className="text-stone-700 leading-relaxed">
                When you are heat-setting a complex bumper wrap on a RAM ProMaster or printing a 100-shirt rush order before a Fort Bragg airborne ceremony, you have zero time to troubleshoot electronics. Here is how we guarantee 100% reliability:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className="bg-white border border-emerald-300 p-3.5 rounded-none space-y-1">
                  <div className="font-mono font-black text-emerald-800 uppercase text-[11px]">
                    1. The 2-Second USB Fail-Safe
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Your <strong>USB thumb drive stays plugged into your Showroom TV permanently</strong> with your exported 1920×1080 PNG board while the Raspberry Pi uses <code>HDMI 1</code>. If anything ever hiccups, press <strong>INPUT → USB</strong> on the TV remote and your static board is live in 2 seconds!
                  </p>
                </div>

                <div className="bg-white border border-emerald-300 p-3.5 rounded-none space-y-1">
                  <div className="font-mono font-black text-emerald-800 uppercase text-[11px]">
                    2. Works on Local Shop Wi-Fi
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Built-in LAN sync automatically connects your front-counter laptop, smartphone, and Showroom TV over your existing <strong>4315 Bragg Blvd</strong> Wi-Fi with zero cloud subscriptions or monthly fees.
                  </p>
                </div>

                <div className="bg-white border border-emerald-300 p-3.5 rounded-none space-y-1">
                  <div className="font-mono font-black text-emerald-800 uppercase text-[11px]">
                    3. &quot;Crawl → Walk → Run&quot; Rollout
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    Start Day 1 with the live website, Instant Quote Builder, and USB Showroom TV Board. Add NFC counter coins, &quot;Wrapped by 910 PrintShop&quot; fleet badges, or the Raspberry Pi appliance whenever you want.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Territorial Search & Conversion Matrix */}
          <section className="space-y-4">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2 border-b-2 border-stone-200 pb-2">
              <span className="w-6 h-6 rounded-none bg-stone-900 text-cyan-400 flex items-center justify-center text-xs font-bold font-mono">
                3
              </span>
              Cumberland, Hoke, Harnett &amp; Lee County Territorial Search Matrix
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-stone-300 p-4 bg-white rounded-none space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-800 font-black text-xs uppercase font-mono">
                  <Truck className="w-4 h-4" />
                  <span>Commercial Wraps &amp; Fleet Graphics</span>
                </div>
                <h3 className="font-bold text-stone-900 text-sm">
                  Capturing High-Ticket Van, Box Truck &amp; Trailer Wraps
                </h3>
                <p className="text-xs text-stone-600">
                  Targets high-intent commercial searches across <strong>Bragg Blvd, Skibo Rd, All American Fwy, Hope Mills, Raeford, and Sanford</strong> for cargo van wraps, USDOT door lettering, food truck wraps, and perforated rear window vinyl.
                </p>
              </div>

              <div className="border border-stone-300 p-4 bg-white rounded-none space-y-1.5">
                <div className="flex items-center gap-2 text-amber-700 font-black text-xs uppercase font-mono">
                  <Award className="w-4 h-4" />
                  <span>Fort Bragg &amp; Custom Apparel</span>
                </div>
                <h3 className="font-bold text-stone-900 text-sm">
                  No-Minimum DTF, Unit PT Shirts &amp; Rush Banners
                </h3>
                <p className="text-xs text-stone-600">
                  Captures year-round military unit PT shirts, airborne morale tees, PCS/retirement dye-sublimated plaques, and 24-hour rush vinyl banners right outside the Fort Bragg gates.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer / Print Note */}
        <div className="p-6 bg-stone-100 border-t-2 border-stone-200 text-center text-xs text-stone-600 font-mono flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            {shopInfo.name} • {shopInfo.address} • {shopInfo.phoneDisplay}
          </span>
          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="text-cyan-800 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsDiscoveryWhitePageOpen(false)}
              className="text-stone-800 font-bold hover:underline cursor-pointer"
            >
              Return to Live Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
