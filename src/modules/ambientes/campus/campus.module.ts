import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { CAMPUS_REPOSITORY_PORT, CampusService } from "@/modules/ambientes/campus";
import {
  CampusCreateCommandHandlerImpl,
  CampusDeleteCommandHandlerImpl,
  CampusUpdateCommandHandlerImpl,
} from "@/modules/ambientes/campus/application/use-cases/commands";
import {
  CampusFindOneQueryHandlerImpl,
  CampusListQueryHandlerImpl,
} from "@/modules/ambientes/campus/application/use-cases/queries";
import {
  ICampusCreateCommandHandler,
  ICampusDeleteCommandHandler,
  ICampusUpdateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands";
import {
  ICampusFindOneQueryHandler,
  ICampusListQueryHandler,
} from "@/modules/ambientes/campus/domain/queries";
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
    CampusService,
    CampusGraphqlResolver,
    CampusAuthzRegistrySetup,
    {
      provide: CAMPUS_REPOSITORY_PORT,
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
  exports: [CampusService],
})
export class CampusModule {}
