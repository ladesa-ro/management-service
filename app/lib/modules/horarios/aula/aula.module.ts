import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AmbienteModule } from "@/modules/ambientes/ambiente";
import { DiarioModule } from "@/modules/ensino/diario";
import { AULA_REPOSITORY_PORT } from "@/modules/horarios/aula/application/ports";
import { AulaService } from "@/modules/horarios/aula/application/use-cases/aula.service";
import { AulaAuthzRegistrySetup } from "@/modules/horarios/aula/infrastructure";
import { AulaTypeOrmRepositoryAdapter } from "@/modules/horarios/aula/infrastructure/persistence/typeorm";
import { AulaGraphqlResolver } from "@/modules/horarios/aula/presentation/graphql/aula.graphql.resolver";
import { AulaController } from "@/modules/horarios/aula/presentation/rest";
import { IntervaloDeTempoModule } from "@/modules/horarios/intervalo-de-tempo";

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
