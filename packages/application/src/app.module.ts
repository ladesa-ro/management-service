import { Module } from "@nestjs/common";
import { ControllersModule } from "./controllers/controllers.module";

@Module({
  imports: [ControllersModule],
})
export class AppModule { }
