import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { NIVEL_FORMACAO_REPOSITORY_PORT } from "@/modules/nivel-formacao/application/ports";
import { NivelFormacaoService } from "@/modules/nivel-formacao/application/use-cases/nivel-formacao.service";
import { NivelFormacaoTypeOrmRepositoryAdapter } from "@/modules/nivel-formacao/infrastructure/persistence/typeorm";
import { NivelFormacaoGraphqlResolver } from "./graphql/nivel-formacao.graphql.resolver";
import { NivelFormacaoRestController } from "./rest/nivel-formacao.rest.controller";

@Module({
  imports: [],
  controllers: [NivelFormacaoRestController],
  providers: [
    NestJsPaginateAdapter,
    NivelFormacaoService,
    NivelFormacaoGraphqlResolver,
    {
      provide: NIVEL_FORMACAO_REPOSITORY_PORT,
      useClass: NivelFormacaoTypeOrmRepositoryAdapter,
    },
  ],
  exports: [NivelFormacaoService],
})
export class NivelFormacaoModule {}
