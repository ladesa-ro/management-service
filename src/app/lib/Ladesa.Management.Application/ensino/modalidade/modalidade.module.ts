import { Module } from "@nestjs/common";
import { MODALIDADE_REPOSITORY_PORT } from "@/Ladesa.Management.Application/ensino/modalidade/application/ports";
import { ModalidadeService } from "@/Ladesa.Management.Application/ensino/modalidade/application/use-cases/modalidade.service";
import {
  ModalidadeAuthzRegistrySetup,
  ModalidadeTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/ensino/modalidade/infrastructure";
import { ModalidadeGraphqlResolver } from "@/Ladesa.Management.Application/ensino/modalidade/presentation/graphql/modalidade.graphql.resolver";
import { ModalidadeRestController } from "@/Ladesa.Management.Application/ensino/modalidade/presentation/rest/modalidade.rest.controller";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
