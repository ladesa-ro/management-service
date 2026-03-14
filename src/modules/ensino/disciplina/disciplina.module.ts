import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import { DisciplinaPermissionCheckerImpl } from "@/modules/ensino/disciplina/application/authorization";
import {
  DisciplinaCreateCommandHandlerImpl,
  DisciplinaDeleteCommandHandlerImpl,
  DisciplinaUpdateCommandHandlerImpl,
  DisciplinaUpdateImagemCapaCommandHandlerImpl,
} from "@/modules/ensino/disciplina/application/commands";
import {
  DisciplinaFindOneQueryHandlerImpl,
  DisciplinaGetImagemCapaQueryHandlerImpl,
  DisciplinaListQueryHandlerImpl,
} from "@/modules/ensino/disciplina/application/queries";
import { IDisciplinaPermissionChecker } from "@/modules/ensino/disciplina/domain/authorization";
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
import { IDisciplinaRepository } from "@/modules/ensino/disciplina/domain/repositories";
import { DisciplinaTypeOrmRepositoryAdapter } from "@/modules/ensino/disciplina/infrastructure";
import { DisciplinaGraphqlResolver } from "@/modules/ensino/disciplina/presentation/graphql/disciplina.graphql.resolver";
import { DisciplinaRestController } from "@/modules/ensino/disciplina/presentation/rest/disciplina.rest.controller";

@Module({
  imports: [ImagemModule, ArquivoModule],
  controllers: [DisciplinaRestController],
  providers: [
    NestJsPaginateAdapter,
    DisciplinaGraphqlResolver,
    {
      provide: IDisciplinaRepository,
      useClass: DisciplinaTypeOrmRepositoryAdapter,
    },
    { provide: IDisciplinaPermissionChecker, useClass: DisciplinaPermissionCheckerImpl },

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
  exports: [IDisciplinaFindOneQueryHandler],
})
export class DisciplinaModule {}
