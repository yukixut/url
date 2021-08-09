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
exports.AppService = exports.prefix = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const url = "mongodb://localhost:27017";
exports.prefix = "http://127.0.0.1:3000/";
let AppService = class AppService {
    constructor() {
        mongodb_1.MongoClient.connect(url, (err, db) => {
            this.db = db.db("tools");
        });
    }
    async findLongUrl(short_url) {
        let res = await this.db
            .collection("shortUrl")
            .find({ short_url })
            .toArray();
        res = res[0];
        let message = "未查询到长网址！";
        let success = false;
        if (res) {
            message = "查询长网址成功！";
            success = true;
        }
        return {
            success,
            message: message,
            data: res === null || res === void 0 ? void 0 : res.long_url,
        };
    }
    async redirectToLongUrl(short_url) {
        const res = await this.findLongUrl(short_url);
        console.log(res, "——————————");
        if (res === null || res === void 0 ? void 0 : res.data) {
            return { url: res.data, statusCode: 302 };
        }
        else {
            throw new common_1.NotFoundException("未识别网址！");
        }
    }
    async create(params) {
        var _a;
        const long_url = params.origin_url;
        const short_url = await this.genShortUrl(long_url);
        const res = await this.db
            .collection("shortUrl")
            .insertOne({ long_url: params.origin_url, short_url });
        let success = ((_a = res.result) === null || _a === void 0 ? void 0 : _a.ok) ? true : false;
        return {
            success,
            message: "生成短网址成功!",
            data: short_url,
        };
    }
    async genShortUrl(long_url) {
        const res = await this.db.collection("shortUrl").find().toArray();
        const number = res.length + 1000;
        let short_url = this.string10to62(number);
        short_url = exports.prefix + short_url;
        return short_url;
    }
    string10to62(number) {
        const chars = "0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ";
        const charsArr = chars.split("");
        const radix = chars.length;
        let qutient = +number;
        let arr = [];
        do {
            let mod = qutient % radix;
            qutient = (qutient - mod) / radix;
            arr.unshift(charsArr[mod]);
        } while (qutient);
        return arr.reverse().join("");
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map