import mongoose, { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  loggedIn: boolean;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  loggedIn: { type: Boolean, required: true, default: false },
});

export default model<IUser>('User', userSchema);
