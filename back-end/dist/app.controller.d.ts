import { AppService } from "./app.service";
import { CreateShortUrl } from "./main.dto";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    create(parmas: CreateShortUrl): Promise<any>;
    getLongUrl(query: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
}
export declare class MainController {
    private readonly appService;
    constructor(appService: AppService);
    redirectToLongUrl(query: any): Promise<{
        url: any;
        statusCode: number;
    }>;
}
