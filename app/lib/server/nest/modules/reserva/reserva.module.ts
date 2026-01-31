import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { RESERVA_REPOSITORY_PORT, ReservaService } from "@/modules/reserva";
import { ReservaTypeOrmRepositoryAdapter } from "@/modules/reserva/infrastructure/persistence/typeorm";
import { AmbienteModule } from "@/server/nest/modules/ambiente";
import { UsuarioModule } from "@/server/nest/modules/usuario";
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
