import { Module } from "@nestjs/common";
import { AmbienteModule } from "@/Ladesa.Management.Application/ambientes/ambiente/ambiente.module";
import { DiarioModule } from "@/Ladesa.Management.Application/ensino/diario/diario.module";
import { AULA_REPOSITORY_PORT } from "@/Ladesa.Management.Application/horarios/aula/application/ports";
import { AulaService } from "@/Ladesa.Management.Application/horarios/aula/application/use-cases/aula.service";
import { AulaAuthzRegistrySetup } from "@/Ladesa.Management.Application/horarios/aula/infrastructure";
import { AulaTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/horarios/aula/infrastructure/persistence/typeorm";
import { AulaGraphqlResolver } from "@/Ladesa.Management.Application/horarios/aula/presentation/graphql/aula.graphql.resolver";
import { AulaController } from "@/Ladesa.Management.Application/horarios/aula/presentation/rest";
import { IntervaloDeTempoModule } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/intervalo-de-tempo.module";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

/**
 * Módulo Aula configurado com Arquitetura Hexagonal
 * - AulaService: Implementa casos de uso (porta de entrada)
 * - AulaTypeOrmRepositoryAdapter: Implementa IAulaRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [DiarioModule, AmbienteModule, IntervaloDeTempoModule],
  controllers: [AulaController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: AULA_REPOSITORY_PORT,
      useClass: AulaTypeOrmRepositoryAdapter,
    },
    AulaService,
    AulaGraphqlResolver,
    AulaAuthzRegistrySetup,
  ],
  exports: [AulaService],
})
export class AulaModule {}
