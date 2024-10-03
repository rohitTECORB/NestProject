"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = exports.ViewController = void 0;
const common_1 = require("@nestjs/common");
const authController_1 = require("./controller/adminController/authController");
const userController_1 = require("./controller/adminController/userController");
const vendorController_1 = require("./controller/adminController/vendorController");
const user_dto_1 = require("./dto/user.dto");
const auth_dto_1 = require("./dto/auth.dto");
const path_1 = require("path");
const vendor_dto_1 = require("./dto/vendor.dto");
let ViewController = class ViewController {
    getUser(res) {
        res.sendFile((0, path_1.join)(__dirname, '..', 'public', 'views', 'user.html'));
    }
    getVendor(res) {
        res.sendFile((0, path_1.join)(__dirname, '..', 'public', 'views', 'vendor.html'));
    }
    getAdmin(res) {
        res.sendFile((0, path_1.join)(__dirname, '..', 'public', 'views', 'admin.html'));
    }
};
exports.ViewController = ViewController;
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ViewController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('vendor'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ViewController.prototype, "getVendor", null);
__decorate([
    (0, common_1.Get)('admin'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ViewController.prototype, "getAdmin", null);
exports.ViewController = ViewController = __decorate([
    (0, common_1.Controller)('static')
], ViewController);
let AdminController = class AdminController {
    constructor(authController, userController, vendorController) {
        this.authController = authController;
        this.userController = userController;
        this.vendorController = vendorController;
    }
    async signup(SignupDto) {
        return await this.authController.adminSignUp(SignupDto);
    }
    async login(LoginDto) {
        return await this.authController.login(LoginDto);
    }
    async logout(LogoutDto) {
        return await this.authController.logout(LogoutDto);
    }
    async addUser(userSignUpDto) {
        return await this.userController.addUser(userSignUpDto);
    }
    async updatePassword(UpdatePasswordDto) {
        return await this.userController.updatePassword(UpdatePasswordDto);
    }
    async forgetpassword(ForgetPassDto) {
        return await this.userController.forgetPass(ForgetPassDto);
    }
    async varifyOTP(ForgetPassDto) {
        return await this.userController.varifyOTP(ForgetPassDto);
    }
    async EditUserProfile(EditUserDto) {
        return await this.userController.EditUserProfile(EditUserDto);
    }
    async userProfileDetails(UserProfileDto) {
        return await this.userController.userProfileDetails(UserProfileDto);
    }
    async userUpdateStatus(UserProfileUpdateDto) {
        return await this.userController.UpdateuserStatus(UserProfileUpdateDto);
    }
    async userListing(userListingDto) {
        return await this.userController.userlisting(userListingDto);
    }
    async adminDeleteUser(DeleteUserDto) {
        return await this.userController.adminDeleteUser(DeleteUserDto);
    }
    async newVendorSignUp(VendorSignupDto) {
        console.log("enter controller");
        return await this.vendorController.addVender(VendorSignupDto);
    }
    async updateVendorPassword(updatePasswordDto) {
        return await this.vendorController.updatePassword(updatePasswordDto);
    }
    async forgetPass(forgetPassDto) {
        return await this.vendorController.forgetPass(forgetPassDto);
    }
    async varifyVendorOTP(varifyVendorOTPDto) {
        return await this.vendorController.varifyOTP(varifyVendorOTPDto);
    }
    async EditVendorProfile(editVendorprofile) {
        return await this.vendorController.EditVendorProfile(editVendorprofile);
    }
    async vendorProfileDetails(vendorProfileDto) {
        console.log('enter controller');
        return await this.vendorController.vendorProfileDetails(vendorProfileDto);
    }
    async UpdatevendorStatus(updateVendorDto) {
        return await this.vendorController.UpdatevendorStatus(updateVendorDto);
    }
    async vendorlisting(vendorListingDto) {
        return await this.vendorController.vendorlisting(vendorListingDto);
    }
    async adminDeleteVendor(DeleteVendorDto) {
        return await this.vendorController.adminDeleteVendor(DeleteVendorDto);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('addUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addUser", null);
__decorate([
    (0, common_1.Patch)('updatePassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)('forgetpassUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "forgetpassword", null);
__decorate([
    (0, common_1.Get)('varifyUserOTP'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "varifyOTP", null);
__decorate([
    (0, common_1.Post)('EditUserProfile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "EditUserProfile", null);
__decorate([
    (0, common_1.Get)('userProfileDetails'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "userProfileDetails", null);
__decorate([
    (0, common_1.Post)('userUpdateStatus'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "userUpdateStatus", null);
__decorate([
    (0, common_1.Get)('userListing'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "userListing", null);
__decorate([
    (0, common_1.Post)('adminDeleteUser'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminDeleteUser", null);
__decorate([
    (0, common_1.Post)('addVender'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "newVendorSignUp", null);
__decorate([
    (0, common_1.Post)('updateVendorPass'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateVendorPassword", null);
__decorate([
    (0, common_1.Post)('forgetPassVendor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "forgetPass", null);
__decorate([
    (0, common_1.Post)('varifyVendorOTP'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "varifyVendorOTP", null);
__decorate([
    (0, common_1.Post)('EditVendorProfile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "EditVendorProfile", null);
__decorate([
    (0, common_1.Get)('vendorProfileDetails'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "vendorProfileDetails", null);
__decorate([
    (0, common_1.Post)('UpdateVendorStatus'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "UpdatevendorStatus", null);
__decorate([
    (0, common_1.Get)('vendorlisting'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "vendorlisting", null);
__decorate([
    (0, common_1.Post)('adminDeleteVendor'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vendor_dto_1.VendorDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminDeleteVendor", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('adminController'),
    __metadata("design:paramtypes", [authController_1.authController,
        userController_1.userController,
        vendorController_1.vendorController])
], AdminController);
//# sourceMappingURL=app.controller.js.map