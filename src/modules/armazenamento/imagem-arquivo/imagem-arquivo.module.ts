import { Global, Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { IMAGEM_ARQUIVO_QUERY_REPOSITORY_PORT } from "@/modules/armazenamento/imagem-arquivo/application/ports";
import { ImagemArquivoService } from "@/modules/armazenamento/imagem-arquivo/application/use-cases/imagem-arquivo.service";
import {
  ImagemArquivoFindOneQueryHandlerImpl,
  ImagemArquivoListQueryHandlerImpl,
} from "@/modules/armazenamento/imagem-arquivo/application/use-cases/queries";
import {
  IImagemArquivoFindOneQueryHandler,
  IImagemArquivoListQueryHandler,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries";
import { ImagemArquivoQueryTypeOrmRepositoryAdapter } from "@/modules/armazenamento/imagem-arquivo/infrastructure/persistence/typeorm";
import { ImagemArquivoGraphqlResolver } from "@/modules/armazenamento/imagem-arquivo/presentation/graphql/imagem-arquivo.graphql.resolver";

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
    // Queries
    { provide: IImagemArquivoListQueryHandler, useClass: ImagemArquivoListQueryHandlerImpl },
    { provide: IImagemArquivoFindOneQueryHandler, useClass: ImagemArquivoFindOneQueryHandlerImpl },
  ],
  exports: [ImagemArquivoService],
})
export class ImagemArquivoModule {}
