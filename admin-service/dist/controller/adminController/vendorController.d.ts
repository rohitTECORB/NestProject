import { MethodServic } from '../../methods/methods.service';
import { Repository } from 'typeorm';
import { Session } from '../../entities/session.entity';
import { OTPGen } from '../../entities/forgetPass.entity';
import { AuthService } from '../../guards/auth.service';
import { VendorDto } from '../../dto/vendor.dto';
import { Vendor } from '../../entities/vendor.entity';
export declare class vendorController {
    private readonly vendorRepository;
    private readonly sessionRepository;
    private readonly otpRepository;
    private readonly methodsService;
    private readonly authService;
    constructor(vendorRepository: Repository<Vendor>, sessionRepository: Repository<Session>, otpRepository: Repository<OTPGen>, methodsService: MethodServic, authService: AuthService);
    addVender(SignupDto: VendorDto): Promise<{
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
            savedVendor: any;
            pass: string;
        };
        session: any;
    }>;
    updatePassword(updatePasswordDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    forgetPass(forgetPassDto: VendorDto): Promise<{
        code: number;
        message: string;
    }>;
    varifyOTP(varifyVendorOTPDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: boolean;
    }>;
    EditVendorProfile(EditVendorDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    vendorProfileDetails(vendorProfileDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    UpdatevendorStatus(VendorStatusUpdateDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    vendorlisting(VendorListingDto: VendorDto): Promise<{
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
    adminDeleteVendor(DeleteVendorDto: VendorDto): Promise<{
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
