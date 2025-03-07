import { Schema, model, Document } from "mongoose";

interface IShoppingCartItem extends Document {
  id: number;
  title: string;
  description: string;
  price: string;
  quantity: number;
  image: string;
}

const ShoppingCartItemSchema = new Schema<IShoppingCartItem>({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
});

const ShoppingCartItem = model<IShoppingCartItem>(
  "ShoppingCartItem",
  ShoppingCartItemSchema
);

export default ShoppingCartItem;
