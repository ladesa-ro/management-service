import { Module } from "@nestjs/common";
import { UsuarioModule } from "@/Ladesa.Management.Application/acesso/usuario/usuario.module";
import { AmbienteModule } from "@/Ladesa.Management.Application/ambientes/ambiente/ambiente.module";
import {
  RESERVA_REPOSITORY_PORT,
  ReservaService,
} from "@/Ladesa.Management.Application/ambientes/reserva";
import { ReservaAuthzRegistrySetup } from "@/Ladesa.Management.Application/ambientes/reserva/infrastructure";
import { ReservaTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ambientes/reserva/infrastructure/persistence/typeorm";
import { ReservaGraphqlResolver } from "@/Ladesa.Management.Application/ambientes/reserva/presentation/graphql/reserva.graphql.resolver";
import { ReservaRestController } from "@/Ladesa.Management.Application/ambientes/reserva/presentation/rest";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
  ],
  exports: [ReservaService],
})
export class ReservaModule {}
