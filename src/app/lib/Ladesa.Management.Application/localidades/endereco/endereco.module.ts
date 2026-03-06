import { Module } from "@nestjs/common";
import {
  ENDERECO_REPOSITORY_PORT,
  EnderecoService,
} from "@/Ladesa.Management.Application/localidades/endereco";
import {
  EnderecoAuthzRegistrySetup,
  EnderecoTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/localidades/endereco/infrastructure";
import { EnderecoGraphqlResolver } from "@/Ladesa.Management.Application/localidades/endereco/presentation/graphql/endereco.graphql.resolver";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

@Module({
  imports: [],
  controllers: [],
  providers: [
    NestJsPaginateAdapter,
    EnderecoService,
    EnderecoGraphqlResolver,
    EnderecoAuthzRegistrySetup,
    {
      provide: ENDERECO_REPOSITORY_PORT,
      useClass: EnderecoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EnderecoService],
})
export class EnderecoModule {}
