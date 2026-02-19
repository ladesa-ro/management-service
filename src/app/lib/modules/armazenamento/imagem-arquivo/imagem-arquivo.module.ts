import { Global, Module } from "@nestjs/common";
import { IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT } from "@/modules/armazenamento/imagem-arquivo/application/ports";
import { ImagemArquivoService } from "@/modules/armazenamento/imagem-arquivo/application/use-cases/imagem-arquivo.service";
import { ImagemArquivoQueryTypeOrmRepositoryAdapter } from "@/modules/armazenamento/imagem-arquivo/infrastructure/persistence/typeorm";
import { ImagemArquivoGraphqlResolver } from "@/modules/armazenamento/imagem-arquivo/presentation/graphql/imagem-arquivo.graphql.resolver";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";

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
