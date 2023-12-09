import { Types } from "mongoose";

export default interface INotify extends Document {
    ownerId: Types.ObjectId
    title: string,
    content: string
    date: Date
}