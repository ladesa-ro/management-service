import { Module } from "@nestjs/common";
import { AulaController } from "@/v2/adapters/in/http/aula/aula.controller";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { AulaTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { AulaService } from "@/v2/core/aula/application/use-cases/aula.service";
import { AmbienteModule } from "@/v2/server/modules/ambiente.module";
import { DiarioModule } from "@/v2/server/modules/diario.module";
import { IntervaloDeTempoModule } from "@/v2/server/modules/intervalo-de-tempo.module";

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
      provide: "IAulaRepositoryPort",
      useClass: AulaTypeOrmRepositoryAdapter,
    },
    AulaService,
  ],
  exports: [AulaService],
})
export class AulaModule {}
