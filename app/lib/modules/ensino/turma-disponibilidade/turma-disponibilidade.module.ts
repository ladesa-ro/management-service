import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DisponibilidadeModule } from "@/modules/ensino/disponibilidade";
import { TurmaModule } from "@/modules/ensino/turma";
import {
  TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
  TurmaDisponibilidadeService,
} from "@/modules/ensino/turma-disponibilidade";
import { TurmaDisponibilidadeAuthzRegistrySetup } from "@/modules/ensino/turma-disponibilidade/infrastructure";
import { TurmaDisponibilidadeTypeOrmRepositoryAdapter } from "@/modules/ensino/turma-disponibilidade/infrastructure/persistence/typeorm";
import { TurmaDisponibilidadeGraphqlResolver } from "@/modules/ensino/turma-disponibilidade/presentation/graphql/turma-disponibilidade.graphql.resolver";
import { TurmaDisponibilidadeRestController } from "@/modules/ensino/turma-disponibilidade/presentation/rest";

@Module({
  imports: [TurmaModule, DisponibilidadeModule],
  controllers: [TurmaDisponibilidadeRestController],
  providers: [
    NestJsPaginateAdapter,
    TurmaDisponibilidadeService,
    TurmaDisponibilidadeAuthzRegistrySetup,
    TurmaDisponibilidadeGraphqlResolver,
    {
      provide: TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
      useClass: TurmaDisponibilidadeTypeOrmRepositoryAdapter,
    },
  ],
  exports: [TurmaDisponibilidadeService],
})
export class TurmaDisponibilidadeModule {}
