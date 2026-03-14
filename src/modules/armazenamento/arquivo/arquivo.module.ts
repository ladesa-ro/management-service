import { Global, Module } from "@nestjs/common";
import { ArquivoCreateCommandHandlerImpl } from "@/modules/armazenamento/arquivo/application/commands";
import { ArquivoGetStreamableFileQueryHandlerImpl } from "@/modules/armazenamento/arquivo/application/queries";
import { IArquivoCreateCommandHandler } from "@/modules/armazenamento/arquivo/domain/commands";
import { IArquivoGetStreamableFileQueryHandler } from "@/modules/armazenamento/arquivo/domain/queries";
import { IArquivoRepository } from "@/modules/armazenamento/arquivo/domain/repositories";
import { ArquivoTypeOrmRepositoryAdapter } from "@/modules/armazenamento/arquivo/infrastructure/persistence/typeorm";
import { ArquivoRestController } from "@/modules/armazenamento/arquivo/presentation/rest/arquivo.rest.controller";

@Global()
@Module({
  imports: [],
  controllers: [ArquivoRestController],
  providers: [
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
  exports: [IArquivoGetStreamableFileQueryHandler, IArquivoCreateCommandHandler],
})
export class ArquivoModule {}
