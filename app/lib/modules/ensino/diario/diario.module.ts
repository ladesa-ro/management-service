import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AmbienteModule } from "@/modules/ambientes/ambiente/ambiente.module";
import { DIARIO_REPOSITORY_PORT } from "@/modules/ensino/diario/application/ports";
import { DiarioService } from "@/modules/ensino/diario/application/use-cases/diario.service";
import { DiarioAuthzRegistrySetup } from "@/modules/ensino/diario/infrastructure";
import { DiarioTypeOrmRepositoryAdapter } from "@/modules/ensino/diario/infrastructure/persistence/typeorm";
import { DiarioGraphqlResolver } from "@/modules/ensino/diario/presentation/graphql/diario.graphql.resolver";
import { DiarioRestController } from "@/modules/ensino/diario/presentation/rest/diario.rest.controller";
import { DisciplinaModule } from "@/modules/ensino/disciplina/disciplina.module";
import { TurmaModule } from "@/modules/ensino/turma/turma.module";
import { CalendarioLetivoModule } from "@/modules/horarios/calendario-letivo/calendario-letivo.module";

/**
 * Modulo NestJS para Diario
 */
@Module({
  imports: [CalendarioLetivoModule, TurmaModule, AmbienteModule, DisciplinaModule],
  controllers: [DiarioRestController],
  providers: [
    NestJsPaginateAdapter,
    DiarioService,
    DiarioGraphqlResolver,
    DiarioAuthzRegistrySetup,
    {
      provide: DIARIO_REPOSITORY_PORT,
      useClass: DiarioTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DiarioService],
})
export class DiarioModule {}
