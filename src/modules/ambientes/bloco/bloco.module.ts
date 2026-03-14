import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { BLOCO_REPOSITORY_PORT } from "@/modules/ambientes/bloco/application/ports";
import { BlocoService } from "@/modules/ambientes/bloco/application/use-cases/bloco.service";
import {
  BlocoCreateCommandHandlerImpl,
  BlocoDeleteCommandHandlerImpl,
  BlocoUpdateCommandHandlerImpl,
  BlocoUpdateImagemCapaCommandHandlerImpl,
} from "@/modules/ambientes/bloco/application/use-cases/commands";
import {
  BlocoFindOneQueryHandlerImpl,
  BlocoGetImagemCapaQueryHandlerImpl,
  BlocoListQueryHandlerImpl,
} from "@/modules/ambientes/bloco/application/use-cases/queries";
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
import {
  BlocoAuthzRegistrySetup,
  BlocoTypeOrmRepositoryAdapter,
} from "@/modules/ambientes/bloco/infrastructure";
import { BlocoGraphqlResolver } from "@/modules/ambientes/bloco/presentation/graphql/bloco.graphql.resolver";
import { BlocoRestController } from "@/modules/ambientes/bloco/presentation/rest/bloco.rest.controller";
import { CampusModule } from "@/modules/ambientes/campus/campus.module";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";

@Module({
  imports: [CampusModule, ImagemModule, ArquivoModule],
  controllers: [BlocoRestController],
  providers: [
    NestJsPaginateAdapter,
    BlocoService,
    BlocoGraphqlResolver,
    BlocoAuthzRegistrySetup,
    {
      provide: BLOCO_REPOSITORY_PORT,
      useClass: BlocoTypeOrmRepositoryAdapter,
    },
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
  exports: [BlocoService],
})
export class BlocoModule {}
