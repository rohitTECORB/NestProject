import { MethodServic } from '../../methods/methods.service';
import { Admin } from '../../entities/admin.entitiy';
import { Repository } from 'typeorm';
import { Session } from '../../entities/session.entity';
import { OTPGen } from '../../entities/forgetPass.entity';
import { AuthService } from '../../guards/auth.service';
import { UserDto } from '../../dto/user.dto';
import { User } from 'src/entities/user.entity';
export declare class userController {
    private readonly adminRepository;
    private readonly userRepository;
    private readonly sessionRepository;
    private readonly otpRepository;
    private readonly methodsService;
    private readonly authService;
    constructor(adminRepository: Repository<Admin>, userRepository: Repository<User>, sessionRepository: Repository<Session>, otpRepository: Repository<OTPGen>, methodsService: MethodServic, authService: AuthService);
    addUser(SignupDto: UserDto): Promise<{
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
        result: {
            savedUser: any;
            pass: string;
        };
        session: any;
    }>;
    updatePassword(updatePasswordDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    forgetPass(forgetPassDto: UserDto): Promise<{
        code: number;
        message: string;
    }>;
    varifyOTP(ForgetPassDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: boolean;
    }>;
    EditUserProfile(EditUserDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    userProfileDetails(UserProfileDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    UpdateuserStatus(UserStatusUpdateDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    userlisting(userListingDto: UserDto): Promise<{
        code: number;
        message: string;
        result: any[];
        total: number;
        error?: undefined;
    } | {
        code: number;
        message: string;
        error: any;
        result?: undefined;
        total?: undefined;
    }>;
    adminDeleteUser(DeleteUserDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
        error?: undefined;
    } | {
        code: number;
        message: string;
        result: import("typeorm").UpdateResult;
        error?: undefined;
    } | {
        code: number;
        message: string;
        error: any;
        result?: undefined;
    }>;
}
