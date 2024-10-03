import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { Admin } from './entities/admin.entitiy';
import { Session } from './entities/session.entity';
import { MethodServic } from './methods/methods.service';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { AuthService } from './guards/auth.service';
export declare class AdminService {
    private readonly adminRepository;
    private readonly sessionRepository;
    private readonly methodsService;
    private readonly authService;
    constructor(adminRepository: Repository<Admin>, sessionRepository: Repository<Session>, methodsService: MethodServic, authService: AuthService);
    adminSignUp(SignupDto: SignupDto): Promise<{
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
    updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
}
