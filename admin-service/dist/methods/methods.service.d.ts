import { MailerService } from '@nestjs-modules/mailer';
export declare class MethodServic {
    private readonly mailService;
    constructor(mailService: MailerService);
    authToken(): Promise<string>;
    generateRandomPassword(length: any): Promise<string>;
    password_auth(password: string): Promise<string>;
    generatePass(): Promise<string>;
    compare_pass(obj: any): Promise<boolean>;
    generateOTP(length: number): Promise<number>;
    verifyOTP(obj: any): Promise<boolean>;
    sendEmail(obj: any): Promise<void>;
    sendEmail1(obj: any): Promise<void>;
}
