import { ObjectId } from 'typeorm';
export declare class OTPGen {
    id: ObjectId;
    user_Id: string;
    email: string;
    newOTP: number;
}
