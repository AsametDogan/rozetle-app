import mongoose, { Schema } from "mongoose";
import { INotifyToken } from "../interfaces";

const NotifyTokenSchema: Schema<INotifyToken> = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    firebaseToken: { type: String, required: true }
});

const NotifyTokenModel = mongoose.model<INotifyToken>('NotifyToken', NotifyTokenSchema);

export default NotifyTokenModel;