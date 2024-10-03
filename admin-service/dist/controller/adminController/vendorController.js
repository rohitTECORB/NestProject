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
exports.vendorController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const methods_service_1 = require("../../methods/methods.service");
const typeorm_2 = require("typeorm");
const session_entity_1 = require("../../entities/session.entity");
const forgetPass_entity_1 = require("../../entities/forgetPass.entity");
const auth_service_1 = require("../../guards/auth.service");
const vendor_entity_1 = require("../../entities/vendor.entity");
let vendorController = class vendorController {
    constructor(vendorRepository, sessionRepository, otpRepository, methodsService, authService) {
        this.vendorRepository = vendorRepository;
        this.sessionRepository = sessionRepository;
        this.otpRepository = otpRepository;
        this.methodsService = methodsService;
        this.authService = authService;
    }
    async addVender(SignupDto) {
        try {
            const { email, name, contact } = SignupDto;
            if (!email || !name || !contact) {
                return {
                    code: 400,
                    message: 'Please enter correct details',
                };
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const resultEmail = emailRegex.test(email);
            if (!resultEmail) {
                return {
                    code: 400,
                    message: 'Invalid email format',
                    result: resultEmail
                };
            }
            const existingVendor = await this.vendorRepository.findOne({ where: { email } });
            if (existingVendor) {
                return {
                    code: 400,
                    message: 'Email Already Exist'
                };
            }
            else {
                const pass = await this.methodsService.generateRandomPassword(5);
                var vendor_obj = {
                    name: name,
                    email: email,
                    password: pass,
                    contact: contact,
                    isActive: true,
                    isDelete: false,
                    createdAt: new Date(),
                    updateAt: new Date()
                };
                const savedVendor = await this.vendorRepository.save(vendor_obj);
                const token = await this.authService.generateToken(savedVendor.id.toString());
                const session = {
                    vendorId: savedVendor.id.toString(),
                    type: 'vendor',
                    token: token,
                };
                const savedSession = await this.sessionRepository.save(session);
                return {
                    code: 200,
                    message: 'Signup successful',
                    result: { savedVendor, pass },
                    session: savedSession,
                };
            }
        }
        catch (error) {
            console.log('Error during vendor signup:', error);
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async updatePassword(updatePasswordDto) {
        try {
            const { oldpassword, newpassword, email } = updatePasswordDto;
            if (!oldpassword || !newpassword || !email) {
                return {
                    code: 400,
                    message: 'Bad Request'
                };
            }
            let check = await this.vendorRepository.findOne({ where: { email } });
            const vendor_id = check.id.toString();
            if (!check) {
                return {
                    code: 400,
                    message: 'Bad Request'
                };
            }
            else {
                const validatePassword = await this.methodsService.compare_pass({ 'password': oldpassword, '_password': check.password });
                if (validatePassword == true) {
                    let check = await this.vendorRepository.update(vendor_id, { password: newpassword });
                    return {
                        code: 200,
                        message: 'Password successfully updated',
                        result: check
                    };
                }
                else {
                    return {
                        code: 400,
                        message: 'Please enter correct password'
                    };
                }
            }
        }
        catch (error) {
            return {
                code: 500,
                message: 'Internal server error',
                result: error
            };
        }
    }
    async forgetPass(forgetPassDto) {
        try {
            const { email } = forgetPassDto;
            if (!email) {
                return {
                    code: 400,
                    message: 'Email Id Does not exist'
                };
            }
            else {
                const check = await this.vendorRepository.findOne({ where: { email } });
                const _id = check.id;
                if (check) {
                    const vendor_id = _id.toString();
                    const newOTP = await this.methodsService.generateOTP(4);
                    const saved_OTP = {
                        vendor_id,
                        newOTP,
                        email
                    };
                    const savedOTP = await this.otpRepository.save(saved_OTP);
                    const send_email = await this.methodsService.sendEmail({ newOTP, email });
                }
                else {
                    return {
                        code: 400,
                        message: 'Bad Request',
                    };
                }
            }
        }
        catch (error) {
            console.log('Internal server error', error);
        }
    }
    async varifyOTP(varifyVendorOTPDto) {
        try {
            const { email, OTP } = varifyVendorOTPDto;
            const check = await this.otpRepository.findOne({ where: { email } });
            if (!check) {
                return {
                    code: 400,
                    message: 'Email Id does not exist'
                };
            }
            else {
                const otpStatus = await this.methodsService.verifyOTP({ 'dbOTP': check.newOTP, '_otp': OTP });
                if (otpStatus == true) {
                    const newcheck = await this.vendorRepository.findOne({ where: { email } });
                    const pass = newcheck.password;
                    const send_email = await this.methodsService.sendEmail1({ pass, email });
                    return {
                        code: 200,
                        message: 'OTP varification successfull',
                        result: otpStatus
                    };
                }
                else {
                    return {
                        code: 400,
                        message: 'OTP varification failed. Please enter correct otp',
                        result: otpStatus
                    };
                }
            }
        }
        catch (error) {
            console.log('Internal server error', error);
        }
    }
    async EditVendorProfile(EditVendorDto) {
        try {
            const data = EditVendorDto;
            const status = data.status;
            const _id = data.vendor_id;
            if (!_id) {
                return {
                    code: 400,
                    message: 'Bad Request: Please enter correct data',
                };
            }
            const check = await this.vendorRepository.findOne(_id);
            if (check) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const result1 = emailRegex.test(data.email);
                if (data.email && !result1) {
                    return {
                        code: 400,
                        message: 'Invalid email format',
                        result: result1
                    };
                }
                const contact = check.contact;
                let status1 = check.isActive;
                if (status === 'Active') {
                    status1 = true;
                }
                else if (status === 'Deactive') {
                    status1 = false;
                }
                const updatedData = {
                    name: data.name ? data.name : check.name,
                    email: data.email ? data.email : check.email,
                    contact: data.contact ? data.contact : contact,
                    isActive: status1,
                    updatedAt: new Date()
                };
                const savedObj = await this.vendorRepository.update(_id, updatedData);
                return {
                    code: 200,
                    message: 'Profile edit successful',
                    result: savedObj,
                };
            }
            else {
                return {
                    code: 404,
                    message: 'vendor not found',
                };
            }
        }
        catch (error) {
            return {
                code: 500,
                message: 'Internal Server Error',
                result: error.message,
            };
        }
    }
    async vendorProfileDetails(vendorProfileDto) {
        try {
            const reqData = vendorProfileDto;
            const _id = reqData.vendor_id;
            if (!_id) {
                return {
                    code: 400,
                    message: 'Bad Request: Missing vendorId'
                };
            }
            const check = await this.vendorRepository.findOne(_id);
            if (check) {
                return {
                    code: 200,
                    message: "vendor with this vendorId exist",
                    result: check
                };
            }
            else {
                return {
                    code: 400,
                    message: 'Vendor does not exist with this vendorId'
                };
            }
        }
        catch (error) {
            console.error(error);
            return {
                code: 500,
                message: 'Internal Server Error',
                result: error.message,
            };
        }
    }
    async UpdatevendorStatus(VendorStatusUpdateDto) {
        try {
            const reqData = VendorStatusUpdateDto;
            const status = reqData.status;
            console.log(status);
            const _id = reqData.vendor_id;
            console.log(_id);
            if (!_id) {
                return {
                    code: 400,
                    message: 'Bad Request: Missing vendorId',
                };
            }
            else {
                const check = await this.vendorRepository.findOne(_id);
                if (check) {
                    if (status == 'Active') {
                        var new_Obj = {
                            'isActive': true
                        };
                    }
                    else {
                        var new_Obj = {
                            'isActive': false
                        };
                    }
                    const updatedStatus = await this.vendorRepository.update(_id, new_Obj);
                    return {
                        code: 200,
                        message: 'Status updated successfull',
                        result: updatedStatus
                    };
                }
                else {
                    return {
                        code: 400,
                        message: 'Bad Request',
                    };
                }
            }
        }
        catch (error) {
            return {
                code: 500,
                message: 'Internal Server Error',
                result: error.message
            };
        }
    }
    async vendorlisting(VendorListingDto) {
        try {
            const data = VendorListingDto;
            const page = data.pageNo || 1;
            const page1 = parseInt(page, 10);
            const perPage = data.perPage || 10;
            const perPage1 = parseInt(perPage, 10);
            let obj_data = { 'isDelete': false };
            if (data.search && data.search.trim() !== '' && data.toDate && data.fromDate) {
                obj_data = {
                    $or: [
                        { name: { '$regex': data.search, '$options': 'i' } },
                        { email: { '$regex': data.search, '$options': 'i' } },
                        { contact: { '$regex': data.search, '$options': 'i' } }
                    ],
                    isDelete: false,
                    createdAt: { '$gte': new Date(data.fromDate), '$lte': new Date(data.toDate) },
                };
            }
            else if (data.search && data.search !== '') {
                obj_data = {
                    $or: [
                        { name: { '$regex': data.search, '$options': 'i' } },
                        { email: { '$regex': data.search, '$options': 'i' } },
                        { contact: { '$regex': data.search, '$options': 'i' } }
                    ],
                    isDelete: false,
                };
            }
            else if (data.fromDate && data.toDate) {
                obj_data = {
                    createdAt: { '$gte': new Date(data.fromDate), '$lte': new Date(data.toDate) },
                    isDelete: false
                };
            }
            const total = await this.vendorRepository.count(obj_data);
            const usrData = await this.vendorRepository.find({
                where: obj_data,
                order: {
                    createdAt: 'DESC',
                },
                skip: (page1 - 1) * perPage1,
                take: perPage1,
            });
            const length = usrData.length;
            var newObj_data = [];
            var obj_data1 = {};
            var status1;
            for (let i = 0; i < length; i++) {
                var objectId = usrData[i].id;
                var id = objectId.toString();
                obj_data1 = {
                    name: usrData[i].name,
                    email: usrData[i].email,
                    contact: usrData[i].contact,
                    vendor_id: id,
                    status: usrData[i].isActive,
                    createdAt: moment(usrData[i].createdAt).format('YYYY/MM/DD'),
                };
                newObj_data.push(obj_data1);
            }
            return {
                code: 200,
                message: 'vendorlisting found successfully',
                result: newObj_data, total
            };
        }
        catch (error) {
            console.error('Error occurred:', error);
            return {
                code: 500,
                message: 'Internal Server Error', error,
            };
        }
    }
    async adminDeleteVendor(DeleteVendorDto) {
        try {
            const data = DeleteVendorDto;
            const id = data.vendor_id;
            console.log(id);
            const chck = await this.vendorRepository.findOne(id);
            if (!chck) {
                return {
                    code: 400,
                    message: ' Bad Request'
                };
            }
            else {
                const vendorDeleted = await this.vendorRepository.update(id, { isDelete: true });
                return {
                    code: 200,
                    message: 'vendorDeleted successfully',
                    result: vendorDeleted
                };
            }
        }
        catch (error) {
            return {
                code: 500,
                message: 'Internal Server Error', error,
            };
        }
    }
};
exports.vendorController = vendorController;
exports.vendorController = vendorController = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(vendor_entity_1.Vendor)),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __param(2, (0, typeorm_1.InjectRepository)(forgetPass_entity_1.OTPGen)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        methods_service_1.MethodServic,
        auth_service_1.AuthService])
], vendorController);
//# sourceMappingURL=vendorController.js.map