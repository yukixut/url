import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
} from "@nestjs/common";
import { AppService, prefix } from "./app.service";
import { CreateShortUrl } from "./main.dto";

@Controller("url")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() parmas: CreateShortUrl): Promise<any> {
    try {
      const res = await this.appService.create(parmas);
      console.log(res, "res");
      return res;
    } catch (e) {
      throw new Error(e.toString());
    }
  }

  @Get()
  async getLongUrl(@Query() query: any) {
    const short_url = Object.values(query)[0] as string;
    const res = await this.appService.findLongUrl(short_url);
    return res;
  }
}

@Controller("*")
export class MainController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect("")
  async redirectToLongUrl(@Param() query: any) {
    let short_url = Object.values(query)[0] as string;
    short_url = prefix + short_url;
    console.log(short_url);

    return await this.appService.redirectToLongUrl(short_url);
  }
}
