export declare class MethodServic {
    authToken(): Promise<string>;
    password_auth(password: string): Promise<string>;
    compare_pass(obj: any): Promise<any>;
}
