import { Repository } from 'typeorm';
import { Admin } from '../../entities/admin.entitiy';
import { Session } from '../../entities/session.entity';
import { OTPGen } from '../../entities/forgetPass.entity';
import { MethodServic } from '../../methods/methods.service';
import { AuthService } from '../../guards/auth.service';
import { AuthDto } from 'src/dto/auth.dto';
export declare class authController {
    private readonly adminRepository;
    private readonly sessionRepository;
    private readonly otpRepository;
    private readonly methodsService;
    private readonly authService;
    constructor(adminRepository: Repository<Admin>, sessionRepository: Repository<Session>, otpRepository: Repository<OTPGen>, methodsService: MethodServic, authService: AuthService);
    adminSignUp(SignupDto: AuthDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
        session?: undefined;
    } | {
        code: number;
        message: string;
        result: boolean;
        session?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
        session: any;
    }>;
    login(LoginDto: AuthDto): Promise<{
        code: number;
        message: string;
        result: string;
        session: any;
    } | {
        code: number;
        message: string;
        result?: undefined;
        session?: undefined;
    }>;
    logout(LogoutDto: AuthDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: import("typeorm").DeleteResult;
    }>;
}
