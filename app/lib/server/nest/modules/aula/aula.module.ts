import { Module } from "@nestjs/common";
import { AULA_REPOSITORY_PORT } from "@/core/aula/application/ports";
import { AulaService } from "@/core/aula/application/use-cases/aula.service";
import { AmbienteModule } from "@/server/nest/modules/ambiente";
import { DiarioModule } from "@/server/nest/modules/diario";
import { IntervaloDeTempoModule } from "@/server/nest/modules/intervalo-de-tempo";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { AulaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
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
  ],
  exports: [AulaService],
})
export class AulaModule {}
