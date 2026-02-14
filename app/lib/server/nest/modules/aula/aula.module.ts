import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AULA_REPOSITORY_PORT } from "@/modules/sisgha/aula/application/ports";
import { AulaService } from "@/modules/sisgha/aula/application/use-cases/aula.service";
import { AulaAuthzRegistrySetup } from "@/modules/sisgha/aula/infrastructure";
import { AulaTypeOrmRepositoryAdapter } from "@/modules/sisgha/aula/infrastructure/persistence/typeorm";
import { AmbienteModule } from "@/server/nest/modules/ambiente";
import { DiarioModule } from "@/server/nest/modules/diario";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";
import { AulaGraphqlResolver } from "./graphql/aula.graphql.resolver";
import { AulaController } from "./rest";

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
