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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodServic = void 0;
const bcrypt = require("bcryptjs");
const common_1 = require("@nestjs/common");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
const mailer_1 = require("@nestjs-modules/mailer");
const crypto = require("crypto");
const crypto_1 = require("crypto");
let MethodServic = class MethodServic {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async authToken() {
        var token = await crypto.randomBytes(48).toString('hex');
        console.log(token);
        return token;
    }
    ;
    async generateRandomPassword(length) {
        const pass = (0, crypto_1.randomBytes)(length).toString('hex').slice(0, length);
        console.log(pass);
        return pass;
    }
    async password_auth(password) {
        console.log('inside api');
        const hashPassword = bcrypt.hashSync(password, 10);
        return hashPassword;
    }
    async generatePass() {
        const password = crypto.randomBytes(8).toString('hex');
        console.log(password);
        return password;
    }
    async compare_pass(obj) {
        const password = obj.password;
        console.log(password);
        const _password = obj._password;
        console.log(_password);
        if (password == _password) {
            return true;
        }
        else {
            return false;
        }
    }
    async generateOTP(length) {
        const secret = speakeasy.generateSecret({ length: 20 });
        const otp = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32'
        });
        console.log(otp);
        return otp;
    }
    async verifyOTP(obj) {
        const dbOTP = obj.dbOTP;
        const _otp = obj._otp;
        if (dbOTP == _otp) {
            return true;
        }
        else {
            return false;
        }
    }
    async sendEmail(obj) {
        const email = obj.email;
        console.log(email);
        const otp = obj.newOTP;
        console.log(otp);
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "rhtkumar700@gmail.com",
                pass: "yfrb fosp xgsv wdvg",
            }
        });
        const mailOptions = {
            from: 'rhtkumar700@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your One Time Password is ${otp}`,
        };
        try {
            const info = await transport.sendMail(mailOptions);
            console.log('Email sent: ', info.messageId);
        }
        catch (error) {
            console.error('Error sending email: ', error);
        }
    }
    async sendEmail1(obj) {
        const email = obj.email;
        console.log(email);
        const otp = obj.pass;
        console.log(otp);
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "rhtkumar700@gmail.com",
                pass: "yfrb fosp xgsv wdvg",
            }
        });
        const mailOptions = {
            from: 'rhtkumar700@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your password is ${otp}`,
        };
        try {
            const info = await transport.sendMail(mailOptions);
            console.log('Email sent: ', info.messageId);
        }
        catch (error) {
            console.error('Error sending email: ', error);
        }
    }
};
exports.MethodServic = MethodServic;
exports.MethodServic = MethodServic = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MethodServic);
//# sourceMappingURL=methods.service.js.map