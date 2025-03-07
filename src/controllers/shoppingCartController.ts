import { Request, Response, NextFunction, RequestHandler } from "express";
import ShoppingCartItem from "../models/ShoppingCartItem";

export const addItem: RequestHandler = async (req, res, next) => {
  try {
    let { id, title, description, price, quantity, image } = req.body;
    console.log("Received add item request:", req.body);
    if (price.includes("mil")) {
      price = price.replace("mil", "");
      price = parseFloat(price) * 1000000;
      price = price.toString();
    }
    const newItem = new ShoppingCartItem({
      id,
      title,
      description,
      price,
      quantity,
      image,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error adding item:", error);
    next(error);
  }
};

export const removeItem: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedItem = await ShoppingCartItem.findOneAndDelete({ id });
    if (!deletedItem) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getItems: RequestHandler = async (req, res, next) => {
  try {
    const items = await ShoppingCartItem.find();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};
// New function to update an item
export const updateItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedItem = await ShoppingCartItem.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );
    if (!updatedItem) {
      res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
};
