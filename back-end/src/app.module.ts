import { Module } from "@nestjs/common";
import { AppController, MainController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController, MainController],
  providers: [AppService],
})
export class AppModule {}
