import { Module } from "@nestjs/common";
import { EstadoApplicationService } from "@/features/estado/application/services/estado-application-service";
import { EstadoRepositoryProvider } from "@/features/estado/infrastructure/providers/estado.repository.provider";
import { EstadoListRoute } from "@/features/estado/presentation";
import { EstadoController } from "@/features/estado/presentation/rest/nestjs/estado.controller";
import { EstadoFindOneByIdRoute } from "@/features/estado/presentation/rest/routes/estado-find-one-by-id.route";

@Module({
  imports: [],
  providers: [EstadoApplicationService, EstadoRepositoryProvider, EstadoListRoute, EstadoFindOneByIdRoute],
  exports: [EstadoApplicationService],
  controllers: [EstadoController],
})
export class EstadoModule {
}
