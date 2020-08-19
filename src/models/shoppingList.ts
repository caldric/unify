import mongoose, { Document, model, Schema } from 'mongoose';

export interface IGroceryItem extends Document {
  input: string;
  quantity: number;
  unit: string;
  name: string;
  section: string;
}

export interface IGroceryOutput extends Document {
  section: string;
  contents: IGroceryItem[];
}

export interface IShoppingList extends Document {
  items: IGroceryOutput[];
}

const groceryItemSchema: Schema<IGroceryItem> = new Schema(
  {
    input: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    name: { type: String, required: true },
    section: { type: String, required: true },
  },
  { _id: false }
);

const groceryOutputSchema: Schema<IGroceryOutput> = new Schema(
  {
    section: { type: String, required: true },
    contents: { type: [groceryItemSchema], required: true },
  },
  { _id: false }
);

const shoppingListSchema: Schema<IShoppingList> = new Schema({
  //@ts-ignore
  userID: { type: mongoose.ObjectId, required: true, unique: true },
  items: { type: [groceryOutputSchema], required: true },
});

export default model<IShoppingList>('ShoppingList', shoppingListSchema);
