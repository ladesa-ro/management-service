import { Global, Module } from "@nestjs/common";
import { ArquivoModule } from "@/Ladesa.Management.Application/armazenamento/arquivo/arquivo.module";
import {
  IImagemArquivoRepository,
  IImagemTransaction,
} from "@/Ladesa.Management.Application/armazenamento/imagem/application/ports";
import { ImagemService } from "@/Ladesa.Management.Application/armazenamento/imagem/application/use-cases/imagem.service";
import { ImagemTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/armazenamento/imagem/infrastructure/persistence/typeorm";
import { ImagemArquivoTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo/infrastructure/persistence/typeorm";

/**
 * Modulo Imagem configurado com Arquitetura Hexagonal
 * - ImagemService: Implementa casos de uso (porta de entrada)
 * - ImagemTypeOrmRepositoryAdapter: Implementa IImagemTransaction (porta de saida)
 * - ImagemArquivoTypeOrmRepositoryAdapter: Implementa IImagemArquivoRepository (porta de saida)
 */
@Global()
@Module({
  imports: [ArquivoModule],
  controllers: [],
  providers: [
    {
      provide: IImagemTransaction,
      useClass: ImagemTypeOrmRepositoryAdapter,
    },
    {
      provide: IImagemArquivoRepository,
      useClass: ImagemArquivoTypeOrmRepositoryAdapter,
    },
    ImagemService,
  ],
  exports: [ImagemService],
})
export class ImagemModule {}
