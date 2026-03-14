import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import {
  CampusCreateCommandHandlerImpl,
  CampusDeleteCommandHandlerImpl,
  CampusUpdateCommandHandlerImpl,
} from "@/modules/ambientes/campus/application/commands";
import {
  CampusFindOneQueryHandlerImpl,
  CampusListQueryHandlerImpl,
} from "@/modules/ambientes/campus/application/queries";
import {
  ICampusCreateCommandHandler,
  ICampusDeleteCommandHandler,
  ICampusUpdateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands";
import {
  ICampusFindOneQueryHandler,
  ICampusListQueryHandler,
} from "@/modules/ambientes/campus/domain/queries";
import { ICampusRepository } from "@/modules/ambientes/campus/domain/repositories";
import {
  CampusAuthzRegistrySetup,
  CampusTypeOrmRepositoryAdapter,
} from "@/modules/ambientes/campus/infrastructure";
import { CampusGraphqlResolver } from "@/modules/ambientes/campus/presentation/graphql/campus.graphql.resolver";
import { CampusRestController } from "@/modules/ambientes/campus/presentation/rest/campus.rest.controller";
import { EnderecoModule } from "@/modules/localidades/endereco/endereco.module";

@Module({
  imports: [EnderecoModule],
  controllers: [CampusRestController],
  providers: [
    NestJsPaginateAdapter,
    CampusGraphqlResolver,
    CampusAuthzRegistrySetup,
    {
      provide: ICampusRepository,
      useClass: CampusTypeOrmRepositoryAdapter,
    },

    // Commands
    { provide: ICampusCreateCommandHandler, useClass: CampusCreateCommandHandlerImpl },
    { provide: ICampusUpdateCommandHandler, useClass: CampusUpdateCommandHandlerImpl },
    { provide: ICampusDeleteCommandHandler, useClass: CampusDeleteCommandHandlerImpl },
    // Queries
    { provide: ICampusListQueryHandler, useClass: CampusListQueryHandlerImpl },
    { provide: ICampusFindOneQueryHandler, useClass: CampusFindOneQueryHandlerImpl },
  ],
  exports: [ICampusFindOneQueryHandler],
})
export class CampusModule {}
