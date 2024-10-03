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
exports.authController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entitiy_1 = require("../../entities/admin.entitiy");
const session_entity_1 = require("../../entities/session.entity");
const forgetPass_entity_1 = require("../../entities/forgetPass.entity");
const methods_service_1 = require("../../methods/methods.service");
const auth_service_1 = require("../../guards/auth.service");
let authController = class authController {
    constructor(adminRepository, sessionRepository, otpRepository, methodsService, authService) {
        this.adminRepository = adminRepository;
        this.sessionRepository = sessionRepository;
        this.otpRepository = otpRepository;
        this.methodsService = methodsService;
        this.authService = authService;
    }
    async adminSignUp(SignupDto) {
        try {
            const { email, name, contact } = SignupDto;
            console.log(email);
            console.log(name);
            console.log(contact);
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
            const existingAdmin = await this.adminRepository.findOne({ where: { email } });
            if (existingAdmin) {
                throw new common_1.ConflictException('Email already exists');
            }
            var admin_obj = {
                name: name,
                email: email,
                contact: contact,
                isActive: true,
                isDelete: false,
                createdAt: new Date(),
                updateAt: new Date()
            };
            const savedAdmin = await this.adminRepository.save(admin_obj);
            const token = await this.authService.generateToken(savedAdmin.id.toString());
            console.log(token);
            const session = {
                userId: savedAdmin.id.toString(),
                type: 'admin',
                token: token,
            };
            const savedSession = await this.sessionRepository.save(session);
            return {
                code: 200,
                message: 'Signup successful',
                result: savedAdmin,
                session: savedSession,
            };
        }
        catch (error) {
            console.log('Error during admin signup:', error.response);
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async login(LoginDto) {
        try {
            const { name, password, email } = LoginDto;
            const check = await this.adminRepository.findOne({ where: { email } });
            if (!check) {
                throw new common_1.ConflictException('Email does not esist');
            }
            else {
                let passwordStatus = await this.methodsService.compare_pass({ 'password': password, 'user_password': check.password });
                if (passwordStatus == false) {
                    throw new common_1.ConflictException('Wrong Password');
                }
                else {
                    const check_id = check.id.toString();
                    let token = await this.authService.generateToken(check_id);
                    console.log(token);
                    let dlt_session = await this.sessionRepository.delete({ userId: check_id });
                    let obj = {
                        'userId': check_id,
                        'tokens': token,
                        'type': 'admin',
                        'timeStamp': Date.now()
                    };
                    let save_session = await this.sessionRepository.save(obj);
                    return {
                        code: 200,
                        message: 'Login successful',
                        result: token,
                        session: save_session
                    };
                }
            }
        }
        catch (error) {
            console.log(error);
            return {
                code: 500,
                message: 'Internal server error',
            };
        }
    }
    async logout(LogoutDto) {
        try {
            const { email } = LogoutDto;
            if (!email) {
                return {
                    code: 400,
                    message: 'Bad Request',
                };
            }
            else {
                const check = await this.adminRepository.findOne({ where: { email } });
                console.log(check);
                if (check) {
                    const check_id = check.id.toString();
                    console.log(check_id);
                    var deletedUser = await this.sessionRepository.delete({ userId: check_id });
                    console.log(deletedUser);
                    return {
                        code: 200,
                        message: 'Logout successfull',
                        result: deletedUser
                    };
                }
                else {
                    return {
                        code: 400,
                        message: 'Admin with this email does not exist'
                    };
                }
            }
        }
        catch (error) {
            console.log(error);
            return {
                code: 500,
                message: 'Internal Server error'
            };
        }
    }
};
exports.authController = authController;
exports.authController = authController = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entitiy_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __param(2, (0, typeorm_1.InjectRepository)(forgetPass_entity_1.OTPGen)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        methods_service_1.MethodServic,
        auth_service_1.AuthService])
], authController);
//# sourceMappingURL=authController.js.map