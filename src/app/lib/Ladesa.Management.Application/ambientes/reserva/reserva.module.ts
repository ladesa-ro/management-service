import { Module } from "@nestjs/common";
import { UsuarioModule } from "@/Ladesa.Management.Application/acesso/usuario/usuario.module";
import { AmbienteModule } from "@/Ladesa.Management.Application/ambientes/ambiente/ambiente.module";
import {
  IReservaRepository,
  ReservaService,
} from "@/Ladesa.Management.Application/ambientes/reserva";
import { ReservaAuthzRegistrySetup } from "@/Ladesa.Management.Application/ambientes/reserva/infrastructure";
import { ReservaTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ambientes/reserva/infrastructure/persistence/typeorm";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { ReservaGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/ReservaGraphqlResolver";
import { ReservaRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/ReservaRestController";

/**
 * Módulo Reserva configurado com Arquitetura Hexagonal
 * - ReservaService: Implementa casos de uso (porta de entrada)
 * - ReservaTypeOrmRepositoryAdapter: Implementa IReservaRepository (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [UsuarioModule, AmbienteModule],
  controllers: [ReservaRestController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: IReservaRepository,
      useClass: ReservaTypeOrmRepositoryAdapter,
    },
    ReservaService,
    ReservaGraphqlResolver,
    ReservaAuthzRegistrySetup,
  ],
  exports: [ReservaService],
})
export class ReservaModule {}
