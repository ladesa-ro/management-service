import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DISPONIBILIDADE_REPOSITORY_PORT } from "@/modules/ensino/disponibilidade/application/ports";
import { DisponibilidadeService } from "@/modules/ensino/disponibilidade/application/use-cases/disponibilidade.service";
import { DisponibilidadeAuthzRegistrySetup } from "@/modules/ensino/disponibilidade/infrastructure";
import { DisponibilidadeTypeOrmRepositoryAdapter } from "@/modules/ensino/disponibilidade/infrastructure/persistence/typeorm";
import { DisponibilidadeGraphqlResolver } from "./graphql/disponibilidade.graphql.resolver";
import { DisponibilidadeRestController } from "./rest/disponibilidade.rest.controller";

@Module({
  imports: [],
  controllers: [DisponibilidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    DisponibilidadeService,
    DisponibilidadeGraphqlResolver,
    DisponibilidadeAuthzRegistrySetup,
    {
      provide: DISPONIBILIDADE_REPOSITORY_PORT,
      useClass: DisponibilidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DisponibilidadeService],
})
export class DisponibilidadeModule {}
