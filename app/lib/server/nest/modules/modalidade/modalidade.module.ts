import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { MODALIDADE_REPOSITORY_PORT } from "@/modules/ensino/modalidade/application/ports";
import { ModalidadeService } from "@/modules/ensino/modalidade/application/use-cases/modalidade.service";
import {
  ModalidadeAuthzRegistrySetup,
  ModalidadeTypeOrmRepositoryAdapter,
} from "@/modules/ensino/modalidade/infrastructure";
import { ModalidadeGraphqlResolver } from "./graphql/modalidade.graphql.resolver";
import { ModalidadeRestController } from "./rest/modalidade.rest.controller";

@Module({
  imports: [],
  controllers: [ModalidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    ModalidadeService,
    ModalidadeGraphqlResolver,
    ModalidadeAuthzRegistrySetup,
    {
      provide: MODALIDADE_REPOSITORY_PORT,
      useClass: ModalidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [ModalidadeService],
})
export class ModalidadeModule {}
