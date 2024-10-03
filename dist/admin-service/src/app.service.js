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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entitiy_1 = require("./entities/admin.entitiy");
const session_entity_1 = require("./entities/session.entity");
const methods_service_1 = require("./methods/methods.service");
const auth_service_1 = require("./guards/auth.service");
let AdminService = class AdminService {
    constructor(adminRepository, sessionRepository, methodsService, authService) {
        this.adminRepository = adminRepository;
        this.sessionRepository = sessionRepository;
        this.methodsService = methodsService;
        this.authService = authService;
    }
    async adminSignUp(SignupDto) {
        try {
            const { email, password, name, contact } = SignupDto;
            console.log(email);
            console.log(name);
            console.log(contact);
            const existingAdmin = await this.adminRepository.findOne({ where: { email } });
            console.log(existingAdmin);
            if (existingAdmin) {
                throw new common_1.ConflictException('Email already esists');
            }
            var admin_obj = {
                name,
                email,
                password,
                contact,
            };
            const savedAdmin = await this.adminRepository.save(admin_obj);
            const token = await this.authService.generateToken(savedAdmin.id.toString());
            console.log(token);
            const session = {
                userId: savedAdmin.id.toString(),
                type: 'admin',
                token: token
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
            throw new common_1.InternalServerErrorException('Something went wron during signup');
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
                const name = check.name;
                let passwordStatus = await this.methodsService.compare_pass({ 'password': password, 'user_password': check.password });
                if (passwordStatus == false) {
                    throw new common_1.ConflictException('Wrong Password');
                }
                else {
                    let token = this.methodsService.authToken();
                    let dlt_session = await this.sessionRepository.delete({ 'userId': check.id });
                    let obj = {
                        'userId': check.id,
                        'tokens': token,
                        'type': 'admin'
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
            const { userId } = LogoutDto;
            if (!userId) {
                return {
                    code: 400,
                    message: 'Bad Request',
                };
            }
            else {
                var user = await this.sessionRepository.delete({ 'userId': userId });
                if (user) {
                    return {
                        code: 200,
                        message: 'Logout successfull'
                    };
                }
                else {
                    return {
                        code: 400,
                        message: 'Bad Request'
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
    async updatePassword(updatePasswordDto) {
        try {
            const { userId, oldpassword, newpassword, email } = updatePasswordDto;
            if (!oldpassword || !newpassword) {
                return {
                    code: 400,
                    message: 'Bad Request'
                };
            }
            let userId1 = userId;
            let user = await this.adminRepository.findOne({ where: { email } });
            if (!user) {
                return {
                    code: 400,
                    message: 'Bad Request'
                };
            }
            else {
                const validatePassword = await this.methodsService.compare_pass({ 'password': oldpassword, 'user_pass': user.password });
                if (validatePassword == true) {
                    var updatedpassword = this.methodsService.password_auth(newpassword);
                    let check = await this.adminRepository.update(userId, { password: newpassword });
                    return {
                        code: 200,
                        message: 'Password successfully updated'
                    };
                }
                else {
                    return {
                        code: 400,
                        message: 'Incorrect password'
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entitiy_1.Admin)),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.Session)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        methods_service_1.MethodServic,
        auth_service_1.AuthService])
], AdminService);
//# sourceMappingURL=app.service.js.map