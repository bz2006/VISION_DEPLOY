import express from "express";
import multer from "multer";
import {
  createProductController, deleteproduct, getSingleProduct, getAllProducts, updateProducts, storage,getProducts
} from "../controllers/productController.js";
import { isAdmin, requireSignup } from "../middlewares/authMiddleware.js";
const upload = multer({ storage })

const router = express.Router();






//routes
router.post(
  "/create-product", requireSignup,
  isAdmin, upload.array('images'), createProductController

);
//routes
router.put(
  "/update-product/:id",
  requireSignup,
  isAdmin, upload.array("images"),
  updateProducts

);

//get all products
router.get("/getall-product", requireSignup,
  isAdmin, getAllProducts);

//get all products for shopPage
router.get("/shop-products", getAllProducts);

router.get("/cat-products/:id", getProducts);


//get single products
router.get("/getsingle-product/:id", requireSignup,
  isAdmin, getSingleProduct);

//get single product Page
router.get("/product-page/:id", getSingleProduct);

// //delete product
router.delete("/delete-product/:id", requireSignup,
  isAdmin, deleteproduct);

export default router;