import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DISPONIBILIDADE_REPOSITORY_PORT } from "@/modules/disponibilidade/application/ports";
import { DisponibilidadeService } from "@/modules/disponibilidade/application/use-cases/disponibilidade.service";
import { DisponibilidadeTypeOrmRepositoryAdapter } from "@/modules/disponibilidade/infrastructure/persistence/typeorm";
import { DisponibilidadeGraphqlResolver } from "./graphql/disponibilidade.graphql.resolver";
import { DisponibilidadeRestController } from "./rest/disponibilidade.rest.controller";

@Module({
  imports: [],
  controllers: [DisponibilidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    DisponibilidadeService,
    DisponibilidadeGraphqlResolver,
    {
      provide: DISPONIBILIDADE_REPOSITORY_PORT,
      useClass: DisponibilidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DisponibilidadeService],
})
export class DisponibilidadeModule {}
