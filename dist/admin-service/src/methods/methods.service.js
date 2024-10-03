"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodServic = void 0;
const crypto_1 = require("crypto");
const bcryptjs_1 = require("bcryptjs");
const common_1 = require("@nestjs/common");
let MethodServic = class MethodServic {
    async authToken() {
        var token = await crypto_1.default.randomBytes(48).toString('hex');
        console.log(token);
        return token;
    }
    ;
    async password_auth(password) {
        console.log('inside api');
        const hashPassword = await bcryptjs_1.bcrypt.hashSync(password, 10);
        console.log(hashPassword);
        return hashPassword;
    }
    async compare_pass(obj) {
        var match = bcryptjs_1.bcrypt.compareSync(obj.password, obj.user_pass);
        return match;
    }
};
exports.MethodServic = MethodServic;
exports.MethodServic = MethodServic = __decorate([
    (0, common_1.Injectable)()
], MethodServic);
//# sourceMappingURL=methods.service.js.map