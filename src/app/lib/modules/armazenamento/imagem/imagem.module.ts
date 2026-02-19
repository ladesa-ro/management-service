import { Global, Module } from "@nestjs/common";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import {
  IMAGEM_ARQUIVO_REPOSITORY_PORT,
  IMAGEM_TRANSACTION_PORT,
} from "@/modules/armazenamento/imagem/application/ports";
import { ImagemService } from "@/modules/armazenamento/imagem/application/use-cases/imagem.service";
import { ImagemTypeOrmRepositoryAdapter } from "@/modules/armazenamento/imagem/infrastructure/persistence/typeorm";
import { ImagemArquivoTypeOrmRepositoryAdapter } from "@/modules/armazenamento/imagem-arquivo/infrastructure/persistence/typeorm";

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
