import { Global, Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT } from "@/modules/base/armazenamento/imagem-arquivo/application/ports";
import { ImagemArquivoService } from "@/modules/base/armazenamento/imagem-arquivo/application/use-cases/imagem-arquivo.service";
import { ImagemArquivoQueryTypeOrmRepositoryAdapter } from "@/modules/base/armazenamento/imagem-arquivo/infrastructure/persistence/typeorm";
import { ImagemArquivoGraphqlResolver } from "./graphql/imagem-arquivo.graphql.resolver";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    NestJsPaginateAdapter,
    ImagemArquivoService,
    ImagemArquivoGraphqlResolver,
    {
      provide: IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT,
      useClass: ImagemArquivoQueryTypeOrmRepositoryAdapter,
    },
  ],
  exports: [ImagemArquivoService],
})
export class ImagemArquivoModule {}
