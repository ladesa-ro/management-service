import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AmbienteModule } from "@/modules/ambientes/ambiente/ambiente.module";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import { CursoModule } from "@/modules/ensino/curso/curso.module";
import {
  TurmaCreateCommandHandlerImpl,
  TurmaDeleteCommandHandlerImpl,
  TurmaUpdateCommandHandlerImpl,
  TurmaUpdateImagemCapaCommandHandlerImpl,
} from "@/modules/ensino/turma/application/use-cases/commands";
import {
  TurmaFindOneQueryHandlerImpl,
  TurmaGetImagemCapaQueryHandlerImpl,
  TurmaListQueryHandlerImpl,
} from "@/modules/ensino/turma/application/use-cases/queries";
import {
  ITurmaCreateCommandHandler,
  ITurmaDeleteCommandHandler,
  ITurmaUpdateCommandHandler,
  ITurmaUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/turma/domain/commands";
import {
  ITurmaFindOneQueryHandler,
  ITurmaGetImagemCapaQueryHandler,
  ITurmaListQueryHandler,
} from "@/modules/ensino/turma/domain/queries";
import { ITurmaRepository } from "@/modules/ensino/turma/domain/repositories";
import {
  TurmaAuthzRegistrySetup,
  TurmaTypeOrmRepositoryAdapter,
} from "@/modules/ensino/turma/infrastructure";
import { TurmaGraphqlResolver } from "@/modules/ensino/turma/presentation/graphql/turma.graphql.resolver";
import { TurmaRestController } from "@/modules/ensino/turma/presentation/rest/turma.rest.controller";

@Module({
  imports: [AmbienteModule, CursoModule, ImagemModule, ArquivoModule],
  controllers: [TurmaRestController],
  providers: [
    NestJsPaginateAdapter,
    TurmaGraphqlResolver,
    TurmaAuthzRegistrySetup,
    {
      provide: ITurmaRepository,
      useClass: TurmaTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: ITurmaCreateCommandHandler, useClass: TurmaCreateCommandHandlerImpl },
    { provide: ITurmaUpdateCommandHandler, useClass: TurmaUpdateCommandHandlerImpl },
    { provide: ITurmaDeleteCommandHandler, useClass: TurmaDeleteCommandHandlerImpl },
    {
      provide: ITurmaUpdateImagemCapaCommandHandler,
      useClass: TurmaUpdateImagemCapaCommandHandlerImpl,
    },
    // Queries
    { provide: ITurmaListQueryHandler, useClass: TurmaListQueryHandlerImpl },
    { provide: ITurmaFindOneQueryHandler, useClass: TurmaFindOneQueryHandlerImpl },
    { provide: ITurmaGetImagemCapaQueryHandler, useClass: TurmaGetImagemCapaQueryHandlerImpl },
  ],
  exports: [ITurmaFindOneQueryHandler],
})
export class TurmaModule {}
