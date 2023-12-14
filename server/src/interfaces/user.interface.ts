import { Types } from "mongoose";

export default interface IUser extends Document {
    _id?: Types.ObjectId | null
    nickName?: string | null;
    name?: string | null;
    surname?: string | null;
    email: string[];
    phone?: string | null;
    password?: string | null;
    profileImg?: string | null;
    role: number;
    createdDate?: Date;
    isActive?: boolean | null;
}

// _id,nickName,name,surname,email,phone,password,profileImg,role,createdDate,isActive