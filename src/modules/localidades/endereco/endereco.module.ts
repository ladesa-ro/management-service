import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { 
  EnderecoCreateOrUpdateCommandHandlerImpl,
  EnderecoDeleteCommandHandlerImpl
} from "@/modules/localidades/endereco/application/commands";
import { 
  EnderecoFindOneQueryHandlerImpl,
  EnderecoListQueryHandlerImpl
} from "@/modules/localidades/endereco/application/queries";
import { 
  IEnderecoCreateOrUpdateCommandHandler,
  IEnderecoDeleteCommandHandler
} from "@/modules/localidades/endereco/domain/commands";
import { 
  IEnderecoFindOneQueryHandler,
  IEnderecoListQueryHandler
} from "@/modules/localidades/endereco/domain/queries";
import { IEnderecoRepository } from "@/modules/localidades/endereco/domain/repositories";
import { EnderecoTypeOrmRepositoryAdapter } from "@/modules/localidades/endereco/infrastructure.database";
import { EnderecoGraphqlResolver } from "@/modules/localidades/endereco/presentation.graphql/endereco.graphql.resolver";
import { EnderecoRestController } from "@/modules/localidades/endereco/presentation.rest";

@Module({
  imports: [],
  controllers: [EnderecoRestController],
  providers: [
    NestJsPaginateAdapter,
    EnderecoGraphqlResolver,
    {
      provide: IEnderecoRepository,
      useClass: EnderecoTypeOrmRepositoryAdapter,
    },

    // Commands
    {
      provide: IEnderecoCreateOrUpdateCommandHandler,
      useClass: EnderecoCreateOrUpdateCommandHandlerImpl,
    },
    {
      provide: IEnderecoDeleteCommandHandler,
      useClass: EnderecoDeleteCommandHandlerImpl,
    },
    // Queries
    { provide: IEnderecoFindOneQueryHandler, useClass: EnderecoFindOneQueryHandlerImpl },
    { provide: IEnderecoListQueryHandler, useClass: EnderecoListQueryHandlerImpl },
  ],
  exports: [
    IEnderecoCreateOrUpdateCommandHandler, 
    IEnderecoDeleteCommandHandler,
    IEnderecoFindOneQueryHandler,
    IEnderecoListQueryHandler
  ],
})
export class EnderecoModule {}
