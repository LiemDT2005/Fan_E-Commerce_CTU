const categories = [
  { id: "all", name: "All Products", count: 14, icon: "apps" },
  { id: "smart-ceiling-fan", name: "3-in-1 Smart Fans", count: 2, icon: "mode_fan" },
  { id: "nordic-slim-fans", name: "Nordic Slim Ceiling Fans", count: 2, icon: "toys_fan" },
  { id: "silent-bedroom-fans", name: "Silent Bedroom Fans", count: 2, icon: "bed" },
  { id: "commercial-fans", name: "Commercial High-Ceiling Fans", count: 1, icon: "apartment" },
  { id: "filters-accessories", name: "Filters & Purifier Cores", count: 2, icon: "filter_alt" },
  { id: "controllers", name: "Smart Controllers & IoT", count: 2, icon: "sensors" },
  { id: "accessories-parts", name: "Blades & Downrod Kits", count: 1, icon: "hardware" },
  { id: "services", name: "Technical Services & Care", count: 2, icon: "home_repair_service" }
];

const products = [
  // 1. 3-in-1 Smart Fans
  {
    id: "ff-apex-3in1",
    sku: "FAN-APEX-WALNUT",
    name: "FANFUN Apex 3-in-1 Smart Ceiling Fan (Walnut Wood)",
    category: "smart-ceiling-fan",
    categoryName: "3-in-1 Smart Fans",
    price: 8490000,
    originalPrice: 9990000,
    badge: "Best Seller",
    rating: 4.9,
    reviewCount: 128,
    stock: 45,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795491622/fanfun_products/ff-apex-3in1.jpg",
    description: "Premium microclimate solution for modern living spaces. Ultra-quiet 28dB BLDC inverter motor combined with soothing PTC ceramic heating and medical-grade HEPA H13 negative ion air purification.",
    features: [
      "Ultra-quiet 45W BLDC Inverter motor, noise level as low as 28dB",
      "1500W PTC ceramic heating warms up instantly in 3 seconds",
      "Medical-grade HEPA H13 filter captures 99.97% of PM2.5 fine dust",
      "Smart control via Wi-Fi / FANFUN Mobile App & Voice Assistant",
      "Tri-color LED ambient light (Warm 3000K, Neutral 4000K, Daylight 6500K)",
      "Natural CNC-machined walnut wooden blades with moisture-proof coating"
    ],
    specs: {
      motor: "45W Brushless DC (BLDC)",
      heatingPower: "1500W PTC (2 heat settings)",
      airflow: "14,200 m³/h (9 speed levels)",
      airPurification: "HEPA H13 Filter + Plasma Negative Ion",
      diameter: "1320 mm (52 inches)",
      roomArea: "20 - 35 m²",
      control: "RF Remote + Smartphone App + Touch Panel",
      warranty: "5-year motor warranty, 2-year electronics warranty"
    }
  },
  {
    id: "ff-nordic-scandi-teak",
    sku: "FAN-HORIZON-TEAK",
    name: "FANFUN Horizon 3-in-1 Smart Fan (Natural Teak Wood)",
    category: "smart-ceiling-fan",
    categoryName: "3-in-1 Smart Fans",
    price: 9290000,
    originalPrice: 10490000,
    badge: "Flagship Edition",
    rating: 5.0,
    reviewCount: 64,
    stock: 28,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795535540/fanfun_products/ff-nordic-scandi-teak.jpg",
    description: "Architectural masterpiece crafted from sustainably harvested natural Teak wood. Features triple-layer climate adaptation and auto-reversing winter updraft circulation.",
    features: [
      "50W High-Torque BLDC Inverter Motor for generous airflow",
      "Winter updraft mode redistributes warm ceiling air downward",
      "HEPA H13 medical filtration with integrated VOC carbon chamber",
      "Seamless integration with Apple HomeKit, Google Home & Alexa",
      "Organic hand-finished teak blades with waterproof resin infusion"
    ],
    specs: {
      motor: "50W BLDC High-Torque",
      heatingPower: "1600W PTC Dynamic Heat",
      airflow: "15,800 m³/h",
      diameter: "1420 mm (56 inches)",
      roomArea: "25 - 45 m²",
      warranty: "5-year full system warranty"
    }
  },

  // 2. Nordic Slim Fans
  {
    id: "ff-slim-pro",
    sku: "FAN-SLIM-MATTE-BLK",
    name: "FANFUN Slim Pro 3-in-1 Smart Ceiling Fan (Matte Black)",
    category: "nordic-slim-fans",
    categoryName: "Nordic Slim Ceiling Fans",
    price: 6990000,
    originalPrice: 7990000,
    badge: "New Arrival",
    rating: 4.8,
    reviewCount: 94,
    stock: 32,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795491624/fanfun_products/ff-slim-pro.jpg",
    description: "Minimalist Scandinavian ultra-slim design. Specially tailored for modern apartments with low ceilings from 2.6m to 3m.",
    features: [
      "Ultra-slim flush-mount design engineered for apartments",
      "38W DC motor saves up to 70% energy",
      "1200W gentle PTC heating prevents dry skin and nasal congestion",
      "Dual magnetic HEPA filters for 10-second tool-free replacement",
      "Smart temperature & humidity sensors for automatic speed regulation"
    ],
    specs: {
      motor: "38W DC Inverter",
      heatingPower: "1200W PTC",
      airflow: "11,800 m³/h (6 speed levels)",
      diameter: "1120 mm (44 inches)",
      roomArea: "15 - 25 m²",
      warranty: "5-year official warranty"
    }
  },
  {
    id: "ff-slim-pure-silver",
    sku: "FAN-SLIM-SILVER",
    name: "FANFUN Nordic Air Ultra-Slim Fan (Brushed Silver)",
    category: "nordic-slim-fans",
    categoryName: "Nordic Slim Ceiling Fans",
    price: 6490000,
    originalPrice: 7290000,
    badge: "Apartment Choice",
    rating: 4.8,
    reviewCount: 47,
    stock: 36,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795535541/fanfun_products/ff-slim-pure-silver.jpg",
    description: "Anodized brushed aerospace aluminum housing designed for compact city condos. Features flush-ceiling hugger profile under 18cm.",
    features: [
      "Ultra-compact 18cm drop height for 2.5m ceiling apartments",
      "Quiet aerodynamic airfoils with zero wobble guarantee",
      "Warm ambient edge-lighting with 1-100% stepless dimming",
      "Smart schedule timer and gentle wake-up breeze emulation"
    ],
    specs: {
      motor: "35W DC Inverter",
      heatingPower: "Cooling & Air Purification Only",
      airflow: "10,900 m³/h",
      diameter: "1060 mm (42 inches)",
      roomArea: "12 - 20 m²",
      warranty: "3-year official warranty"
    }
  },

  // 3. Silent Bedroom Fans
  {
    id: "ff-prime-pure",
    sku: "FAN-PRIME-WHITE",
    name: "FANFUN Prime Air Smart Ceiling Fan (Pure White)",
    category: "silent-bedroom-fans",
    categoryName: "Silent Bedroom Fans",
    price: 5490000,
    originalPrice: 6290000,
    badge: "Popular",
    rating: 4.9,
    reviewCount: 215,
    stock: 58,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795491625/fanfun_products/ff-prime-pure.jpg",
    description: "Elegant pure white finish brings brightness, freshness, and optimal airflow to bedrooms and home offices.",
    features: [
      "Nature Breeze sleep mode for non-disruptive gentle natural airflow",
      "36W circular eye-care LED panel with uniform illumination",
      "Antibacterial negative ion generator eliminates odors and airborne microbes"
    ],
    specs: {
      motor: "35W DC",
      heatingPower: "Cooling & Air Purification Only (No heating)",
      diameter: "1220 mm (48 inches)",
      roomArea: "15 - 22 m²",
      warranty: "3-year official warranty"
    }
  },
  {
    id: "ff-bedroom-whisper",
    sku: "FAN-SERENITY-CHAMP",
    name: "FANFUN Serenity Silent Bedroom Fan (Matte Champagne)",
    category: "silent-bedroom-fans",
    categoryName: "Silent Bedroom Fans",
    price: 5890000,
    originalPrice: 6790000,
    badge: "Whisper 22dB",
    rating: 4.9,
    reviewCount: 88,
    stock: 42,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795535542/fanfun_products/ff-bedroom-whisper.jpg",
    description: "Engineered specifically for deep restorative sleep with world-record 22dB whisper quiet acoustic tuning and biorhythmic breeze curves.",
    features: [
      "Acoustically tuned sinusoidal wave driver with 22dB silent operation",
      "Circadian rhythm lighting synced with sunrise and sunset",
      "Allergy-grade micro-mesh pre-filter captures pet dander & pollen",
      "Baby sleep mode with temperature drop protection"
    ],
    specs: {
      motor: "32W Sinusoidal DC",
      heatingPower: "Cooling + Deep HEPA Purification",
      airflow: "11,200 m³/h",
      diameter: "1180 mm (46 inches)",
      roomArea: "14 - 22 m²",
      warranty: "5-year motor warranty"
    }
  },

  // 4. Commercial High-Ceiling Fans
  {
    id: "ff-commercial-titan-60",
    sku: "FAN-TITAN-IND-60",
    name: "FANFUN Titan Commercial Heavy-Duty Fan (60\" Industrial BLDC)",
    category: "commercial-fans",
    categoryName: "Commercial High-Ceiling Fans",
    price: 12890000,
    originalPrice: 14500000,
    badge: "Heavy Duty",
    rating: 5.0,
    reviewCount: 31,
    stock: 18,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795535543/fanfun_products/ff-commercial-titan-60.jpg",
    description: "High-volume low-speed (HVLS) commercial fan for luxury villas, duplex penthouses, coffee lounges, and spacious loft studios.",
    features: [
      "Commercial-grade 75W heavy-duty BLDC motor for continuous 24/7 duty",
      "Massive 1520mm (60-inch) extruded aerodynamic alloy blades",
      "Covers expansive spaces up to 75m² with wide-angle air dispersion",
      "Commercial central management protocol via Modbus & Wi-Fi"
    ],
    specs: {
      motor: "75W Industrial BLDC",
      heatingPower: "2200W High-Output PTC",
      airflow: "21,500 m³/h",
      diameter: "1520 mm (60 inches)",
      roomArea: "40 - 75 m²",
      warranty: "5-year commercial warranty"
    }
  },

  // 5. Filters & Purifier Cores
  {
    id: "ff-filter-hepa-h13",
    sku: "ACC-HEPA-H13",
    name: "FANFUN Multi-Layer HEPA H13 Filter (Set of 2)",
    category: "filters-accessories",
    categoryName: "Filters & Purifier Cores",
    price: 490000,
    originalPrice: 650000,
    badge: "Essential Accessory",
    rating: 5.0,
    reviewCount: 342,
    stock: 120,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795491625/fanfun_products/ff-filter-hepa-h13.jpg",
    description: "Medical-grade HEPA H13 replacement filter with activated carbon layer to adsorb odors, formaldehyde, and 99.97% of fine particles down to PM0.3.",
    features: [
      "Certified filtration efficiency for PM2.5 and ultrafine PM0.3 particles",
      "Coconut shell activated carbon layer absorbs volatile chemicals and odors",
      "Recommended replacement cycle: every 6 to 9 months",
      "Magnetic snap-on design: swap out in 10 seconds without tools"
    ],
    specs: {
      material: "Micro-glass fibers & Coconut shell activated carbon",
      standard: "EN 1822:2019 HEPA H13",
      compatibility: "Compatible with all FANFUN 3-in-1 ceiling fans",
      quantity: "Pack of 2 replacement filter units"
    }
  },
  {
    id: "ff-filter-carbon-pure",
    sku: "ACC-VOC-CARBON",
    name: "FANFUN Activated Coconut Carbon VOC Filter Cartridge",
    category: "filters-accessories",
    categoryName: "Filters & Purifier Cores",
    price: 390000,
    originalPrice: 490000,
    badge: "Odor Neutralizer",
    rating: 4.8,
    reviewCount: 96,
    stock: 85,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795535544/fanfun_products/ff-filter-carbon-pure.jpg",
    description: "High-density micro-porous carbon matrix dedicated to neutralizing cooking grease fumes, tobacco smoke, and new-furniture paint odors.",
    features: [
      "99.2% Formaldehyde and benzene reduction within 1 hour",
      "High-surface area coconut shell active granular matrix",
      "Antibacterial silver ion coating prevents mold spores on filter"
    ],
    specs: {
      material: "Steam-activated coconut carbon",
      adsorptionRate: "99.2% VOCs",
      lifespan: "6 - 12 months",
      quantity: "1 Cartridge"
    }
  },

  // 6. Smart Controllers & IoT
  {
    id: "ff-smart-switch-pro",
    sku: "ACC-SWITCH-SMART",
    name: "FANFUN Smart Wall Panel Pro (Touch & Dial Controller)",
    category: "controllers",
    categoryName: "Smart Controllers & IoT",
    price: 790000,
    originalPrice: 950000,
    badge: "Smart Home",
    rating: 4.7,
    reviewCount: 76,
    stock: 60,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795491626/fanfun_products/ff-smart-switch-pro.jpg",
    description: "Scratch-resistant tempered glass panel with real-time temperature, humidity, and AQI display, featuring tactile rotary dial and one-touch scenes.",
    features: [
      "High-contrast OLED display showing real-time AQI, temperature, and humidity",
      "Precision aluminum rotary dial for smooth fan speed and dimming control",
      "Bluetooth Mesh & Zigbee 3.0 ultra-low latency connectivity"
    ],
    specs: {
      standard: "Standard rectangular 120x72mm wall box compatible",
      power: "Direct 220V AC input",
      display: "High-contrast OLED display"
    }
  },
  {
    id: "ff-aqi-sensor-hub",
    sku: "ACC-AIRSENSE-HUB",
    name: "FANFUN AirSense Pro Smart Environmental AQI & Temp Hub",
    category: "controllers",
    categoryName: "Smart Controllers & IoT",
    price: 890000,
    originalPrice: 1100000,
    badge: "AI Automation",
    rating: 4.9,
    reviewCount: 52,
    stock: 40,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795535545/fanfun_products/ff-aqi-sensor-hub.jpg",
    description: "Laser optical PM2.5 particle sensor, Swiss Sensirion temperature/humidity probe, and ambient light analyzer that automatically triggers fan speed.",
    features: [
      "Automatic closed-loop speed regulation based on live room air quality",
      "Laser PM2.5 particle counter with real-time accuracy ±5%",
      "Compatible with Tuya, Matter, Zigbee 3.0 and FANFUN App"
    ],
    specs: {
      sensors: "PM2.5 Laser + Sensirion Temp/Humidity",
      power: "USB-C or 1-year battery life",
      connectivity: "Wi-Fi 2.4GHz + Zigbee 3.0"
    }
  },

  // 7. Blades & Downrod Kits
  {
    id: "ff-downrod-ext-kit",
    sku: "ACC-DOWNROD-90CM",
    name: "FANFUN High-Ceiling Extension Downrod Kit (90cm / Matte Black)",
    category: "accessories-parts",
    categoryName: "Blades & Downrod Kits",
    price: 350000,
    originalPrice: 450000,
    badge: "High Ceiling",
    rating: 4.8,
    reviewCount: 41,
    stock: 75,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795535553/fanfun_products/ff-downrod-ext-kit.jpg",
    description: "Thickened anti-resonance carbon steel downrod with internal wiring harness channel, engineered for ceilings from 3.3m to 4.5m high.",
    features: [
      "Heavy-duty seamless carbon steel pipe with vibration dampening",
      "Pre-routed high-temp silicone cable harness included",
      "Universal ball joint supports sloped ceilings up to 25 degrees"
    ],
    specs: {
      length: "900 mm (Customizable)",
      finish: "Electrostatic Matte Black Coating",
      maxSlope: "25 degrees"
    }
  },

  // 8. Technical Services & Care
  {
    id: "ff-service-install-vip",
    sku: "SRV-INSTALL-CARE",
    name: "VIP Technical Survey & Professional Installation Package",
    category: "services",
    categoryName: "Technical Services & Care",
    price: 0,
    originalPrice: 500000,
    badge: "Free (0 VND)",
    rating: 5.0,
    reviewCount: 520,
    stock: 999,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795491627/fanfun_products/ff-service-install-vip.jpg",
    description: "100% complimentary structural ceiling survey, electrical safety inspection, and precision installation by factory-certified FANFUN technicians.",
    features: [
      "On-site ceiling structure and height assessment by certified engineers",
      "Dust-free drilling equipment to keep your home immaculate",
      "Dynamic blade balancing for whisper-quiet, vibration-free operation",
      "Mobile app pairing, smart home setup, and hands-on feature orientation"
    ],
    specs: {
      location: "Available in Metropolitan Hanoi & Ho Chi Minh City",
      duration: "Completed within 45 - 60 minutes",
      warranty: "1-year on-site installation warranty"
    }
  },
  {
    id: "ff-service-annual-care",
    sku: "SRV-ANNUAL-CARE",
    name: "FANFUN TotalCare Annual Deep Sanitization & Balancing",
    category: "services",
    categoryName: "Technical Services & Care",
    price: 450000,
    originalPrice: 650000,
    badge: "Periodic Care",
    rating: 4.9,
    reviewCount: 168,
    stock: 500,
    status: "active",
    image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795535546/fanfun_products/ff-service-annual-care.jpg",
    description: "Comprehensive in-home maintenance package: ultrasonic blade sanitization, motor bearing lubrication, HEPA compartment sterilization, and digital dynamic re-balancing.",
    features: [
      "Full 12-point electrical and mechanical safety inspection",
      "High-pressure dry steam sterilization of motor housing",
      "Dynamic precision balancing to restore 100% zero-wobble rotation",
      "Complimentary HEPA filter seal replacement"
    ],
    specs: {
      duration: "60 - 90 minutes per unit",
      technician: "Senior FANFUN Certified Engineer",
      warranty: "6-month post-service warranty"
    }
  }
];

const orders = [
  {
    id: "FF-2025-8869",
    customerName: "Nguyen Van An",
    customerPhone: "0912 345 678",
    customerEmail: "nguyenvanan@gmail.com",
    address: "Apt 1806, Landmark 3 Tower, Vinhomes Central Park, 208 Nguyen Huu Canh, Ward 22, Binh Thanh Dist, HCMC",
    status: "processing", // pending, processing, delivering, completed, cancelled
    statusText: "Installation dispatching in progress",
    paymentMethod: "cod",
    paymentStatus: "paid",
    createdAt: "2026-11-14T09:15:00Z",
    scheduledDate: "16/11/2026",
    scheduledSlot: "14:00 - 16:00 (Afternoon)",
    technician: "Tran Quoc Bao (Tech-04 - 0988 123 456)",
    note: "Gypsum ceiling height 2.85m, anchor hook pre-installed. Please bring an aluminum ladder.",
    items: [
      {
        id: "ff-apex-3in1",
        name: "FANFUN Apex 3-in-1 Smart Ceiling Fan (Walnut Wood)",
        sku: "FAN-APEX-WALNUT",
        price: 8490000,
        quantity: 1,
        image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795491622/fanfun_products/ff-apex-3in1.jpg"
      },
      {
        id: "ff-filter-hepa-h13",
        name: "FANFUN Multi-Layer HEPA H13 Filter (Set of 2)",
        sku: "ACC-HEPA-H13",
        price: 490000,
        quantity: 1,
        image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795491625/fanfun_products/ff-filter-hepa-h13.jpg"
      }
    ],
    subtotal: 8980000,
    discount: 500000,
    voucherCode: "FANFUN2026",
    shippingFee: 0,
    total: 8480000
  },
  {
    id: "FF-2025-8854",
    customerName: "Tran Thi Mai Phuong",
    customerPhone: "0908 789 123",
    customerEmail: "phuong.tran@gmail.com",
    address: "No. 45, Street 8, Ciputra Urban Area, Tay Ho, Hanoi",
    status: "completed",
    statusText: "Installation completed",
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    createdAt: "2026-11-10T14:30:00Z",
    scheduledDate: "12/11/2026",
    scheduledSlot: "09:00 - 11:00 (Morning)",
    technician: "Le Hoang Tuan (Tech-01)",
    items: [
      {
        id: "ff-slim-pro",
        name: "FANFUN Slim Pro 3-in-1 Smart Ceiling Fan (Matte Black)",
        sku: "FAN-SLIM-MATTE-BLK",
        price: 6990000,
        quantity: 2,
        image: "https://res.cloudinary.com/dpfy23tda/image/upload/v1795491624/fanfun_products/ff-slim-pro.jpg"
      }
    ],
    subtotal: 13980000,
    discount: 1000000,
    voucherCode: "VIPMEMBER",
    shippingFee: 0,
    total: 12980000
  }
];

const customers = [
  {
    id: "cust-01",
    name: "Nguyen Van An",
    phone: "0912 345 678",
    email: "nguyenvanan@gmail.com",
    tier: "VIP Gold",
    totalOrders: 3,
    totalSpent: 24500000,
    city: "Ho Chi Minh City",
    createdAt: "2026-02-15"
  },
  {
    id: "cust-02",
    name: "Tran Thi Mai Phuong",
    phone: "0908 789 123",
    email: "phuong.tran@gmail.com",
    tier: "Diamond",
    totalOrders: 5,
    totalSpent: 42800000,
    city: "Hanoi",
    createdAt: "2026-01-08"
  },
  {
    id: "cust-03",
    name: "Le Hoang Long",
    phone: "0933 666 888",
    email: "long.le@homedecor.vn",
    tier: "Member",
    totalOrders: 1,
    totalSpent: 8490000,
    city: "Da Nang",
    createdAt: "2026-10-20"
  }
];

const vouchers = [
  {
    code: "FANFUN2026",
    title: "New Generation Launch Promo",
    discountAmount: 500000,
    minOrderValue: 5000000,
    expiryDate: "31/12/2026",
    usageLimit: 100,
    usedCount: 42,
    status: "active"
  },
  {
    code: "VIPMEMBER",
    title: "VIP Member Loyalty Reward",
    discountAmount: 1000000,
    minOrderValue: 10000000,
    expiryDate: "31/12/2026",
    usageLimit: 50,
    usedCount: 18,
    status: "active"
  },
  {
    code: "FREESHIP",
    title: "Free Nationwide Shipping",
    discountAmount: 150000,
    minOrderValue: 1000000,
    expiryDate: "31/12/2026",
    usageLimit: 500,
    usedCount: 189,
    status: "active"
  }
];

module.exports = {
  products,
  categories,
  orders,
  customers,
  vouchers
};
