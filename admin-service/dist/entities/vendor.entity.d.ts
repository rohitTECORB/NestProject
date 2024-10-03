import { ObjectId } from 'typeorm';
export declare class Vendor {
    id: ObjectId;
    name: string;
    vendor_id: string;
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
