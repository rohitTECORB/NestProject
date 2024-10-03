import { AdminService } from './app.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    signup(SignupDto: SignupDto): Promise<{
        code: number;
        message: string;
        result: any;
        session: any;
    }>;
    login(LoginDto: LoginDto): Promise<{
        code: number;
        message: string;
        result: Promise<string>;
        session: any;
    } | {
        code: number;
        message: string;
        result?: undefined;
        session?: undefined;
    }>;
    logout(LogoutDto: LogoutDto): Promise<{
        code: number;
        message: string;
    }>;
    updatePassword(UpdatePasswordDto: UpdatePasswordDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
}
