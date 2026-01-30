import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { AmbienteTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { AmbienteService } from "@/v2/core/ambiente/application/use-cases/ambiente.service";
import { ArquivoModule } from "@/v2/server/modules/arquivo";
import { BlocoModule } from "@/v2/server/modules/bloco";
import { ImagemModule } from "@/v2/server/modules/imagem";
import { AmbienteController } from "./http";

/**
 * Módulo NestJS para Ambiente
 *
 * Responsável por:
 * - Configurar injeção de dependência
 * - Fazer o binding entre ports e adapters
 * - Registrar controller, service e repository
 */
@Module({
  imports: [BlocoModule, ImagemModule, ArquivoModule],
  controllers: [AmbienteController],
  providers: [
    // Adapter de paginação genérico
    NestJsPaginateAdapter,

    // Service (implementa Use Case Port)
    AmbienteService,

    // Binding: Repository Port → TypeORM Adapter
    {
      provide: "IAmbienteRepositoryPort",
      useClass: AmbienteTypeOrmRepositoryAdapter,
    },
  ],
  exports: [AmbienteService],
})
export class AmbienteModule {}
