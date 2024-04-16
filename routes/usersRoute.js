import express from "express";
import { Forgotpass } from "../controllers/usersController.js";
import { isAdmin, requireSignup } from "../middlewares/authMiddleware.js";
import {
  getAllUsers,
  getalladdress,
  setDefaultadrs,
  updateuseraddress,
  deleteuseraddress,
  updateUserOrdersno,
  getUserById,
  updateUsername,
  useraddress,
  UpdatePass
} from "../controllers/usersController.js";
import { categoryControlller } from "../controllers/categoryController.js";


const router = express.Router();






// User Routes ----------------------------------

router.get("/get-user/:id", requireSignup, getUserById);

router.post("/update-username/:id", requireSignup, updateUsername);

router.post("/update-pass/:id", requireSignup, UpdatePass);

router.post("/forgot-pass/:email", Forgotpass);

router.post(
  "/update-user/:id",
  requireSignup, useraddress

);

router.put(
  "/update-user-adrs/:id",
  requireSignup, updateuseraddress

);

router.get("/get-category", categoryControlller);


router.put(
  "/user_ordersno/:id",
  requireSignup, updateUserOrdersno

);

router.post(
  "/delete-user-adrs/:id",
  requireSignup, deleteuseraddress

);

// //get single products
router.get("/getall-address/:id", requireSignup, getalladdress);

router.post(
  "/user-def-adres/:id",
  requireSignup, setDefaultadrs

);


// Admin Routes ---------------------------------
//get all Users
router.get("/getall-users", requireSignup,
  isAdmin, getAllUsers);






// //get single product Page
// router.get("/product-page/:id", getSingleProduct);

// // //delete product
// router.delete("/delete-product/:id", requireSignup,
//   isAdmin, deleteproduct);






export default router;