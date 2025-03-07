import { Router } from "express";
import {
  addItem,
  removeItem,
  getItems,
  updateItem,
} from "../controllers/shoppingCartController";

const router = Router();

router.post("/add", addItem);
router.delete("/remove/:id", removeItem);
router.get("/", getItems);
router.put("/update/:id", updateItem);

export default router;
