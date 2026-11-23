# 🌀 FANFUN Smart Living — Quạt Trần Thông Minh 3-in-1 (Fullstack Web)

Hệ thống Website Thương mại điện tử & Cổng Quản trị Admin chuyên biệt cho thiết bị vi khí hậu thông minh **FANFUN (3-in-1: Làm mát • Sưởi gốm PTC • Lọc khí HEPA H13)**. Dự án được đồng bộ nguyên bản từ thiết kế trên **Google Stitch**.

---

## 🏗️ Cấu Trúc Dự Án

```
d:\Project\CTU\
├── stitch_raw\                 # 20 màn hình HTML + Screenshot + Metadata tải từ Google Stitch
├── server\                     # Backend REST API (Node.js + Express)
│   ├── src\
│   │   ├── db\data.js          # Dữ liệu sản phẩm, danh mục, đơn hàng, voucher, khách hàng
│   │   └── server.js           # Server Express REST APIs (Port 5000)
│   └── package.json
├── client\                     # Frontend SPA (React 18 + Vite + Tailwind CSS)
│   ├── src\
│   │   ├── components\         # Header, Footer, StoreLayout, AdminLayout
│   │   ├── context\            # CartContext (Giỏ hàng, Voucher), AuthContext (User & Admin)
│   │   ├── pages\              # Toàn bộ 19 trang giao diện người dùng và quản trị
│   │   │   ├── Home.jsx                    # Trang chủ Hero & Giới thiệu công nghệ 3-in-1
│   │   │   ├── Products.jsx                # Danh mục sản phẩm & Hệ sinh thái (Bộ lọc)
│   │   │   ├── ProductDetail.jsx           # Chi tiết sản phẩm & Thông số kỹ thuật
│   │   │   ├── Cart.jsx                    # Giỏ hàng & Áp dụng voucher
│   │   │   ├── Checkout.jsx                # Đặt lịch khảo sát trần nhà & Thanh toán
│   │   │   ├── OrderSuccess.jsx            # Xác nhận đơn hàng & Tiến trình kỹ thuật
│   │   │   ├── MyOrders.jsx                # Quản lý & tra cứu đơn hàng của tôi
│   │   │   ├── OrderDetail.jsx             # Chi tiết đơn hàng & Lịch hẹn kỹ thuật viên
│   │   │   ├── Profile.jsx                 # Hồ sơ thành viên & Căn hộ kết nối
│   │   │   ├── ChangePassword.jsx          # Đổi mật khẩu
│   │   │   ├── Login.jsx & Register.jsx    # Đăng nhập & Đăng ký
│   │   │   └── admin\                      # Cổng Quản Trị Viên (Admin Portal)
│   │   │       ├── AdminDashboard.jsx      # Bảng điều khiển KPI & Doanh thu
│   │   │       ├── AdminProducts.jsx       # Quản lý kho sản phẩm & Tồn kho
│   │   │       ├── AdminProductForm.jsx    # Thêm mới / Chỉnh sửa sản phẩm
│   │   │       ├── AdminCategories.jsx     # Quản lý danh mục thiết bị
│   │   │       ├── AdminOrders.jsx         # Quản lý & điều phối đơn thi công
│   │   │       ├── AdminOrderDetail.jsx    # Chi tiết đơn & Phân bổ thợ lắp đặt
│   │   │       ├── AdminCustomers.jsx      # Danh sách khách hàng thân thiết VIP
│   │   │       └── AdminVouchers.jsx       # Quản lý voucher & Khuyến mãi
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js      # Hệ màu & Typography chuẩn từ Stitch Design Tokens
│   └── vite.config.js
├── start-all.js                # Script chạy đồng thời cả Server và Client
├── package.json
└── README.md
```

---

## 🚀 Hướng Dẫn Khởi Động

### Cách 1: Khởi động cả Frontend & Backend cùng lúc (Khuyên dùng)
Tại thư mục gốc `d:\Project\CTU`:
```bash
npm run dev
# hoặc
npm start
```
- **Storefront (Khách mua hàng):** `http://localhost:3000`
- **Admin Portal (Quản trị viên):** `http://localhost:3000/admin`
- **Backend REST API:** `http://localhost:5000/api`

---

### Cách 2: Chạy riêng lẻ từng phần

#### 1. Khởi động Backend (Port 5000):
```bash
cd d:\Project\CTU\server
npm start
```

#### 2. Khởi động Frontend (Port 3000):
```bash
cd d:\Project\CTU\client
npm run dev
```

---

## 🎨 Design Tokens (Hệ Màu Stitch)
- **Primary:** `#9c3f11` (Cam đất Terracotta ấm áp đặc trưng)
- **Primary Container:** `#bc5728`
- **Surface:** `#fff8f2` (Nền màu kem ấm dịu mắt)
- **Typography:** `Be Vietnam Pro` (100% tiếng Việt chuẩn nét)
- **Iconography:** Google `Material Symbols Outlined`
