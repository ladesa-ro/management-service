import { Module } from "@nestjs/common";
import { AppController } from "@/v2/server/nest/api/app.controller";
import { AppService } from "@/v2/server/nest/domain/app.service";
import { ResourcesModule } from "@/v2/core/resources.module";
import { InfrastructureModule, SearchModule } from "@/shared";

@Module({
  imports: [SearchModule, ResourcesModule, InfrastructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
