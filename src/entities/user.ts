// This is the user entity, which defines the schema for the user collection in MongoDB.
// It has three fields: username, email, and password.
// The timestamps option is set to true, which means that createdAt and updatedAt fields will be automatically added to each document.
import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>('user', schema);