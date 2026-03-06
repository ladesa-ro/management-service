import { Module } from "@nestjs/common";
import { DISPONIBILIDADE_REPOSITORY_PORT } from "@/Ladesa.Management.Application/ensino/disponibilidade/application/ports";
import { DisponibilidadeService } from "@/Ladesa.Management.Application/ensino/disponibilidade/application/use-cases/disponibilidade.service";
import { DisponibilidadeAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/disponibilidade/infrastructure";
import { DisponibilidadeTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ensino/disponibilidade/infrastructure/persistence/typeorm";
import { DisponibilidadeGraphqlResolver } from "@/Ladesa.Management.Application/ensino/disponibilidade/presentation/graphql/disponibilidade.graphql.resolver";
import { DisponibilidadeRestController } from "@/Ladesa.Management.Application/ensino/disponibilidade/presentation/rest/disponibilidade.rest.controller";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
