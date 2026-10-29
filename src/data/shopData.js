export const SHOP_INFO = {
  name: '910 PrintShop',
  tagline: 'Commercial Vehicle Wraps, Custom Apparel, Decals, Magnets & Large-Format Signage',
  address: '4315 Bragg Blvd, Fayetteville, NC 28303',
  street: '4315 Bragg Blvd',
  cityStateZip: 'Fayetteville, NC 28303',
  phoneDisplay: '(910) 920-0863',
  phoneRaw: '9109200863',
  whatsappUrl: 'https://wa.me/19109200863',
  mapsUrl: 'https://maps.google.com/?q=4315+Bragg+Blvd+Fayetteville+NC+28303',
  instagramUrl: 'https://www.instagram.com/910printshop/',
  instagramHandle: '@910printshop',
  instagramReelUrl: 'https://www.instagram.com/reel/DLiFRP0RQz9/',
  facebookUrl: 'https://www.facebook.com/share/1MP9RK5Sye/',
  hours: 'Mon–Fri: 9:00 AM – 6:00 PM • Sat: 10:00 AM – 4:00 PM',
  badges: [
    'Veteran-Owned Business',
    'Latino-Owned • Hablamos Español',
    '4315 Bragg Blvd • Fort Liberty Corridor'
  ]
};

export const SERVICE_CATALOG = {
  wraps: {
    id: 'wraps',
    title: 'Commercial Car, Van & Trailer Wraps',
    subtitle: '3M & Avery Dennison cast vinyl wraps installed in our 4315 Bragg Blvd bay',
    badge: 'Flagship Bay Service',
    items: [
      {
        id: 'wrap-full-van',
        name: 'Full Commercial Cargo Van / Sprinter Wrap',
        description: 'Complete bumper-to-bumper high-impact branding for RAM ProMaster, Ford Transit, Mercedes Sprinter, or service vans. Includes custom proof & UV overlaminate.',
        price: '$2,650.00',
        numericPrice: 2650,
        unit: 'per vehicle (est.)',
        turnaround: '3–5 Business Days in Wrap Bay',
        tag: 'Most Popular Fleet Choice',
        isWrapBayItem: true,
        inStock: true
      },
      {
        id: 'wrap-partial-van',
        name: 'Partial Commercial Wrap (Rear Doors + Sides)',
        description: 'High-ROI rear barn doors + rear quarter panels + cab door logo package (just like our Alpha Beavers LLC ProMaster build). Maximum visibility at half the cost of a full wrap.',
        price: '$1,150.00',
        numericPrice: 1150,
        unit: 'installed',
        turnaround: '1–2 Business Days',
        tag: 'Featured on Bragg Blvd',
        isWrapBayItem: true,
        inStock: true
      },
      {
        id: 'wrap-food-trailer',
        name: 'Food Truck & Concession Trailer Wrap Package',
        description: 'Heat-resistant commercial vinyl graphics for concession trailers, enclosed utility trailers, and mobile businesses across Cumberland & Harnett County.',
        price: '$1,950.00',
        numericPrice: 1950,
        unit: 'starting package',
        turnaround: '3–4 Business Days',
        tag: 'Mobile Business Spec',
        isWrapBayItem: true,
        inStock: true
      },
      {
        id: 'wrap-usdot-doors',
        name: 'Contractor Door Logo, Phone & USDOT Lettering Kit',
        description: 'Both cab doors + tailgate precision-cut cast vinyl graphics with your business logo, phone numbers, bulleted services, and NC/USDOT compliance numbers.',
        price: '$325.00',
        numericPrice: 325,
        unit: 'installed both sides + rear',
        turnaround: 'Same-Day / 24-Hr Bay Slot',
        tag: 'Quick Fleet ID',
        isWrapBayItem: true,
        inStock: true
      },
      {
        id: 'wrap-accent-hood',
        name: 'Custom Hood, Roof or Racing Stripe Accent Wrap',
        description: 'Satin black, carbon fiber, gloss metallic, or custom printed hood/roof wraps and multi-layer contour stripes.',
        price: '$385.00',
        numericPrice: 385,
        unit: 'installed',
        turnaround: '1 Business Day',
        tag: 'Custom Styling',
        isWrapBayItem: true,
        inStock: true
      }
    ]
  },
  apparel: {
    id: 'apparel',
    title: 'Custom T-Shirt Prints & Military Unit Apparel',
    subtitle: 'Full-color DTF, dye sublimation & tactical apparel — zero minimum order on custom designs',
    badge: 'Fort Liberty & Crew Favorite',
    items: [
      {
        id: 'shirt-military-unit-25',
        name: '25-Pack Military Unit / Airborne PT & Morale Shirts',
        description: '25 premium ringspun or moisture-wicking tactical tees with left-chest unit crest, sleeve flag, and full-back artwork (like our US/UK Airborne skeleton print). Mix sizes S–3XL.',
        price: '$375.00',
        numericPrice: 375,
        unit: '25 shirts ($15/ea)',
        turnaround: '48–72 Hours',
        tag: 'Fort Liberty Unit Pack',
        isRushEligible: true,
        inStock: true
      },
      {
        id: 'shirt-contractor-crew-15',
        name: '15-Pack Contractor Crew High-Vis / Work Shirts',
        description: '15 durable work t-shirts (safety green, orange, charcoal, or navy) printed front & back with your company logo and phone number so your crew looks sharp on every jobsite.',
        price: '$240.00',
        numericPrice: 240,
        unit: '15 shirts ($16/ea)',
        turnaround: '24–48 Hours',
        tag: 'Trade Crew Essential',
        isRushEligible: true,
        inStock: true
      },
      {
        id: 'shirt-single-custom',
        name: 'Single / Small-Batch Custom Full-Color T-Shirt',
        description: 'No minimum order! Bring your artwork, photo, memorial design, or brand logo for vibrant full-color DTF or dye sublimation printing.',
        price: '$25.00',
        numericPrice: 25,
        unit: 'per custom shirt',
        turnaround: 'Same-Day / Next-Day',
        tag: 'No Minimums',
        isRushEligible: true,
        inStock: true
      },
      {
        id: 'shirt-hoodie-custom',
        name: 'Custom Printed Heavyweight Hoodie / Sweatshirt',
        description: 'Heavyweight fleece hoodie with custom front chest, sleeve, and full-back graphic print for units, car clubs, and winter work crews.',
        price: '$45.00',
        numericPrice: 45,
        unit: 'per hoodie (bulk discounts 10+)',
        turnaround: '48 Hours',
        tag: 'Heavyweight Fleece',
        isRushEligible: true,
        inStock: true
      }
    ]
  },
  signage: {
    id: 'signage',
    title: 'Car Magnets, Large Banners & Jobsite Signage',
    subtitle: 'Heavy-duty outdoor weatherproof signage built for Carolina sun, highway speeds & wind',
    badge: 'Fast 24–48 Hr Turnaround',
    items: [
      {
        id: 'sign-car-magnets-pair',
        name: 'Pair of Commercial Truck Door Magnets (18" × 24")',
        description: 'Heavy-gauge 30-mil automotive magnetic signs with rounded highway-safe corners and UV lamination. Ideal for HOA vehicles and dual-use pickups.',
        price: '$95.00',
        numericPrice: 95,
        unit: 'pair of 2 magnets',
        turnaround: '24 Hours',
        tag: 'HOA & Work Truck Ready',
        isRushEligible: true,
        inStock: true
      },
      {
        id: 'sign-banner-4x8',
        name: 'Large Format 4\' × 8\' Heavy-Duty Vinyl Banner',
        description: 'Full-color 13oz–18oz outdoor scrim vinyl banner with heat-welded hems and brass grommets every 2 feet. Perfect for storefronts, grand openings, and unit ceremonies.',
        price: '$115.00',
        numericPrice: 115,
        unit: '4ft × 8ft banner',
        turnaround: '24 Hours',
        tag: 'Indoor / Outdoor',
        isRushEligible: true,
        inStock: true
      },
      {
        id: 'sign-yard-10pack',
        name: '10-Pack Double-Sided Coroplast Yard Signs + H-Stakes',
        description: '18" × 24" corrugated plastic lawn signs printed full color on both sides, complete with heavy-duty metal step stakes for roofing, landscaping, and home improvement crews.',
        price: '$165.00',
        numericPrice: 165,
        unit: '10 signs + stakes',
        turnaround: '24–48 Hours',
        tag: 'Lead-Gen Machine',
        isRushEligible: true,
        inStock: true
      },
      {
        id: 'sign-retractable-stand',
        name: 'Retractable Trade-Show & Lobby Banner Stand (33" × 80")',
        description: 'Curl-free satin graphic pre-installed in an anodized aluminum roll-up base with padded carry bag.',
        price: '$145.00',
        numericPrice: 145,
        unit: 'complete stand + print',
        turnaround: '48 Hours',
        tag: 'Event & Briefing Ready',
        isRushEligible: true,
        inStock: true
      }
    ]
  },
  decals: {
    id: 'decals',
    title: 'Custom Vinyl Decals, Stickers & Window Perf',
    subtitle: 'Precision contour-cut decals, multi-layer car club graphics & perforated window vinyl',
    badge: 'Precision Plotter Cut',
    items: [
      {
        id: 'decal-rear-window-perf',
        name: 'Perforated See-Through Rear Truck Window Graphic',
        description: '60/40 DOT-compliant perforated vinyl—crystal-clear full-color advertisement from the outside, unobstructed one-way visibility from inside the cab.',
        price: '$185.00',
        numericPrice: 185,
        unit: 'installed on rear glass',
        turnaround: '24–48 Hours',
        tag: 'High-Traffic Tailgate',
        isWrapBayItem: true,
        inStock: true
      },
      {
        id: 'decal-custom-windshield',
        name: 'Custom Multi-Layer Car Club / Windshield Banner Decal',
        description: 'Precision-plotted multi-color cast vinyl decals with custom accent outlines (like our hot-pink & red contour car graphic). Built to withstand pressure washers.',
        price: '$65.00',
        numericPrice: 65,
        unit: 'custom cut & transfer taped',
        turnaround: 'Same-Day / 24 Hours',
        tag: 'Show Car Quality',
        isRushEligible: true,
        inStock: true
      },
      {
        id: 'decal-stickers-100',
        name: '100-Pack Die-Cut Laminated Brand / QR Stickers (3" × 3")',
        description: 'Dishwasher-safe, UV-coated die-cut vinyl stickers with your logo or instant quote QR code.',
        price: '$85.00',
        numericPrice: 85,
        unit: '100 die-cut stickers',
        turnaround: '24–48 Hours',
        tag: 'Brand Merch',
        isRushEligible: true,
        inStock: true
      }
    ]
  },
  print: {
    id: 'print',
    title: 'Business Cards, Trade Flyers & Dye Sublimation',
    subtitle: 'Thick 16pt commercial print collateral & full-color dye-sublimated promotional gear',
    badge: 'Commercial Print & Sublimation',
    items: [
      {
        id: 'print-bizcards-500',
        name: '500 Professional 16pt Business Cards (Double-Sided)',
        description: 'Heavy 16pt cardstock with high-gloss UV or silk matte finish. Add a custom QR code on the back so clients save your contact & request estimates instantly.',
        price: '$75.00',
        numericPrice: 75,
        unit: '500 cards',
        turnaround: '2–3 Business Days',
        tag: 'Pocket Closer',
        inStock: true
      },
      {
        id: 'print-doorhangers-250',
        name: '250 Contractor Neighborhood Door Hangers / Flyers',
        description: 'Die-cut 4.25" × 11" thick gloss door hangers to canvass the 20 houses surrounding every jobsite you wrap up in Fayetteville or Hope Mills.',
        price: '$135.00',
        numericPrice: 135,
        unit: '250 door hangers',
        turnaround: '2–3 Business Days',
        tag: 'Neighborhood Blitz',
        inStock: true
      },
      {
        id: 'print-sublimation-tumblers',
        name: 'Custom Dye-Sublimated Tumblers, Plaques & License Plates',
        description: 'Permanent full-color dye sublimation fused directly into coated metal license plates, 20oz tumblers, coffee mugs, and military PCS/retirement plaques.',
        price: '$28.00',
        numericPrice: 28,
        unit: 'per custom item (bulk pricing 10+)',
        turnaround: '24–48 Hours',
        tag: 'PCS & Gift Favorite',
        isRushEligible: true,
        inStock: true
      }
    ]
  }
};

export const SHOP_PACKAGES = [
  {
    id: 'pkg-contractor-starter',
    name: 'Contractor "Truck-to-Jobsite" Launch Bundle',
    badge: 'Best Value for Local Trades',
    price: '$349.00',
    numericPrice: 349,
    savingsText: 'Complete Day-1 Branding',
    description: 'Everything a new roofing, HVAC, landscaping, or home improvement LLC needs to look like a $1M operation on Day 1: Pair of 18"×24" Heavy Truck Magnets + 15 Custom Printed Crew Shirts + 500 Double-Sided 16pt Business Cards.',
    includes: [
      '2× Heavy-Duty 30-Mil Truck Door Magnets (18"×24")',
      '15× Custom Printed Work Shirts (Front & Back Logo)',
      '500× Double-Sided 16pt Business Cards w/ QR Code'
    ],
    inStock: true
  },
  {
    id: 'pkg-fort-liberty-unit',
    name: 'Fort Liberty Unit PT / Hail & Farewell Pack',
    badge: 'Veteran-Owned Military Spec',
    price: '$465.00',
    numericPrice: 465,
    savingsText: 'Minutes from Yadkin / All American Gate',
    description: 'Built by veterans for Fort Liberty units: 30 Full-Color Custom Crest & Back Artwork Shirts (S–3XL mix) + 1 Heavy-Duty 4\'×8\' Unit Ceremony Vinyl Banner with brass grommets + 50 Unit Crest Stickers.',
    includes: [
      '30× Full-Color Custom Unit Shirts (Left Chest + Full Back)',
      '1× 4\'×8\' Heavy Outdoor Vinyl Unit Banner w/ Grommets',
      '50× Die-Cut Weatherproof Unit Crest Vinyl Stickers'
    ],
    inStock: true
  },
  {
    id: 'pkg-alpha-van-fleet',
    name: 'The "Alpha ProMaster" Commercial Van Graphics Pack',
    badge: 'Inspired by Our Bragg Blvd Van Build',
    price: '$1,245.00',
    numericPrice: 1245,
    savingsText: '24/7 Rolling Billboard',
    description: 'Turn your cargo van or enclosed trailer into a non-stop lead generator: Rear Barn Door Full-Impact Logo & Phone Graphics + Both Side Panel Brand Graphics + 10 Crew Tees + 500 Business Cards.',
    includes: [
      'Rear Double-Door High-Contrast Mascot, Logo & Giant Phone Numbers',
      'Driver & Passenger Side Commercial Vinyl Graphics Installed',
      '10× Custom Matching Crew Shirts + 500× Business Cards'
    ],
    inStock: true
  },
  {
    id: 'pkg-event-foodtruck',
    name: 'Food Truck & Event Vendor Branding Kit',
    badge: 'Festival & Brewery Ready',
    price: '$295.00',
    numericPrice: 295,
    savingsText: 'High-Contrast Crowd Magnet',
    description: 'Stand out at Fayetteville festivals, breweries, and pop-ups: 1× 4\'×8\' Main Trailer Banner + 1× Retractable 33"×80" Menu/Specials Stand + 100× QR Menu/Instagram Stickers.',
    includes: [
      '1× 4\'×8\' Heavy-Duty Scrim Vinyl Banner w/ Grommets',
      '1× 33"×80" Retractable Aluminum Banner Stand',
      '100× Laminated QR Code & Brand Stickers'
    ],
    inStock: true
  }
];

export const PORTFOLIO_SHOWCASE = [
  {
    id: 'work-alpha-beavers',
    title: 'Alpha Beavers LLC — RAM ProMaster Commercial Van Wrap',
    category: 'Vehicle Wrap',
    badge: 'Commercial Fleet Wrap',
    image: './images/alpha-beavers-van-wrap.jpg',
    alt: 'Alpha Beavers LLC Home Improvement RAM ProMaster commercial van wrap with giant dual phone numbers and beaver mascot by 910 PrintShop',
    clientType: 'Home Improvement Contractor • Fayetteville, NC',
    specs: 'Cast Vinyl + UV Overlaminate • Dual High-Contrast Roofline Phone Numbers + Mascot + Tailgate CTA',
    highlight: 'Designed so drivers 4 car-lengths back on Bragg Blvd or All American Fwy can read the phone number in 2 seconds.'
  },
  {
    id: 'work-airborne-shirt',
    title: 'Allied Airborne Paratrooper Skeleton — Full-Back Apparel Print',
    category: 'T-Shirt',
    badge: 'Custom Military Apparel',
    image: './images/military-airborne-tshirt.jpg',
    alt: 'Custom printed US and UK Airborne military skeleton handshake t-shirt design printed on tactical olive garment by 910 PrintShop',
    clientType: 'Fort Liberty Airborne & Allied Exchange Apparel',
    specs: 'High-Definition Full-Color Multi-Tone Print on Coyote / Olive Tactical Tee',
    highlight: 'Crisp rifle, beret, and camo shading with soft-hand breathability that holds up through wash after wash.'
  },
  {
    id: 'work-pink-contour-decal',
    title: 'Custom Multi-Layer Pink & Red Contour Car Window Graphic',
    category: 'Decal',
    badge: 'Custom Vinyl Decal',
    image: './images/custom-car-decal-pink.jpg',
    alt: 'Custom layered white, hot pink, and red vinyl car window decal with precision contour cuts by 910 PrintShop',
    clientType: 'Custom Automotive & Car Club Graphics',
    specs: 'Multi-Layer Precision Plotter Cut • Outdoor Cast Gloss Vinyl in White, Neon Magenta & Crimson',
    highlight: 'Zero background film—razor-sharp layered registration engineered for curved automotive glass.'
  }
];

export const SHOP_PRESET_MODES = [
  {
    id: 'standard-open',
    name: '4315 Bragg Blvd Showroom — Open & Taking Orders',
    address: '4315 Bragg Blvd, Fayetteville, NC 28303',
    hours: 'Mon–Fri 9AM–6PM • Sat 10AM–4PM',
    statusBadge: 'WRAP BAY & PRINT PRESS OPEN',
    notes: 'Walk-ins welcome on Bragg Blvd or message us on WhatsApp (910) 920-0863 for instant proofs.'
  },
  {
    id: 'rush-apparel-open',
    name: 'Same-Day / 24-Hr Rush Shirt & Banner Slot Open',
    address: '4315 Bragg Blvd, Fayetteville, NC 28303',
    hours: 'Rush Cutoff: 2:00 PM Today',
    statusBadge: '⚡ 24-HR RUSH PRESS SLOT OPEN',
    notes: 'Need shirts, magnets, or a ceremony banner before tomorrow? Send artwork via WhatsApp now!'
  },
  {
    id: 'wrap-bay-install',
    name: 'In-Bay Fleet Wrap Installation Mode (By Appointment)',
    address: '4315 Bragg Blvd, Fayetteville, NC 28303',
    hours: 'Active Fleet Install in Progress • Quotes Open 24/7',
    statusBadge: '🚐 ACTIVE VEHICLE WRAP IN BAY',
    notes: 'Our wrap team is laying vinyl in the bay—tap Call or WhatsApp and we will step right out to measure your vehicle!'
  },
  {
    id: 'fort-liberty-delivery',
    name: 'Fort Liberty / Fayetteville B2B Delivery Run',
    address: 'Serving Bragg Blvd, Fort Liberty, Hope Mills & Spring Lake',
    hours: 'Showroom Open + Local Fleet Drop-Offs',
    statusBadge: '🪖 FORT LIBERTY & FLEET RUN ACTIVE',
    notes: 'Text or WhatsApp your vehicle photo or unit crest for an instant remote estimate!'
  }
];

export const INITIAL_SHOP_STATUS = {
  currentMode: SHOP_PRESET_MODES[0],
  presets: SHOP_PRESET_MODES
};

export const INITIAL_ANNOUNCEMENTS = {
  marqueeText: '🚐 VETERAN-OWNED & LATINO-OWNED @ 4315 BRAGG BLVD • COMMERCIAL VEHICLE WRAPS, CUSTOM UNIT T-SHIRTS, CAR MAGNETS, DECALS & BANNERS • CALL OR WHATSAPP (910) 920-0863 FOR FAST PROOFS!',
  wrapBayOpen: true,
  rushPrintOpen: true,
  priceTierDiscount: 0, // 0 | 5 | 10 | 15 (% B2B / Military Unit / Fleet volume tier)
  shieldFlashTimestamp: 0,
  tvRotateMode: false,
  bayNote: 'Walk-ins welcome at 4315 Bragg Blvd or tap WhatsApp to send your logo & vehicle photos!'
};
