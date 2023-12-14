import { Types } from "mongoose";

export default interface IBadge extends Document {
    _id?: Types.ObjectId | null
    title: string;
    badgeImg: string;
    categoryId: Types.ObjectId;
    totalCount: number;
    restCount: number;
    price: number;
    attainerRoles: string[];
    createdDate: Date;
    isActive: boolean;
}