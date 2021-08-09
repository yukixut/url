import { Injectable, NotFoundException } from "@nestjs/common";
import { MongoClient } from "mongodb";
import { CreateShortUrl as CreateShortUrlParams } from "./main.dto";

const url = "mongodb://localhost:27017";
export const prefix = "http://127.0.0.1:3000/";

@Injectable()
export class AppService {
  ShortUrlModel: any;
  db: any;
  constructor() {
    MongoClient.connect(url, (err, db) => {
      this.db = db.db("tools");
    });
  }

  async findLongUrl(short_url: string) {
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
      data: res?.long_url,
    };
  }

  async redirectToLongUrl(short_url: string) {
    const res = await this.findLongUrl(short_url);
    console.log(res, "——————————");

    if (res?.data) {
      return { url: res.data, statusCode: 302 };
    } else {
      throw new NotFoundException("未识别网址！");
    }
  }

  async create(params: CreateShortUrlParams) {
    const long_url = params.origin_url;
    const short_url = await this.genShortUrl(long_url);
    const res = await this.db
      .collection("shortUrl")
      .insertOne({ long_url: params.origin_url, short_url });
    let success = res.result?.ok ? true : false;

    return {
      success,
      message: "生成短网址成功!",
      data: short_url,
    };
  }

  async genShortUrl(long_url: string) {
    const res = await this.db.collection("shortUrl").find().toArray();
    const number = res.length + 1000;
    let short_url = this.string10to62(number);
    short_url = prefix + short_url;
    return short_url;
  }

  string10to62(number: number) {
    const chars =
      "0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ";
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
}
