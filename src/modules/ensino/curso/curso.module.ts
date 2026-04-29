import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import {
  ICursoPeriodoDisciplinaRepository,
  ICursoPermissionChecker,
  ICursoRepository,
} from "@/modules/ensino/curso";
import { CursoPermissionCheckerImpl } from "@/modules/ensino/curso/application/authorization";
import {
  CursoCreateCommandHandlerImpl,
  CursoDeleteCommandHandlerImpl,
  CursoUpdateCommandHandlerImpl,
  CursoUpdateImagemCapaCommandHandlerImpl,
} from "@/modules/ensino/curso/application/commands";
import {
  CursoFindOneQueryHandlerImpl,
  CursoGetImagemCapaQueryHandlerImpl,
  CursoListQueryHandlerImpl,
} from "@/modules/ensino/curso/application/queries";
import {
  ICursoCreateCommandHandler,
  ICursoDeleteCommandHandler,
  ICursoUpdateCommandHandler,
  ICursoUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/curso/domain/commands";
import {
  ICursoFindOneQueryHandler,
  ICursoGetImagemCapaQueryHandler,
  ICursoListQueryHandler,
} from "@/modules/ensino/curso/domain/queries";
import {
  CursoPeriodoDisciplinaTypeOrmRepositoryAdapter,
  CursoTypeOrmRepositoryAdapter,
} from "@/modules/ensino/curso/infrastructure.database";
import { CursoGraphqlResolver } from "@/modules/ensino/curso/presentation.graphql/curso.graphql.resolver";
import { CursoRestController } from "@/modules/ensino/curso/presentation.rest/curso.rest.controller";
import { OfertaFormacaoModule } from "@/modules/ensino/oferta-formacao/oferta-formacao.module";

@Module({
  imports: [CampusModule, ImagemModule, ArquivoModule, OfertaFormacaoModule],
  controllers: [CursoRestController],
  providers: [
    NestJsPaginateAdapter,
    CursoGraphqlResolver,
    {
      provide: ICursoRepository,
      useClass: CursoTypeOrmRepositoryAdapter,
    },
    {
      provide: ICursoPeriodoDisciplinaRepository,
      useClass: CursoPeriodoDisciplinaTypeOrmRepositoryAdapter,
    },
    { provide: ICursoPermissionChecker, useClass: CursoPermissionCheckerImpl },

    // Commands
    { provide: ICursoCreateCommandHandler, useClass: CursoCreateCommandHandlerImpl },
    { provide: ICursoUpdateCommandHandler, useClass: CursoUpdateCommandHandlerImpl },
    { provide: ICursoDeleteCommandHandler, useClass: CursoDeleteCommandHandlerImpl },
    {
      provide: ICursoUpdateImagemCapaCommandHandler,
      useClass: CursoUpdateImagemCapaCommandHandlerImpl,
    },
    // Queries
    { provide: ICursoListQueryHandler, useClass: CursoListQueryHandlerImpl },
    { provide: ICursoFindOneQueryHandler, useClass: CursoFindOneQueryHandlerImpl },
    { provide: ICursoGetImagemCapaQueryHandler, useClass: CursoGetImagemCapaQueryHandlerImpl },
  ],
  exports: [ICursoFindOneQueryHandler, ICursoListQueryHandler],
})
export class CursoModule {}
