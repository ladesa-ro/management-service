import { Module } from "@nestjs/common";
import { EstadoApplicationService } from "@/features/estado/application/estado-application-service";
import { EstadoRepositoryProvider } from "@/features/estado/infrastructure/estado.repository.provider";
import { EstadoController } from "@/features/estado/presentation/rest/estado.controller";

@Module({
  imports: [],
  providers: [EstadoApplicationService, EstadoRepositoryProvider],
  exports: [EstadoApplicationService],
  controllers: [EstadoController],
})
export class EstadoModule {
}
