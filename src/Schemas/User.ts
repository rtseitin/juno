import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/User';

const UserSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true},
  todos: { type: Array, required: true },
  gratitudes: { type: Array, required: true },
  productivityMode: { type: Boolean, required: true }
}, {
  timestamps: true
});

export default model<IUser>('User', UserSchema);