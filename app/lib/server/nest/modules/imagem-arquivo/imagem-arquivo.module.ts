import { Global, Module } from "@nestjs/common";
import { IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT } from "@/core/imagem-arquivo/application/ports";
import { ImagemArquivoService } from "@/core/imagem-arquivo/application/use-cases/imagem-arquivo.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    ImagemArquivoService,
    {
      provide: IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT,
      useValue: null, // TODO: Implement ImagemArquivoQueryTypeOrmRepositoryAdapter
    },
  ],
  exports: [ImagemArquivoService],
})
export class ImagemArquivoModule {}
