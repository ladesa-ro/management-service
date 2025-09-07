import { Module } from "@nestjs/common";
import { CidadeApplicationService } from "./application/services/cidade.application-service";
import { CidadeRepositoryProvider } from "./infrastructure/providers/cidade.repository.provider";
import { CidadeListRoute } from "./presentation";
import { CidadeFindOneByIdRoute } from "./presentation/rest/routes/cidade-find-one-by-id.route";
import { CidadeController } from "./presentation/rest/nestjs/cidade.controller";

@Module({
  imports: [],
  providers: [CidadeApplicationService, CidadeRepositoryProvider, CidadeListRoute, CidadeFindOneByIdRoute],
  exports: [CidadeApplicationService],
  controllers: [CidadeController],
})
export class CidadeModule {
}
