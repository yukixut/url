import { CreateShortUrl as CreateShortUrlParams } from "./main.dto";
export declare const prefix = "http://127.0.0.1:3000/";
export declare class AppService {
    ShortUrlModel: any;
    db: any;
    constructor();
    findLongUrl(short_url: string): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    redirectToLongUrl(short_url: string): Promise<{
        url: any;
        statusCode: number;
    }>;
    create(params: CreateShortUrlParams): Promise<{
        success: boolean;
        message: string;
        data: string;
    }>;
    genShortUrl(long_url: string): Promise<string>;
    string10to62(number: number): string;
}
