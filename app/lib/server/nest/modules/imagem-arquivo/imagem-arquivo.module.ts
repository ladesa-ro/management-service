import { Global, Module } from "@nestjs/common";
import { IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT } from "@/core/imagem-arquivo/application/ports";
import { ImagemArquivoService } from "@/core/imagem-arquivo/application/use-cases/imagem-arquivo.service";
import { NestJsPaginateAdapter } from "@/v2/adapters/out/persistence/pagination";
import { ImagemArquivoQueryTypeOrmRepositoryAdapter } from "@/v2/adapters/out/persistence/typeorm/adapters";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    NestJsPaginateAdapter,
    ImagemArquivoService,
    {
      provide: IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT,
      useClass: ImagemArquivoQueryTypeOrmRepositoryAdapter,
    },
  ],
  exports: [ImagemArquivoService],
})
export class ImagemArquivoModule {}
