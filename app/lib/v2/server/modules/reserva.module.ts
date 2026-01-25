import { Module } from "@nestjs/common";
import { ReservaController } from "@/v2/adapters/in/http/reserva/reserva.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { ReservaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { ReservaService } from "@/v2/core/reserva/application/use-cases/reserva.service";
import { AmbienteModule } from "@/v2/server/modules/ambiente.module";
import { UsuarioModule } from "@/v2/server/modules/usuario.module";

/**
 * Módulo Reserva configurado com Arquitetura Hexagonal
 * - ReservaService: Implementa casos de uso (porta de entrada)
 * - ReservaTypeOrmRepositoryAdapter: Implementa IReservaRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [UsuarioModule, AmbienteModule],
  controllers: [ReservaController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IReservaRepositoryPort",
      useClass: ReservaTypeOrmRepositoryAdapter,
    },
    ReservaService,
  ],
  exports: [ReservaService],
})
export class ReservaModule {}
