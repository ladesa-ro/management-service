import { Module } from "@nestjs/common";
import { AmbienteService } from "@/v2/core/ambiente/application/use-cases/ambiente.service";
import { BlocoModule } from "../bloco/bloco.module";
import { AmbienteController } from "@/v2/adapters/in/http/ambiente/ambiente.controller";
import { AmbienteTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";

/**
 * Módulo Ambiente configurado com Arquitetura Hexagonal
 * - AmbienteService: Implementa casos de uso (porta de entrada)
 * - AmbienteTypeOrmRepositoryAdapter: Implementa IAmbienteRepositoryPort (porta de saída)
 * - NestJsPaginateAdapter: Adapter de paginação com nestjs-paginate
 */
@Module({
  imports: [BlocoModule],
  controllers: [AmbienteController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: "IAmbienteRepositoryPort",
      useClass: AmbienteTypeOrmRepositoryAdapter,
    },
    AmbienteService,
  ],
  exports: [AmbienteService],
})
export class AmbienteModule {}
