import { Global, Module } from "@nestjs/common";
import { ArquivoController } from "@/v2/adapters/in/http/arquivo/arquivo.controller";
import { ArquivoTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";

/**
 * Módulo Arquivo configurado com Arquitetura Hexagonal
 * - ArquivoService: Implementa casos de uso (porta de entrada)
 * - ArquivoTypeOrmRepositoryAdapter: Implementa IArquivoRepositoryPort (porta de saída)
 */
@Global()
@Module({
  imports: [],
  controllers: [ArquivoController],
  providers: [
    {
      provide: "IArquivoRepositoryPort",
      useClass: ArquivoTypeOrmRepositoryAdapter,
    },
    ArquivoService,
  ],
  exports: [ArquivoService],
})
export class ArquivoModule {}
