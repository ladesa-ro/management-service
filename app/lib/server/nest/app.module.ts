import { Module } from "@nestjs/common";
import { InfrastructureModule, SearchModule } from "@/v2/old/shared";
import { ModulesModule } from "@/server/nest/modules/modules.module";
import { AppController } from "@/server/nest/app.controller";
import { AppService } from "@/server/nest/app.service";

@Module({
  imports: [SearchModule, ModulesModule, InfrastructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
