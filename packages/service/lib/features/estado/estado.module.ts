import { Module } from "@nestjs/common";
import { EstadoApplicationService } from "@/features/estado/application/estado-application-service";
import { EstadoRepositoryProvider } from "@/features/estado/infrastructure/estado.repository.provider";
import { EstadoListRoute } from "@/features/estado/presentation";
import { EstadoFindOneByIdRoute } from "@/features/estado/presentation/rest/estado-find-one-by-id.route";
import { EstadoController } from "@/features/estado/presentation/rest/nestjs/estado.controller";

@Module({
  imports: [],
  providers: [EstadoApplicationService, EstadoRepositoryProvider, EstadoListRoute, EstadoFindOneByIdRoute],
  exports: [EstadoApplicationService],
  controllers: [EstadoController],
})
export class EstadoModule {}
