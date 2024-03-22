import express from "express";
import { isAdmin, requireSignup } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSignup,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignup,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category",  requireSignup,
isAdmin,categoryControlller);

//single category


//delete category
router.delete(
  "/delete-category/:id",
  requireSignup,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;