import { Module } from "@nestjs/common";
import { SearchModule } from "@/legacy/application/helpers/search.module";
import { InfrastructureModule } from "@/shared/infrastructure/infrastructure.module";
import { DocsController } from "../modules/docs/docs.controller";
import { AppController } from "./api/app.controller";
import { AppResolver } from "./app.resolver";
import { AppService } from "./domain/app.service";
import { ResourcesModule } from "./resources/resources.module";

@Module({
  imports: [SearchModule, ResourcesModule, InfrastructureModule],
  controllers: [DocsController, AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
