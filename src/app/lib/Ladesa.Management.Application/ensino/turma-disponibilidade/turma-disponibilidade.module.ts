import { Module } from "@nestjs/common";
import { DisponibilidadeModule } from "@/Ladesa.Management.Application/ensino/disponibilidade/disponibilidade.module";
import { TurmaModule } from "@/Ladesa.Management.Application/ensino/turma/turma.module";
import {
  TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
  TurmaDisponibilidadeService,
} from "@/Ladesa.Management.Application/ensino/turma-disponibilidade";
import { TurmaDisponibilidadeAuthzRegistrySetup } from "@/Ladesa.Management.Application/ensino/turma-disponibilidade/infrastructure";
import { TurmaDisponibilidadeTypeOrmRepositoryAdapter } from "@/Ladesa.Management.Application/ensino/turma-disponibilidade/infrastructure/persistence/typeorm";
import { NestJsPaginateAdapter } from "@/Ladesa.Management.Infrastructure.Database/typeorm";
import { TurmaDisponibilidadeGraphqlResolver } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Resolvers/TurmaDisponibilidadeGraphqlResolver";
import { TurmaDisponibilidadeRestController } from "@/Ladesa.Management.Server.Api/Apis/Rest/Controllers/TurmaDisponibilidadeRestController";

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
