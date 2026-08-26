import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { EstagioModule } from "@/modules/estagio/estagio/estagio.module";
import {
  RelatorioCreateCommandHandlerImpl,
  RelatorioDeleteCommandHandlerImpl,
  RelatorioUpdateCommandHandlerImpl,
  RelatorioUploadPdfCommandHandlerImpl,
} from "./application/commands";
import {
  RelatorioFindByEstagioQueryHandlerImpl,
  RelatorioFindOneQueryHandlerImpl,
  RelatorioGetPdfQueryHandlerImpl,
  RelatorioListQueryHandlerImpl,
} from "./application/queries";
import {
  IRelatorioCreateCommandHandler,
  IRelatorioDeleteCommandHandler,
  IRelatorioUpdateCommandHandler,
  IRelatorioUploadPdfCommandHandler,
} from "./domain/commands";
import {
  IRelatorioFindByEstagioQueryHandler,
  IRelatorioFindOneQueryHandler,
  IRelatorioGetPdfQueryHandler,
  IRelatorioListQueryHandler,
} from "./domain/queries";
import { IRelatorioEstagioRepository } from "./domain/repositories";
import { RelatorioEstagioTypeOrmRepositoryAdapter } from "./infrastructure.database/relatorio.repository";
import { EstagioRelatorioRestController, RelatorioRestController } from "./presentation.rest";

@Module({
  imports: [EstagioModule, ArquivoModule],
  controllers: [RelatorioRestController, EstagioRelatorioRestController],
  providers: [
    NestJsPaginateAdapter,
    {
      provide: IRelatorioEstagioRepository,
      useClass: RelatorioEstagioTypeOrmRepositoryAdapter,
    },

    // Commands
    {
      provide: IRelatorioCreateCommandHandler,
      useClass: RelatorioCreateCommandHandlerImpl,
    },
    {
      provide: IRelatorioUpdateCommandHandler,
      useClass: RelatorioUpdateCommandHandlerImpl,
    },
    {
      provide: IRelatorioDeleteCommandHandler,
      useClass: RelatorioDeleteCommandHandlerImpl,
    },
    {
      provide: IRelatorioUploadPdfCommandHandler,
      useClass: RelatorioUploadPdfCommandHandlerImpl,
    },

    // Queries
    {
      provide: IRelatorioFindOneQueryHandler,
      useClass: RelatorioFindOneQueryHandlerImpl,
    },
    {
      provide: IRelatorioFindByEstagioQueryHandler,
      useClass: RelatorioFindByEstagioQueryHandlerImpl,
    },
    {
      provide: IRelatorioGetPdfQueryHandler,
      useClass: RelatorioGetPdfQueryHandlerImpl,
    },
    {
      provide: IRelatorioListQueryHandler,
      useClass: RelatorioListQueryHandlerImpl,
    },
  ],
  exports: [
    IRelatorioEstagioRepository,
    IRelatorioFindOneQueryHandler,
    IRelatorioFindByEstagioQueryHandler,
    IRelatorioGetPdfQueryHandler,
    IRelatorioListQueryHandler,
    IRelatorioCreateCommandHandler,
    IRelatorioUpdateCommandHandler,
    IRelatorioDeleteCommandHandler,
    IRelatorioUploadPdfCommandHandler,
  ],
})
export class RelatorioEstagioModule {}
