import mongoose from "mongoose";

export interface User {
  username: string;
  password: string; // hashed
}

const UserSchema = new mongoose.Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const UserModel = mongoose.model<User>("User", UserSchema);
