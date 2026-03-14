import { Global, Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  ImagemArquivoFindOneQueryHandlerImpl,
  ImagemArquivoListQueryHandlerImpl,
} from "@/modules/armazenamento/imagem-arquivo/application/use-cases/queries";
import {
  IImagemArquivoFindOneQueryHandler,
  IImagemArquivoListQueryHandler,
} from "@/modules/armazenamento/imagem-arquivo/domain/queries";
import { IImagemArquivoQueryRepository } from "@/modules/armazenamento/imagem-arquivo/domain/repositories";
import { ImagemArquivoQueryTypeOrmRepositoryAdapter } from "@/modules/armazenamento/imagem-arquivo/infrastructure/persistence/typeorm";
import { ImagemArquivoGraphqlResolver } from "@/modules/armazenamento/imagem-arquivo/presentation/graphql/imagem-arquivo.graphql.resolver";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    NestJsPaginateAdapter,
    ImagemArquivoGraphqlResolver,
    {
      provide: IImagemArquivoQueryRepository,
      useClass: ImagemArquivoQueryTypeOrmRepositoryAdapter,
    },
    // Queries
    { provide: IImagemArquivoListQueryHandler, useClass: ImagemArquivoListQueryHandlerImpl },
    { provide: IImagemArquivoFindOneQueryHandler, useClass: ImagemArquivoFindOneQueryHandlerImpl },
  ],
  exports: [],
})
export class ImagemArquivoModule {}
