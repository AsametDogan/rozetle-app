import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces";

const UserSchema: Schema<IUser> = new Schema({
    nickName: { type: String, required: false },
    name: { type: String, required: false },
    surname: { type: String, required: false },
    email: [{ type: String, required: true }],
    phone: { type: String, required: false },
    password: { type: String, required: false },
    profileImg: { type: String, required: false },
    role: { type: Number, required: true, default: 0 },
    createdDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;