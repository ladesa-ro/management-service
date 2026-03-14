import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import { DISCIPLINA_REPOSITORY_PORT } from "@/modules/ensino/disciplina/application/ports";
import {
  DisciplinaCreateCommandHandlerImpl,
  DisciplinaDeleteCommandHandlerImpl,
  DisciplinaUpdateCommandHandlerImpl,
  DisciplinaUpdateImagemCapaCommandHandlerImpl,
} from "@/modules/ensino/disciplina/application/use-cases/commands";
import { DisciplinaService } from "@/modules/ensino/disciplina/application/use-cases/disciplina.service";
import {
  DisciplinaFindOneQueryHandlerImpl,
  DisciplinaGetImagemCapaQueryHandlerImpl,
  DisciplinaListQueryHandlerImpl,
} from "@/modules/ensino/disciplina/application/use-cases/queries";
import {
  IDisciplinaCreateCommandHandler,
  IDisciplinaDeleteCommandHandler,
  IDisciplinaUpdateCommandHandler,
  IDisciplinaUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/disciplina/domain/commands";
import {
  IDisciplinaFindOneQueryHandler,
  IDisciplinaGetImagemCapaQueryHandler,
  IDisciplinaListQueryHandler,
} from "@/modules/ensino/disciplina/domain/queries";
import {
  DisciplinaAuthzRegistrySetup,
  DisciplinaTypeOrmRepositoryAdapter,
} from "@/modules/ensino/disciplina/infrastructure";
import { DisciplinaGraphqlResolver } from "@/modules/ensino/disciplina/presentation/graphql/disciplina.graphql.resolver";
import { DisciplinaRestController } from "@/modules/ensino/disciplina/presentation/rest/disciplina.rest.controller";

@Module({
  imports: [ImagemModule, ArquivoModule],
  controllers: [DisciplinaRestController],
  providers: [
    NestJsPaginateAdapter,
    DisciplinaService,
    DisciplinaGraphqlResolver,
    DisciplinaAuthzRegistrySetup,
    {
      provide: DISCIPLINA_REPOSITORY_PORT,
      useClass: DisciplinaTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: IDisciplinaCreateCommandHandler, useClass: DisciplinaCreateCommandHandlerImpl },
    { provide: IDisciplinaUpdateCommandHandler, useClass: DisciplinaUpdateCommandHandlerImpl },
    { provide: IDisciplinaDeleteCommandHandler, useClass: DisciplinaDeleteCommandHandlerImpl },
    {
      provide: IDisciplinaUpdateImagemCapaCommandHandler,
      useClass: DisciplinaUpdateImagemCapaCommandHandlerImpl,
    },
    // Queries
    { provide: IDisciplinaListQueryHandler, useClass: DisciplinaListQueryHandlerImpl },
    { provide: IDisciplinaFindOneQueryHandler, useClass: DisciplinaFindOneQueryHandlerImpl },
    {
      provide: IDisciplinaGetImagemCapaQueryHandler,
      useClass: DisciplinaGetImagemCapaQueryHandlerImpl,
    },
  ],
  exports: [DisciplinaService],
})
export class DisciplinaModule {}
