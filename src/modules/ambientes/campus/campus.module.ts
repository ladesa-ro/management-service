import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { CampusPermissionCheckerImpl } from "@/modules/ambientes/campus/application/authorization";
import {
  CampusCreateCommandHandlerImpl,
  CampusDeleteCommandHandlerImpl,
  CampusUpdateCommandHandlerImpl,
} from "@/modules/ambientes/campus/application/commands";
import {
  CampusFindOneQueryHandlerImpl,
  CampusListQueryHandlerImpl,
} from "@/modules/ambientes/campus/application/queries";
import { ICampusPermissionChecker } from "@/modules/ambientes/campus/domain/authorization";
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
import { CampusTypeOrmRepositoryAdapter } from "@/modules/ambientes/campus/infrastructure.database";
import { CampusGraphqlResolver } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.resolver";
import { CampusRestController } from "@/modules/ambientes/campus/presentation.rest/campus.rest.controller";
import { EnderecoModule } from "@/modules/localidades/endereco/endereco.module";

@Module({
  imports: [EnderecoModule],
  controllers: [CampusRestController],
  providers: [
    NestJsPaginateAdapter,
    CampusGraphqlResolver,
    {
      provide: ICampusRepository,
      useClass: CampusTypeOrmRepositoryAdapter,
    },

    // Authorization
    { provide: ICampusPermissionChecker, useClass: CampusPermissionCheckerImpl },
    // Commands
    { provide: ICampusCreateCommandHandler, useClass: CampusCreateCommandHandlerImpl },
    { provide: ICampusUpdateCommandHandler, useClass: CampusUpdateCommandHandlerImpl },
    { provide: ICampusDeleteCommandHandler, useClass: CampusDeleteCommandHandlerImpl },
    // Queries
    { provide: ICampusFindOneQueryHandler, useClass: CampusFindOneQueryHandlerImpl },
    { provide: ICampusListQueryHandler, useClass: CampusListQueryHandlerImpl}
  ],
  exports: [ICampusFindOneQueryHandler, ICampusListQueryHandler],
})
export class CampusModule {}
