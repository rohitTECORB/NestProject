import { ObjectId } from 'typeorm';
export declare class Admin {
    id: ObjectId;
    name: string;
    email: string;
    password: string;
    contact: string;
    token: string;
    otp: number;
}
