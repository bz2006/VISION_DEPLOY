import express from "express";
import { createOrder,getOrdersByUserId ,getallOrders,getOrdersByorderId,updatestatus} from "../controllers/orderController.js";
import { isAdmin, requireSignup } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post(
    "/create-order",
    requireSignup,createOrder
  
  );


  router.get(
    "/get-orders/:id",
    requireSignup,getOrdersByUserId
  
  );

  router.get(
    "/get-allorders",
    requireSignup,isAdmin,getallOrders
  
  );

  router.get(
    "/order/:id",
    requireSignup,isAdmin,getOrdersByorderId
  
  );

  router.post(
    "/update-status/:id",
    requireSignup,isAdmin,updatestatus
  
  );

  export default router;