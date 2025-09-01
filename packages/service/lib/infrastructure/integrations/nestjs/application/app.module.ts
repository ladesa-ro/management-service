import { Module } from "@nestjs/common";
import { DocsController } from "@/features/docs/docs.controller";
import { ResourcesModule } from "@/features/resources.module";
import { AppController } from "@/infrastructure/integrations/nestjs/application/api/app.controller";
import { AppService } from "@/infrastructure/integrations/nestjs/application/domain/app.service";
import { InfrastructureModule, SearchModule } from "@/shared-antigo";

@Module({
  imports: [SearchModule, ResourcesModule, InfrastructureModule],
  controllers: [DocsController, AppController],
  providers: [AppService],
})
export class AppModule {}
