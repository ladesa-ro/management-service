import { Global, Module } from "@nestjs/common";
import { IStorageService } from "@/domain/abstractions/storage";
import { FilesystemStorageService } from "@/infrastructure.storage";
import { ArquivoCreateCommandHandlerImpl } from "@/modules/armazenamento/arquivo/application/commands";
import { ArquivoGetStreamableFileQueryHandlerImpl } from "@/modules/armazenamento/arquivo/application/queries";
import { IArquivoCreateCommandHandler } from "@/modules/armazenamento/arquivo/domain/commands";
import { IArquivoGetStreamableFileQueryHandler } from "@/modules/armazenamento/arquivo/domain/queries";
import { IArquivoRepository } from "@/modules/armazenamento/arquivo/domain/repositories";
import { ArquivoTypeOrmRepositoryAdapter } from "@/modules/armazenamento/arquivo/infrastructure.database";
import { ArquivoRestController } from "@/modules/armazenamento/arquivo/presentation.rest/arquivo.rest.controller";

@Global()
@Module({
  imports: [],
  controllers: [ArquivoRestController],
  providers: [
    {
      provide: IStorageService,
      useClass: FilesystemStorageService,
    },
    {
      provide: IArquivoRepository,
      useClass: ArquivoTypeOrmRepositoryAdapter,
    },
    {
      provide: IArquivoGetStreamableFileQueryHandler,
      useClass: ArquivoGetStreamableFileQueryHandlerImpl,
    },
    {
      provide: IArquivoCreateCommandHandler,
      useClass: ArquivoCreateCommandHandlerImpl,
    },
  ],
  exports: [IStorageService, IArquivoGetStreamableFileQueryHandler, IArquivoCreateCommandHandler],
})
export class ArquivoModule {}
