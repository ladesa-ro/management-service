import { Global, Module } from "@nestjs/common";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import {
  ImagemSaveImageCommandHandlerImpl,
  ImagemSaveImagemCapaCommandHandlerImpl,
} from "@/modules/armazenamento/imagem/application/commands";
import { ImagemGetLatestArquivoIdQueryHandlerImpl } from "@/modules/armazenamento/imagem/application/queries";
import {
  IImagemSaveImageCommandHandler,
  IImagemSaveImagemCapaCommandHandler,
} from "@/modules/armazenamento/imagem/domain/commands";
import { IImagemGetLatestArquivoIdQueryHandler } from "@/modules/armazenamento/imagem/domain/queries";
import {
  IImagemArquivoRepository,
  IMAGEM_ITransaction,
} from "@/modules/armazenamento/imagem/domain/repositories";
import { ImagemTypeOrmRepositoryAdapter } from "@/modules/armazenamento/imagem/infrastructure/persistence/typeorm";
import { ImagemArquivoTypeOrmRepositoryAdapter } from "@/modules/armazenamento/imagem-arquivo/infrastructure/persistence/typeorm";

@Global()
@Module({
  imports: [ArquivoModule],
  controllers: [],
  providers: [
    {
      provide: IMAGEM_ITransaction,
      useClass: ImagemTypeOrmRepositoryAdapter,
    },
    {
      provide: IImagemArquivoRepository,
      useClass: ImagemArquivoTypeOrmRepositoryAdapter,
    },
    {
      provide: IImagemSaveImageCommandHandler,
      useClass: ImagemSaveImageCommandHandlerImpl,
    },
    {
      provide: IImagemSaveImagemCapaCommandHandler,
      useClass: ImagemSaveImagemCapaCommandHandlerImpl,
    },
    {
      provide: IImagemGetLatestArquivoIdQueryHandler,
      useClass: ImagemGetLatestArquivoIdQueryHandlerImpl,
    },
  ],
  exports: [
    IImagemSaveImageCommandHandler,
    IImagemSaveImagemCapaCommandHandler,
    IImagemGetLatestArquivoIdQueryHandler,
  ],
})
export class ImagemModule {}
