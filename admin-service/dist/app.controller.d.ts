import { authController } from './controller/adminController/authController';
import { userController } from './controller/adminController/userController';
import { vendorController } from './controller/adminController/vendorController';
import { UserDto } from './dto/user.dto';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import { VendorDto } from './dto/vendor.dto';
export declare class ViewController {
    getUser(res: Response): void;
    getVendor(res: Response): void;
    getAdmin(res: Response): void;
}
export declare class AdminController {
    private readonly authController;
    private readonly userController;
    private readonly vendorController;
    constructor(authController: authController, userController: userController, vendorController: vendorController);
    signup(SignupDto: AuthDto): Promise<{
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
    addUser(userSignUpDto: UserDto): Promise<{
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
    updatePassword(UpdatePasswordDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    forgetpassword(ForgetPassDto: UserDto): Promise<{
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
    userUpdateStatus(UserProfileUpdateDto: UserDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    userListing(userListingDto: UserDto): Promise<{
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
    newVendorSignUp(VendorSignupDto: VendorDto): Promise<{
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
    updateVendorPassword(updatePasswordDto: VendorDto): Promise<{
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
    varifyVendorOTP(varifyVendorOTPDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: boolean;
    }>;
    EditVendorProfile(editVendorprofile: VendorDto): Promise<{
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
    UpdatevendorStatus(updateVendorDto: VendorDto): Promise<{
        code: number;
        message: string;
        result?: undefined;
    } | {
        code: number;
        message: string;
        result: any;
    }>;
    vendorlisting(vendorListingDto: VendorDto): Promise<{
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
