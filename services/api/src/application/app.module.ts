import { ResourcesModule } from "@/domain/resources/resources.module";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";

@Module({
  imports: [ResourcesModule, InfrastructureModule],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
