import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { UsuarioModule } from "@/modules/acesso/usuario/usuario.module";
import { AmbienteModule } from "@/modules/ambientes/ambiente/ambiente.module";
import { RESERVA_REPOSITORY_PORT, ReservaService } from "@/modules/ambientes/reserva";
import {
  ReservaCreateCommandHandlerImpl,
  ReservaDeleteCommandHandlerImpl,
  ReservaUpdateCommandHandlerImpl,
} from "@/modules/ambientes/reserva/application/use-cases/commands";
import {
  ReservaFindOneQueryHandlerImpl,
  ReservaListQueryHandlerImpl,
} from "@/modules/ambientes/reserva/application/use-cases/queries";
import {
  IReservaCreateCommandHandler,
  IReservaDeleteCommandHandler,
  IReservaUpdateCommandHandler,
} from "@/modules/ambientes/reserva/domain/commands";
import {
  IReservaFindOneQueryHandler,
  IReservaListQueryHandler,
} from "@/modules/ambientes/reserva/domain/queries";
import { ReservaAuthzRegistrySetup } from "@/modules/ambientes/reserva/infrastructure";
import { ReservaTypeOrmRepositoryAdapter } from "@/modules/ambientes/reserva/infrastructure/persistence/typeorm";
import { ReservaGraphqlResolver } from "@/modules/ambientes/reserva/presentation/graphql/reserva.graphql.resolver";
import { ReservaRestController } from "@/modules/ambientes/reserva/presentation/rest";

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
    ReservaGraphqlResolver,
    ReservaAuthzRegistrySetup,

    // Commands
    { provide: IReservaCreateCommandHandler, useClass: ReservaCreateCommandHandlerImpl },
    { provide: IReservaUpdateCommandHandler, useClass: ReservaUpdateCommandHandlerImpl },
    { provide: IReservaDeleteCommandHandler, useClass: ReservaDeleteCommandHandlerImpl },
    // Queries
    { provide: IReservaListQueryHandler, useClass: ReservaListQueryHandlerImpl },
    { provide: IReservaFindOneQueryHandler, useClass: ReservaFindOneQueryHandlerImpl },
  ],
  exports: [ReservaService],
})
export class ReservaModule {}
