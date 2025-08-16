import { Module } from "@nestjs/common";
import { SearchModule } from "@/application/helpers/search.module";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";
import { ResourcesModule } from "./resources/resources.module";
import { DocsController } from "./docs.controller";

@Module({
  imports: [SearchModule, ResourcesModule, InfrastructureModule],
  controllers: [DocsController, AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
