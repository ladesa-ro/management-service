import { Module } from "@nestjs/common";
import { MODALIDADE_REPOSITORY_PORT } from "@/Ladesa.Management.Application/ensino/modalidade/application/ports";
import { ModalidadeService } from "@/Ladesa.Management.Application/ensino/modalidade/application/use-cases/modalidade.service";
import {
  ModalidadeAuthzRegistrySetup,
  ModalidadeTypeOrmRepositoryAdapter,
} from "@/Ladesa.Management.Application/ensino/modalidade/infrastructure";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { ModalidadeGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/ModalidadeGraphqlResolver";
import { ModalidadeRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/ModalidadeRestController";

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
