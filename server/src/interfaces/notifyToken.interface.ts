import { Types } from "mongoose";

export default interface INotifyToken extends Document {
    userId: Types.ObjectId
    firebaseToken: string
}