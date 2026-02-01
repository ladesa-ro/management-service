import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { DIARIO_REPOSITORY_PORT } from "@/modules/diario/application/ports";
import { DiarioService } from "@/modules/diario/application/use-cases/diario.service";
import { DiarioTypeOrmRepositoryAdapter } from "@/modules/diario/infrastructure/persistence/typeorm";
import { AmbienteModule } from "@/server/nest/modules/ambiente";
import { CalendarioLetivoModule } from "@/server/nest/modules/calendario-letivo";
import { DisciplinaModule } from "@/server/nest/modules/disciplina";
import { TurmaModule } from "@/server/nest/modules/turma";
import { DiarioGraphqlResolver } from "./graphql/diario.graphql.resolver";
import { DiarioRestController } from "./rest/diario.rest.controller";

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
    {
      provide: DIARIO_REPOSITORY_PORT,
      useClass: DiarioTypeOrmRepositoryAdapter,
    },
  ],
  exports: [DiarioService],
})
export class DiarioModule {}
