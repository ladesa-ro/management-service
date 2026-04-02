import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import { NivelFormacaoPermissionCheckerImpl } from "@/modules/ensino/nivel-formacao/application/authorization";
import {
  NivelFormacaoCreateCommandHandlerImpl,
  NivelFormacaoDeleteCommandHandlerImpl,
  NivelFormacaoUpdateCommandHandlerImpl,
  NivelFormacaoUpdateImagemCapaCommandHandlerImpl,
} from "@/modules/ensino/nivel-formacao/application/commands";
import {
  NivelFormacaoFindOneQueryHandlerImpl,
  NivelFormacaoGetImagemCapaQueryHandlerImpl,
  NivelFormacaoListQueryHandlerImpl,
} from "@/modules/ensino/nivel-formacao/application/queries";
import { INivelFormacaoPermissionChecker } from "@/modules/ensino/nivel-formacao/domain/authorization";
import {
  INivelFormacaoCreateCommandHandler,
  INivelFormacaoDeleteCommandHandler,
  INivelFormacaoUpdateCommandHandler,
  INivelFormacaoUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/nivel-formacao/domain/commands";
import {
  INivelFormacaoFindOneQueryHandler,
  INivelFormacaoGetImagemCapaQueryHandler,
  INivelFormacaoListQueryHandler,
} from "@/modules/ensino/nivel-formacao/domain/queries";
import { INivelFormacaoRepository } from "@/modules/ensino/nivel-formacao/domain/repositories";
import { NivelFormacaoTypeOrmRepositoryAdapter } from "@/modules/ensino/nivel-formacao/infrastructure.database";
import { NivelFormacaoGraphqlResolver } from "@/modules/ensino/nivel-formacao/presentation.graphql/nivel-formacao.graphql.resolver";
import { NivelFormacaoRestController } from "@/modules/ensino/nivel-formacao/presentation.rest/nivel-formacao.rest.controller";

@Module({
  imports: [ImagemModule, ArquivoModule],
  controllers: [NivelFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    { provide: INivelFormacaoPermissionChecker, useClass: NivelFormacaoPermissionCheckerImpl },
    NivelFormacaoGraphqlResolver,
    {
      provide: INivelFormacaoRepository,
      useClass: NivelFormacaoTypeOrmRepositoryAdapter,
    },

    // Commands
    {
      provide: INivelFormacaoCreateCommandHandler,
      useClass: NivelFormacaoCreateCommandHandlerImpl,
    },
    {
      provide: INivelFormacaoUpdateCommandHandler,
      useClass: NivelFormacaoUpdateCommandHandlerImpl,
    },
    {
      provide: INivelFormacaoDeleteCommandHandler,
      useClass: NivelFormacaoDeleteCommandHandlerImpl,
    },
    {
      provide: INivelFormacaoUpdateImagemCapaCommandHandler,
      useClass: NivelFormacaoUpdateImagemCapaCommandHandlerImpl,
    },
    // Queries
    { provide: INivelFormacaoListQueryHandler, useClass: NivelFormacaoListQueryHandlerImpl },
    { provide: INivelFormacaoFindOneQueryHandler, useClass: NivelFormacaoFindOneQueryHandlerImpl },
    {
      provide: INivelFormacaoGetImagemCapaQueryHandler,
      useClass: NivelFormacaoGetImagemCapaQueryHandlerImpl,
    },
  ],
  exports: [INivelFormacaoFindOneQueryHandler],
})
export class NivelFormacaoModule {}
