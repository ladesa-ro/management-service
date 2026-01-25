import { Global, Module } from "@nestjs/common";
import { ImagemTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import { ArquivoModule } from "../arquivo/arquivo.module";

/**
 * Módulo Imagem configurado com Arquitetura Hexagonal
 * - ImagemService: Implementa casos de uso (porta de entrada)
 * - ImagemTypeOrmRepositoryAdapter: Implementa IImagemTransactionPort (porta de saída)
 */
@Global()
@Module({
  imports: [ArquivoModule],
  controllers: [],
  providers: [
    {
      provide: "IImagemTransactionPort",
      useClass: ImagemTypeOrmRepositoryAdapter,
    },
    ImagemService,
  ],
  exports: [ImagemService],
})
export class ImagemModule {}
