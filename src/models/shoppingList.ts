import mongoose, { Document, model, Schema } from 'mongoose';

export interface IGroceryItem extends Document {
  input: string;
  quantity: number;
  unit: string;
  name: string;
  section: string;
}

export interface IShoppingList extends Document {
  section: string;
  contents: IGroceryItem[];
}

const groceryItemSchema = new Schema(
  {
    input: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    name: { type: String, required: true },
    section: { type: String, required: true },
  },
  { _id: false }
);

const shoppingListSchema = new Schema({
  //@ts-ignore
  userID: { type: mongoose.ObjectId, required: true },
  section: { type: String, required: true },
  contents: { type: groceryItemSchema, required: true },
});

export default model<IShoppingList>('ShoppingList', shoppingListSchema);
