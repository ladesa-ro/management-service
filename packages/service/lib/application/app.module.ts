import { Module } from "@nestjs/common";
import { SearchModule } from "@/application/helpers/search.module";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";
import { AppController } from "./app.controller";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";
import { DocsController } from "./docs.controller";
import { ResourcesModule } from "./resources/resources.module";

@Module({
  imports: [SearchModule, ResourcesModule, InfrastructureModule],
  controllers: [DocsController, AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
