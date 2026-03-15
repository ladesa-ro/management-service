import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { EnderecoCreateOrUpdateCommandHandlerImpl } from "@/modules/localidades/endereco/application/commands";
import { EnderecoFindOneQueryHandlerImpl } from "@/modules/localidades/endereco/application/queries";
import { IEnderecoCreateOrUpdateCommandHandler } from "@/modules/localidades/endereco/domain/commands";
import { IEnderecoFindOneQueryHandler } from "@/modules/localidades/endereco/domain/queries";
import { IEnderecoRepository } from "@/modules/localidades/endereco/domain/repositories";
import { EnderecoTypeOrmRepositoryAdapter } from "@/modules/localidades/endereco/infrastructure.database";
import { EnderecoGraphqlResolver } from "@/modules/localidades/endereco/presentation.graphql/endereco.graphql.resolver";

@Module({
  imports: [],
  controllers: [],
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
    // Queries
    { provide: IEnderecoFindOneQueryHandler, useClass: EnderecoFindOneQueryHandlerImpl },
  ],
  exports: [IEnderecoCreateOrUpdateCommandHandler, IEnderecoFindOneQueryHandler],
})
export class EnderecoModule {}
