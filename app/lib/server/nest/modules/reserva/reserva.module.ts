import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { ReservaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { ReservaService, RESERVA_REPOSITORY_PORT } from "@/core/reserva";
import { AmbienteModule } from "@/server/nest/modules/ambiente";
import { UsuarioModule } from "@/v2/server/modules/usuario";
import { ReservaRestController } from "./rest";

/**
 * Módulo Reserva configurado com Arquitetura Hexagonal
 * - ReservaService: Implementa casos de uso (porta de entrada)
 * - ReservaTypeOrmRepositoryAdapter: Implementa IReservaRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [UsuarioModule, AmbienteModule],
  controllers: [ReservaRestController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: RESERVA_REPOSITORY_PORT,
      useClass: ReservaTypeOrmRepositoryAdapter,
    },
    ReservaService,
  ],
  exports: [ReservaService],
})
export class ReservaModule {}
