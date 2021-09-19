import { Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  todos: Array<string>;
  gratitudes: Array<string>;
  productivityMode: boolean;
}