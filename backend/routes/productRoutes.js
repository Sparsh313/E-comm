// ecommerce-backend/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, authorizeRole } = require("../middlewares/authMiddleware");

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Private routes (seller only)
router.post("/", protect, authorizeRole("seller"), createProduct);
router.put("/:id", protect, authorizeRole("seller"), updateProduct);
router.delete("/:id", protect, authorizeRole("seller"), deleteProduct);

module.exports   = router;
