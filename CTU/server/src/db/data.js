const products = [
  {
    id: "ff-apex-3in1",
    sku: "FAN-APEX-WALNUT",
    name: "Quạt trần thông minh FANFUN Apex 3-in-1 (Gỗ Óc Chó)",
    category: "quat-tran-thong-minh",
    categoryName: "Quạt trần 3-in-1",
    price: 8490000,
    originalPrice: 9990000,
    badge: "Bán chạy nhất",
    rating: 4.9,
    reviewCount: 128,
    stock: 45,
    status: "active",
    image: "https://lh3.googleusercontent.com/aida/ALJJyrAsiZaWI3R7fdCjyGjiRWTZQ1e93xWc9QEQ47Zoy5hlGrO487ZHGdDMX2aQ0wD7YzCYOCNLCFrqPdwQ0MLrStB0NPn5sMzLdCxDMm2Pk3lR-7tbMu82gpklcYK64RytVb-FuLsjBQWNBSKuaUWgCPkz476kJTVUy-zRk7Q0u5JIDP84IJAtan0RrqIA3D4tEt_nw_LetO36wFGsn5vQAcoedK_XrCLgOuw2GiKwd-Ve",
    description: "Giải pháp vi khí hậu cao cấp cho phòng khách hiện đại. Động cơ BLDC biến tần siêu êm 28dB kết hợp sưởi gốm PTC dịu ấm và màng lọc không khí HEPA H13 ion âm.",
    features: [
      "Động cơ Inverter BLDC 45W siêu êm, độ ồn chỉ 28dB",
      "Hệ thống sưởi gốm PTC 1500W ấm áp tức thì trong 3 giây",
      "Màng lọc HEPA H13 chuẩn y tế lọc 99.97% bụi mịn PM2.5",
      "Điều khiển thông minh qua Wi-Fi / App FANFUN tiếng Việt & Giọng nói",
      "Đèn LED đổi màu 3 chế độ (Vàng 3000K, Trung tính 4000K, Trắng 6500K)",
      "Cánh quạt gỗ óc chó tự nhiên gia công CNC chống ẩm mốc"
    ],
    specs: {
      motor: "BLDC Không chổi than 45W",
      heatingPower: "PTC 1500W điều chỉnh 2 mức",
      airflow: "14.200 m³/h (9 cấp độ gió)",
      airPurification: "Màng lọc HEPA H13 + Ion âm Plasma",
      diameter: "1320 mm (52 inches)",
      roomArea: "20 - 35 m²",
      control: "Remote RF + Ứng dụng điện thoại + Phím cảm ứng",
      warranty: "5 năm động cơ, 2 năm linh kiện điện tử"
    }
  },
  {
    id: "ff-slim-pro",
    sku: "FAN-SLIM-MATTE-BLK",
    name: "Quạt trần thông minh FANFUN Slim Pro 3-in-1 (Đen Nhám)",
    category: "quat-tran-thong-minh",
    categoryName: "Quạt trần 3-in-1",
    price: 6990000,
    originalPrice: 7990000,
    badge: "Mới ra mắt",
    rating: 4.8,
    reviewCount: 94,
    stock: 32,
    status: "active",
    image: "https://lh3.googleusercontent.com/aida/ALJJyrB0wwFdJfb0F8Q2Hkb_jSxnHEyKt2AIhbhhp4WeY9jduzK_Dd4KI71dSPoS61F6bxRxPWe8sHfFwlIxb-JpToH6u6H914IOGKaVN0JttIyQHt1OIIjUozfZNCS0C041fu7J2E-3Zy88bve3Ox6y3Q5TrpaleQUGrXrthWLVv38FO8p5rUhM3vdMp9RQIpkySOmdHmGw5_fKgPvrtGM5ZAHptKuwpgvSU-oZKqqhHEQ",
    description: "Thiết kế mỏng nhẹ tối giản phong cách Bắc Âu Scandinavian. Phù hợp cho chung cư trần thấp từ 2m6 đến 3m.",
    features: [
      "Thiết kế Ultra-slim sát trần chuyên dụng cho chung cư",
      "Động cơ DC 38W tiết kiệm 70% điện năng",
      "Sưởi PTC 1200W chống khô da và nghẹt mũi",
      "Màng lọc HEPA kép thay thế nhanh từ tính",
      "Cảm biến nhiệt độ và độ ẩm phòng tự động điều chỉnh tốc độ"
    ],
    specs: {
      motor: "DC Inverter 38W",
      heatingPower: "PTC 1200W",
      airflow: "11.800 m³/h (6 cấp độ)",
      diameter: "1120 mm (44 inches)",
      roomArea: "15 - 25 m²",
      warranty: "5 năm chính hãng"
    }
  },
  {
    id: "ff-prime-pure",
    sku: "FAN-PRIME-WHITE",
    name: "Quạt trần thông minh FANFUN Prime Air (Trắng Tinh Khôi)",
    category: "quat-tran-thong-minh",
    categoryName: "Quạt trần 3-in-1",
    price: 5490000,
    originalPrice: 6290000,
    badge: "Ưa chuộng",
    rating: 4.9,
    reviewCount: 215,
    stock: 58,
    status: "active",
    image: "https://lh3.googleusercontent.com/aida/ALJJyrCU1cBG4iIlx_A45-0six5VG14hnS5BDQGzFCcn_yPRliaA7hjf33mrg_Xmr4d3iy8qQJ3FMqdGDSBNVPzp1vyn1Fn84DWgCD6kzDAwBRw79dnyEYqjJrW5r9yTfFcn9dNL4Is9lVAIkLIfKtYCAB8qt8QYj1jLK_NzO3iyEZjQ7GJjNO_lgBYBuw-hAEQu5lDa70fziTR7iZSRm95XE8F4t8o4-iCeKzeivElzDs9QAVbjw2GtnASM7qg",
    description: "Màu trắng tinh khôi thanh thoát mang lại ánh sáng và sự thông thoáng cho không gian phòng ngủ & phòng làm việc.",
    features: [
      "Chế độ gió ngủ tự nhiên Nature Breeze không gây bạt hơi",
      "Đèn LED tròn 36W chiếu sáng đồng đều, bảo vệ mắt",
      "Bộ phát ion âm kháng khuẩn và khử mùi thức ăn"
    ],
    specs: {
      motor: "DC 35W",
      heatingPower: "Không tích hợp sưởi (Làm mát + Lọc khí)",
      diameter: "1220 mm (48 inches)",
      roomArea: "15 - 22 m²",
      warranty: "3 năm chính hãng"
    }
  },
  {
    id: "ff-filter-hepa-h13",
    sku: "ACC-HEPA-H13",
    name: "Lõi lọc HEPA H13 đa tầng chính hãng FANFUN (Set 2 lõi)",
    category: "loi-loc-phu-kien",
    categoryName: "Lõi lọc & Phụ kiện",
    price: 490000,
    originalPrice: 650000,
    badge: "Phụ kiện thiết yếu",
    rating: 5.0,
    reviewCount: 342,
    stock: 120,
    status: "active",
    image: "https://lh3.googleusercontent.com/aida/ALJJyrD_ae_lLPYjMCZY4HnpQLZUiTWqZ4f7Q3Hp5CGxa9PgWIdPi4kO6fM-OxuvnVpWYAg5-UyoEc3zOsSlyawbN9cnoP5bp_f9e8YqUvfEgMn71i9skHxLwhMWJBRPyUvuwOOXBpNW78I_cwAl8h0xnsmDQX7edKmwfLwMaw36fDGK-XYbSNikSfD7rGEo2hSgknSrD2BaXTviAqt2MfTn99RZO9boW3SIYjKcii6V4CUtDnAT6NxSN_M1gdM6",
    description: "Bộ lõi lọc HEPA H13 chuẩn y tế cùng lớp than hoạt tính carbon khử mùi thuốc lá, ẩm mốc, lọc sạch 99.97% bụi mịn PM0.3.",
    features: [
      "Hiệu quả lọc bụi siêu mịn PM2.5 và PM0.3",
      "Lớp than hoạt tính hấp phụ formaldehyde và mùi hôi",
      "Thời gian sử dụng khuyến nghị: 6 - 9 tháng/lần",
      "Tháo lắp từ tính chỉ trong 10 giây không cần dụng cụ"
    ],
    specs: {
      material: "Sợi thủy tinh vi mô & Than gáo dừa hoạt tính",
      standard: "EN 1822:2019 HEPA H13",
      compatibility: "Tương thích tất cả dòng quạt FANFUN 3-in-1",
      quantity: "Hộp 2 lõi lọc"
    }
  },
  {
    id: "ff-smart-switch-pro",
    sku: "ACC-SWITCH-SMART",
    name: "Bộ điều khiển công tắc gắn tường cảm ứng thông minh FANFUN Panel Pro",
    category: "thiet-bi-dieu-khien",
    categoryName: "Điều khiển & IoT",
    price: 790000,
    originalPrice: 950000,
    badge: "Smart Home",
    rating: 4.7,
    reviewCount: 76,
    stock: 60,
    status: "active",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLss_XQmKSwXFsCqf4f6ORjcyoqxDVIQfVA0hmjVJKT5MzPMPfq6Gdot7z1Xk3IvpLP8gXhwIzQiMPSmIeFKuG02JqzA29WXGzzBglx-f2zGzXhtMlvsZyhO9qtKDxEVvPZalxoyUYBZ9Rsru2INp0lFdR1mkoIk_jT09V-sX3BGiS38_vRcFWHmaXfAZ8pWGzCJt7gpOyXjX_sXEr4fslL9JP_Kptn9VTR9XiSVywqL1Ur6y54n2zOnh_GE",
    description: "Mặt kính cường lực chống trầy, hiển thị nhiệt độ phòng, chất lượng không khí AQI và các nấc điều khiển trực quan bằng một chạm.",
    features: [
      "Màn hình OLED hiển thị AQI, nhiệt độ và độ ẩm thời gian thực",
      "Vòng xoay kim loại điều chỉnh tốc độ gió và độ sáng tinh tế",
      "Kết nối Bluetooth Mesh & Zigbee 3.0 độ trễ cực thấp"
    ],
    specs: {
      standard: "Kích thước chuẩn hộp âm tường chữ nhật 120x72mm",
      power: "220V AC trực tiếp",
      display: "OLED hiển thị sắc nét"
    }
  },
  {
    id: "ff-service-install-vip",
    sku: "SRV-INSTALL-CARE",
    name: "Gói Dịch Vụ Khảo Sát Kỹ Thuật & Lắp Đặt Tiêu Chuẩn VIP",
    category: "dich-vu-ky-thuat",
    categoryName: "Dịch vụ kỹ thuật",
    price: 0,
    originalPrice: 500000,
    badge: "Ưu đãi 0đ",
    rating: 5.0,
    reviewCount: 520,
    stock: 999,
    status: "active",
    image: "https://lh3.googleusercontent.com/aida/ALJJyrBUZMO4VBBEoLspC16-XzzTMZNlxfcbpLUGP0FC-ePUizXWudxNo5FwBiu66nbegpIZTAMQYsq1Fu3zeiA_1Nx5VNCg-n7PFyJOIYnyrVnjlG2uEnkKjbTOnFmVmrk3Yzbt43lwGoMZtt4n_n67qwcfd9os7fwXyqmkxDJPeywnSVPvgZd_SF1RUbuHVuxXW2XSmD8-0vJHE3uECdjKFylVVUCQr9_l3gNKCgGy2hIZeGn5nsgX7ZrBew",
    description: "Miễn phí 100% chi phí khảo sát kết cấu trần nhà, kiểm tra nguồn điện và lắp đặt hoàn thiện bởi đội ngũ kỹ thuật viên chứng chỉ chính hãng.",
    features: [
      "Kỹ thuật viên đến tận nhà khảo sát và đo đạc độ cao trần",
      "Dụng cụ chuyên dụng hút bụi khi khoan trần, giữ sạch nhà",
      "Cân chỉnh cánh động lực học không rung lắc, không ồn",
      "Hướng dẫn sử dụng và cài đặt ứng dụng FANFUN trên điện thoại"
    ],
    specs: {
      location: "Áp dụng tại Nội thành Hà Nội & TP. Hồ Chí Minh",
      duration: "Hoàn thành trong 45 - 60 phút",
      warranty: "Bảo hành lắp đặt 1 năm tận nơi"
    }
  }
];

const categories = [
  { id: "all", name: "Tất cả thiết bị", count: 8, icon: "apps" },
  { id: "quat-tran-thong-minh", name: "Quạt trần 3-in-1", count: 3, icon: "mode_fan" },
  { id: "loi-loc-phu-kien", name: "Lõi lọc & Phụ kiện", count: 2, icon: "filter_alt" },
  { id: "thiet-bi-dieu-khien", name: "Điều khiển & IoT", count: 2, icon: "sensors" },
  { id: "dich-vu-ky-thuat", name: "Dịch vụ kỹ thuật", count: 1, icon: "home_repair_service" }
];

const orders = [
  {
    id: "FF-2025-8869",
    customerName: "Nguyễn Văn An",
    customerPhone: "0912 345 678",
    customerEmail: "nguyenvanan@gmail.com",
    address: "Căn hộ 1806, Tòa Landmark 3, Vinhomes Central Park, 208 Nguyễn Hữu Cảnh, P. 22, Q. Bình Thạnh, TP.HCM",
    status: "processing", // pending, processing, delivering, completed, cancelled
    statusText: "Đang điều phối lắp đặt",
    paymentMethod: "cod",
    paymentStatus: "paid",
    createdAt: "2026-11-14T09:15:00Z",
    scheduledDate: "16/11/2026",
    scheduledSlot: "14:00 - 16:00 (Buổi chiều)",
    technician: "Trần Quốc Bảo (KT-04 - 0988 123 456)",
    note: "Trần thạch cao cao 2m85, có sẵn móc treo chờ. Cần kỹ thuật viên đem theo thang nhôm.",
    items: [
      {
        id: "ff-apex-3in1",
        name: "Quạt trần thông minh FANFUN Apex 3-in-1 (Gỗ Óc Chó)",
        sku: "FAN-APEX-WALNUT",
        price: 8490000,
        quantity: 1,
        image: "https://lh3.googleusercontent.com/aida/ALJJyrAsiZaWI3R7fdCjyGjiRWTZQ1e93xWc9QEQ47Zoy5hlGrO487ZHGdDMX2aQ0wD7YzCYOCNLCFrqPdwQ0MLrStB0NPn5sMzLdCxDMm2Pk3lR-7tbMu82gpklcYK64RytVb-FuLsjBQWNBSKuaUWgCPkz476kJTVUy-zRk7Q0u5JIDP84IJAtan0RrqIA3D4tEt_nw_LetO36wFGsn5vQAcoedK_XrCLgOuw2GiKwd-Ve"
      },
      {
        id: "ff-filter-hepa-h13",
        name: "Lõi lọc HEPA H13 đa tầng chính hãng FANFUN (Set 2 lõi)",
        sku: "ACC-HEPA-H13",
        price: 490000,
        quantity: 1,
        image: "https://lh3.googleusercontent.com/aida/ALJJyrD_ae_lLPYjMCZY4HnpQLZUiTWqZ4f7Q3Hp5CGxa9PgWIdPi4kO6fM-OxuvnVpWYAg5-UyoEc3zOsSlyawbN9cnoP5bp_f9e8YqUvfEgMn71i9skHxLwhMWJBRPyUvuwOOXBpNW78I_cwAl8h0xnsmDQX7edKmwfLwMaw36fDGK-XYbSNikSfD7rGEo2hSgknSrD2BaXTviAqt2MfTn99RZO9boW3SIYjKcii6V4CUtDnAT6NxSN_M1gdM6"
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
    customerName: "Trần Thị Mai Phương",
    customerPhone: "0908 789 123",
    customerEmail: "phuong.tran@gmail.com",
    address: "Số 45 Đường số 8, KĐT Ciputra, Tây Hồ, Hà Nội",
    status: "completed",
    statusText: "Đã hoàn thành lắp đặt",
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    createdAt: "2026-11-10T14:30:00Z",
    scheduledDate: "12/11/2026",
    scheduledSlot: "09:00 - 11:00",
    technician: "Lê Hoàng Tuấn (KT-01)",
    items: [
      {
        id: "ff-slim-pro",
        name: "Quạt trần thông minh FANFUN Slim Pro 3-in-1 (Đen Nhám)",
        sku: "FAN-SLIM-MATTE-BLK",
        price: 6990000,
        quantity: 2,
        image: "https://lh3.googleusercontent.com/aida/ALJJyrB0wwFdJfb0F8Q2Hkb_jSxnHEyKt2AIhbhhp4WeY9jduzK_Dd4KI71dSPoS61F6bxRxPWe8sHfFwlIxb-JpToH6u6H914IOGKaVN0JttIyQHt1OIIjUozfZNCS0C041fu7J2E-3Zy88bve3Ox6y3Q5TrpaleQUGrXrthWLVv38FO8p5rUhM3vdMp9RQIpkySOmdHmGw5_fKgPvrtGM5ZAHptKuwpgvSU-oZKqqhHEQ"
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
    name: "Nguyễn Văn An",
    phone: "0912 345 678",
    email: "nguyenvanan@gmail.com",
    tier: "VIP Gold",
    totalOrders: 3,
    totalSpent: 24500000,
    city: "TP. Hồ Chí Minh",
    createdAt: "2026-02-15"
  },
  {
    id: "cust-02",
    name: "Trần Thị Mai Phương",
    phone: "0908 789 123",
    email: "phuong.tran@gmail.com",
    tier: "Diamond",
    totalOrders: 5,
    totalSpent: 42800000,
    city: "Hà Nội",
    createdAt: "2026-01-08"
  },
  {
    id: "cust-03",
    name: "Lê Hoàng Long",
    phone: "0933 666 888",
    email: "long.le@homedecor.vn",
    tier: "Member",
    totalOrders: 1,
    totalSpent: 8490000,
    city: "Đà Nẵng",
    createdAt: "2026-10-20"
  }
];

const vouchers = [
  {
    code: "FANFUN2026",
    title: "Ưu đãi mở bán thế hệ mới",
    discountAmount: 500000,
    minOrderValue: 5000000,
    expiryDate: "31/12/2026",
    usageLimit: 100,
    usedCount: 42,
    status: "active"
  },
  {
    code: "VIPMEMBER",
    title: "Tri ân thành viên VIP",
    discountAmount: 1000000,
    minOrderValue: 10000000,
    expiryDate: "31/12/2026",
    usageLimit: 50,
    usedCount: 18,
    status: "active"
  },
  {
    code: "FREESHIP",
    title: "Miễn phí vận chuyển toàn quốc",
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
