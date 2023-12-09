import mongoose, { Schema } from "mongoose";
import { INotify } from "../interfaces";

const NotifySchema: Schema<INotify> = new Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true }

});

const NotifyModel = mongoose.model<INotify>('Notify', NotifySchema);

export default NotifyModel;