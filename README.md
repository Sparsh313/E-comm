# 🛒 E-Commerce Backend API (Node.js + Express + MongoDB)

This is the backend for an e-commerce platform built using Node.js, Express, MongoDB (with Mongoose), and Cloudinary for image storage. It follows an **MVC structure** and supports features like user authentication, product management, cart, wishlist, and orders.

---

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer + Cloudinary
- **Architecture:** MVC (Model-View-Controller)

---

## 📁 Project Structure

server/
├── config/ # DB configuration
├── controllers/ # All controller logic
├── middleware/ # Auth, upload, etc.
├── models/ # Mongoose models
├── routes/ # API route handlers
├── utils/ # Cloudinary config
├── .env # Environment variables
├── index.js # Entry point
└── package.json

---

## 🚀 Features

### 🔐 Authentication (JWT)
- `POST /api/auth/register` – Register (buyer or seller)
- `POST /api/auth/login` – Login and get JWT
- `POST /api/auth/logout` – Optional dummy logout

### 🛍️ Product Management (Seller only)
- `POST /api/products` – Create product with image upload (Cloudinary)
- `GET /api/products` – Public list with filters (category, size, price)
- `GET /api/products/:id` – Product details
- `PUT /api/products/:id` – Edit product (image optional)
- `DELETE /api/products/:id` – Delete product

### 🛒 Cart (Buyer only)
- `POST /api/cart` – Add to cart
- `GET /api/cart` – View cart
- `PUT /api/cart` – Update quantity
- `DELETE /api/cart/:productId` – Remove product
- `DELETE /api/cart` – Clear cart

### 💖 Wishlist (Buyer only)
- `POST /api/wishlist` – Add product
- `GET /api/wishlist` – View wishlist
- `DELETE /api/wishlist/:productId` – Remove product

### 📦 Orders
- `POST /api/orders/user` – Place order (from cart)
- `GET /api/orders/user` – View user orders
- `PUT /api/orders/:orderId/status` – Seller updates status (`pending`, `paid`, `shipped`, `delivered`)

---

## 🖼️ Image Upload (Cloudinary)

- Handled using **Multer + Cloudinary**.
- Accepts images from local uploads (frontend file input).
- Stores product images in `ecommerce-products` folder on Cloudinary.

---

## 🧪 Setup & Run Locally

### 1. Clone Repository
git clone https://github.com/Sparsh313/E-comm.git
cd E-comm/backend

### 2. Install Dependencies
npm install

### 3. Create .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

### 4. Run Server
npm run server

---


## 🛠️ Testing API
Use Postman or Thunder Client to test endpoints.
Make sure to include the JWT token in headers for protected routes:
Authorization: Bearer <your_token_here>

## 📌 Roles Supported
Role	Permissions
Buyer	Browse products, cart, wishlist, place orders
Seller	Add/edit/delete products, update order status

## ✅ Future Enhancements
 Razorpay/Stripe integration for payments

 Admin dashboard & analytics

 Email confirmation (Nodemailer)

 PDF invoice generation

 Rate & review system

## 📜 License
This project is for internship/demo purposes only.

## 🙌 Author & Contributors
Backend: Sparsh singh
Frontend: 
