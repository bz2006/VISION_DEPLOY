import express from "express";
import multer from "multer";
import { useraddress } from "../controllers/usersController.js";
import { isAdmin, requireSignup } from "../middlewares/authMiddleware.js";
import { getAllUsers,getalladdress, setDefaultadrs,updateuseraddress,deleteuseraddress} from "../controllers/usersController.js";
// const upload = multer({ storage })

const router = express.Router();






// User Routes ----------------------------------

router.post(
  "/update-user/:id",
  requireSignup,useraddress

);

router.put(
  "/update-user-adrs/:id",
  requireSignup,updateuseraddress

);

router.post(
  "/delete-user-adrs/:id",
  requireSignup,deleteuseraddress

);

// //get single products
router.get("/getall-address/:id", requireSignup, getalladdress);

router.post(
  "/user-def-adres/:id",
  requireSignup,setDefaultadrs

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