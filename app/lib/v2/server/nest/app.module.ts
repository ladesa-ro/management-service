import { Module } from "@nestjs/common";
import { InfrastructureModule, SearchModule } from "@/old/shared";
import { ResourcesModule } from "@/v2/core/resources.module";
import { AppController } from "@/v2/server/nest/api/app.controller";
import { AppService } from "@/v2/server/nest/domain/app.service";

@Module({
  imports: [SearchModule, ResourcesModule, InfrastructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
