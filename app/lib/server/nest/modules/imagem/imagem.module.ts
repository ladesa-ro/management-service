import { Global, Module } from "@nestjs/common";
import {
  IMAGEM_ARQUIVO_REPOSITORY_PORT,
  IMAGEM_TRANSACTION_PORT,
} from "@/modules/imagem/application/ports";
import { ImagemService } from "@/modules/imagem/application/use-cases/imagem.service";
import { ImagemTypeOrmRepositoryAdapter } from "@/modules/imagem/infrastructure/persistence/typeorm";
import { ImagemArquivoTypeOrmRepositoryAdapter } from "@/modules/imagem-arquivo/infrastructure/persistence/typeorm";
import { ArquivoModule } from "@/server/nest/modules/arquivo";

/**
 * Modulo Imagem configurado com Arquitetura Hexagonal
 * - ImagemService: Implementa casos de uso (porta de entrada)
 * - ImagemTypeOrmRepositoryAdapter: Implementa IImagemTransactionPort (porta de saida)
 * - ImagemArquivoTypeOrmRepositoryAdapter: Implementa IImagemArquivoRepositoryPort (porta de saida)
 */
@Global()
@Module({
  imports: [ArquivoModule],
  controllers: [],
  providers: [
    {
      provide: IMAGEM_TRANSACTION_PORT,
      useClass: ImagemTypeOrmRepositoryAdapter,
    },
    {
      provide: IMAGEM_ARQUIVO_REPOSITORY_PORT,
      useClass: ImagemArquivoTypeOrmRepositoryAdapter,
    },
    ImagemService,
  ],
  exports: [ImagemService],
})
export class ImagemModule {}
