import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { ENDERECO_REPOSITORY_PORT, EnderecoService } from "@/modules/endereco";
import { EnderecoTypeOrmRepositoryAdapter } from "@/modules/endereco/infrastructure/persistence/typeorm";
import { EnderecoGraphqlResolver } from "./graphql/endereco.graphql.resolver";

@Module({
  imports: [],
  controllers: [],
  providers: [
    NestJsPaginateAdapter,
    EnderecoService,
    EnderecoGraphqlResolver,
    {
      provide: ENDERECO_REPOSITORY_PORT,
      useClass: EnderecoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [EnderecoService],
})
export class EnderecoModule {}
