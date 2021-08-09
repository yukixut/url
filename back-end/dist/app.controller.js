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
exports.MainController = exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const main_dto_1 = require("./main.dto");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async create(parmas) {
        try {
            const res = await this.appService.create(parmas);
            console.log(res, "res");
            return res;
        }
        catch (e) {
            throw new Error(e.toString());
        }
    }
    async getLongUrl(query) {
        const short_url = Object.values(query)[0];
        const res = await this.appService.findLongUrl(short_url);
        return res;
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [main_dto_1.CreateShortUrl]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getLongUrl", null);
AppController = __decorate([
    common_1.Controller("url"),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
let MainController = class MainController {
    constructor(appService) {
        this.appService = appService;
    }
    async redirectToLongUrl(query) {
        let short_url = Object.values(query)[0];
        short_url = app_service_1.prefix + short_url;
        console.log(short_url);
        return await this.appService.redirectToLongUrl(short_url);
    }
};
__decorate([
    common_1.Get(),
    common_1.Redirect(""),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "redirectToLongUrl", null);
MainController = __decorate([
    common_1.Controller("*"),
    __metadata("design:paramtypes", [app_service_1.AppService])
], MainController);
exports.MainController = MainController;
//# sourceMappingURL=app.controller.js.map