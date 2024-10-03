import { ObjectId } from 'typeorm';
export declare class Session {
    id: ObjectId;
    userId: string;
    tokens: string;
    type: string;
}
