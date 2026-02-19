import { Module } from "@nestjs/common";
import { ENDERECO_REPOSITORY_PORT, EnderecoService } from "@/modules/localidades/endereco";
import {
  EnderecoAuthzRegistrySetup,
  EnderecoTypeOrmRepositoryAdapter,
} from "@/modules/localidades/endereco/infrastructure";
import { EnderecoGraphqlResolver } from "@/modules/localidades/endereco/presentation/graphql/endereco.graphql.resolver";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";

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
