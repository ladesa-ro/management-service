import { Module } from "@nestjs/common";
import { AppController } from "@/application-nest/api/app.controller";
import { AppService } from "@/application-nest/domain/app.service";
import { DocsController } from "@/modules/docs/docs.controller";
import { ResourcesModule } from "@/modules/resources.module";
import { InfrastructureModule, SearchModule } from "@/shared";

@Module({
  imports: [SearchModule, ResourcesModule, InfrastructureModule],
  controllers: [DocsController, AppController],
  providers: [AppService],
})
export class AppModule {}
