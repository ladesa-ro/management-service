import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { BlocoPermissionCheckerImpl } from "@/modules/ambientes/bloco/application/authorization";
import {
  BlocoCreateCommandHandlerImpl,
  BlocoDeleteCommandHandlerImpl,
  BlocoUpdateCommandHandlerImpl,
  BlocoUpdateImagemCapaCommandHandlerImpl,
} from "@/modules/ambientes/bloco/application/commands";
import {
  BlocoFindOneQueryHandlerImpl,
  BlocoGetImagemCapaQueryHandlerImpl,
  BlocoListQueryHandlerImpl,
} from "@/modules/ambientes/bloco/application/queries";
import { IBlocoPermissionChecker } from "@/modules/ambientes/bloco/domain/authorization";
import {
  IBlocoCreateCommandHandler,
  IBlocoDeleteCommandHandler,
  IBlocoUpdateCommandHandler,
  IBlocoUpdateImagemCapaCommandHandler,
} from "@/modules/ambientes/bloco/domain/commands";
import {
  IBlocoFindOneQueryHandler,
  IBlocoGetImagemCapaQueryHandler,
  IBlocoListQueryHandler,
} from "@/modules/ambientes/bloco/domain/queries";
import { IBlocoRepository } from "@/modules/ambientes/bloco/domain/repositories";
import { BlocoTypeOrmRepositoryAdapter } from "@/modules/ambientes/bloco/infrastructure.database";
import { BlocoGraphqlResolver } from "@/modules/ambientes/bloco/presentation.graphql/bloco.graphql.resolver";
import { BlocoRestController } from "@/modules/ambientes/bloco/presentation.rest/bloco.rest.controller";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";

@Module({
  imports: [CampusModule, ImagemModule, ArquivoModule],
  controllers: [BlocoRestController],
  providers: [
    NestJsPaginateAdapter,
    BlocoGraphqlResolver,
    {
      provide: IBlocoRepository,
      useClass: BlocoTypeOrmRepositoryAdapter,
    },
    // Authorization
    { provide: IBlocoPermissionChecker, useClass: BlocoPermissionCheckerImpl },
    // Commands
    { provide: IBlocoCreateCommandHandler, useClass: BlocoCreateCommandHandlerImpl },
    { provide: IBlocoUpdateCommandHandler, useClass: BlocoUpdateCommandHandlerImpl },
    { provide: IBlocoDeleteCommandHandler, useClass: BlocoDeleteCommandHandlerImpl },
    {
      provide: IBlocoUpdateImagemCapaCommandHandler,
      useClass: BlocoUpdateImagemCapaCommandHandlerImpl,
    },
    // Queries
    { provide: IBlocoListQueryHandler, useClass: BlocoListQueryHandlerImpl },
    { provide: IBlocoFindOneQueryHandler, useClass: BlocoFindOneQueryHandlerImpl },
    { provide: IBlocoGetImagemCapaQueryHandler, useClass: BlocoGetImagemCapaQueryHandlerImpl },
  ],
  exports: [IBlocoFindOneQueryHandler],
})
export class BlocoModule {}
