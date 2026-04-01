import { Module } from "@nestjs/common";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { AmbienteModule } from "@/modules/ambientes/ambiente/ambiente.module";
import { ArquivoModule } from "@/modules/armazenamento/arquivo/arquivo.module";
import { ImagemModule } from "@/modules/armazenamento/imagem/imagem.module";
import { CursoModule } from "@/modules/ensino/curso/curso.module";
import { TurmaPermissionCheckerImpl } from "@/modules/ensino/turma/application/authorization";
import {
  TurmaCreateCommandHandlerImpl,
  TurmaDeleteCommandHandlerImpl,
  TurmaUpdateCommandHandlerImpl,
  TurmaUpdateImagemCapaCommandHandlerImpl,
} from "@/modules/ensino/turma/application/commands";
import {
  TurmaFindOneQueryHandlerImpl,
  TurmaGetImagemCapaQueryHandlerImpl,
  TurmaListQueryHandlerImpl,
} from "@/modules/ensino/turma/application/queries";
import { ITurmaPermissionChecker } from "@/modules/ensino/turma/domain/authorization";
import {
  ITurmaCreateCommandHandler,
  ITurmaDeleteCommandHandler,
  ITurmaUpdateCommandHandler,
  ITurmaUpdateImagemCapaCommandHandler,
} from "@/modules/ensino/turma/domain/commands";
import {
  ITurmaFindOneQueryHandler,
  ITurmaGetImagemCapaQueryHandler,
  ITurmaListQueryHandler,
} from "@/modules/ensino/turma/domain/queries";
import {
  IDiarioConfigurarRepository,
  ITurmaEventoRepository,
  ITurmaRepository,
} from "@/modules/ensino/turma/domain/repositories";
import {
  DiarioConfigurarTypeOrmRepositoryAdapter,
  TurmaEventoTypeOrmRepositoryAdapter,
  TurmaTypeOrmRepositoryAdapter,
} from "@/modules/ensino/turma/infrastructure.database";
import { TurmaGraphqlResolver } from "@/modules/ensino/turma/presentation.graphql/turma.graphql.resolver";
import { TurmaRestController } from "@/modules/ensino/turma/presentation.rest/turma.rest.controller";
import { TurmaDiarioConfigurarRestController } from "@/modules/ensino/turma/presentation.rest/turma-diario-configurar.rest.controller";
import { TurmaDisponibilidadeRestController } from "@/modules/ensino/turma/presentation.rest/turma-disponibilidade.rest.controller";
import { TurmaEventoRestController } from "@/modules/ensino/turma/presentation.rest/turma-evento.rest.controller";
import { CalendarioAgendamentoModule } from "@/modules/horarios/calendario-agendamento/calendario-agendamento.module";
import { HorarioConsultaModule } from "@/modules/horarios/horario-consulta/horario-consulta.module";
import {
  TurmaDisponibilidadeDeactivateCommandHandlerImpl,
  TurmaDisponibilidadeSaveCommandHandlerImpl,
} from "@/modules/horarios/turma-disponibilidade/application/commands";
import {
  TurmaDisponibilidadeFindAllActiveQueryHandlerImpl,
  TurmaDisponibilidadeFindByWeekQueryHandlerImpl,
} from "@/modules/horarios/turma-disponibilidade/application/queries";
import {
  ITurmaDisponibilidadeDeactivateCommandHandler,
  ITurmaDisponibilidadeSaveCommandHandler,
} from "@/modules/horarios/turma-disponibilidade/domain/commands";
import {
  ITurmaDisponibilidadeFindAllActiveQueryHandler,
  ITurmaDisponibilidadeFindByWeekQueryHandler,
} from "@/modules/horarios/turma-disponibilidade/domain/queries";
import { ITurmaDisponibilidadeRepository } from "@/modules/horarios/turma-disponibilidade/domain/repositories";
import { TurmaDisponibilidadeTypeOrmRepositoryAdapter } from "@/modules/horarios/turma-disponibilidade/infrastructure.database";

@Module({
  imports: [
    AmbienteModule,
    CursoModule,
    ImagemModule,
    ArquivoModule,
    CalendarioAgendamentoModule,
    HorarioConsultaModule,
  ],
  controllers: [
    TurmaRestController,
    TurmaDisponibilidadeRestController,
    TurmaEventoRestController,
    TurmaDiarioConfigurarRestController,
  ],
  providers: [
    NestJsPaginateAdapter,
    TurmaGraphqlResolver,
    {
      provide: ITurmaRepository,
      useClass: TurmaTypeOrmRepositoryAdapter,
    },
    {
      provide: ITurmaDisponibilidadeRepository,
      useClass: TurmaDisponibilidadeTypeOrmRepositoryAdapter,
    },
    {
      provide: IDiarioConfigurarRepository,
      useClass: DiarioConfigurarTypeOrmRepositoryAdapter,
    },
    {
      provide: ITurmaEventoRepository,
      useClass: TurmaEventoTypeOrmRepositoryAdapter,
    },
    { provide: ITurmaPermissionChecker, useClass: TurmaPermissionCheckerImpl },

    // Turma - Commands
    { provide: ITurmaCreateCommandHandler, useClass: TurmaCreateCommandHandlerImpl },
    { provide: ITurmaUpdateCommandHandler, useClass: TurmaUpdateCommandHandlerImpl },
    { provide: ITurmaDeleteCommandHandler, useClass: TurmaDeleteCommandHandlerImpl },
    {
      provide: ITurmaUpdateImagemCapaCommandHandler,
      useClass: TurmaUpdateImagemCapaCommandHandlerImpl,
    },
    // Turma - Queries
    { provide: ITurmaListQueryHandler, useClass: TurmaListQueryHandlerImpl },
    { provide: ITurmaFindOneQueryHandler, useClass: TurmaFindOneQueryHandlerImpl },
    { provide: ITurmaGetImagemCapaQueryHandler, useClass: TurmaGetImagemCapaQueryHandlerImpl },

    // TurmaDisponibilidade - Commands
    {
      provide: ITurmaDisponibilidadeSaveCommandHandler,
      useClass: TurmaDisponibilidadeSaveCommandHandlerImpl,
    },
    {
      provide: ITurmaDisponibilidadeDeactivateCommandHandler,
      useClass: TurmaDisponibilidadeDeactivateCommandHandlerImpl,
    },
    // TurmaDisponibilidade - Queries
    {
      provide: ITurmaDisponibilidadeFindByWeekQueryHandler,
      useClass: TurmaDisponibilidadeFindByWeekQueryHandlerImpl,
    },
    {
      provide: ITurmaDisponibilidadeFindAllActiveQueryHandler,
      useClass: TurmaDisponibilidadeFindAllActiveQueryHandlerImpl,
    },
  ],
  exports: [ITurmaFindOneQueryHandler],
})
export class TurmaModule {}
