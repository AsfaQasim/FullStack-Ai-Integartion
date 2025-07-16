import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true, 
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifycode: string;
  verifycodeExpiry: Date;
  isVerify: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/\w+@\w+\.\w+/, "please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifycode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifycodeExpiry: {
    type: Date,
    required: [true, "Verify code expiry is required"],
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});


const UserModel =  (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema)
export default UserModel