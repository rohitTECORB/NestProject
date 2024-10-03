import { ObjectId } from 'typeorm';
export declare class User {
    id: ObjectId;
    name: string;
    email: string;
    password: string;
    contact: string;
    token: string;
    otp: number;
    isActive: Boolean;
    updatedAt: Date;
    createdAt: Date;
    isDelete: Boolean;
    toDate: Date;
    fromDate: Date;
}
