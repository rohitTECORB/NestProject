import { ObjectId } from 'typeorm';
export declare class Admin {
    id: ObjectId;
    name: string;
    user_id: string;
    email: string;
    password: string;
    contact: string;
    token: string;
    otp: number;
    isDelete: Boolean;
    isActive: Boolean;
    updatedAt: Date;
    createdAt: Date;
}
