import { Module } from "@nestjs/common";
import { CalendarioAgendamentoModule } from "@/modules/calendario/agendamento/calendario-agendamento.module";
import {
  HorarioEdicaoSessaoDesfazerMudancaCommandHandlerImpl,
  HorarioEdicaoSessaoPublicarCommandHandlerImpl,
} from "./application/commands";
import { HorarioEdicaoSessaoDiferencaQueryHandlerImpl } from "./application/queries/horario-edicao-sessao-diferenca.query.handler";
import { IHorarioEdicaoSessaoDesfazerMudancaCommandHandler } from "./domain/commands/horario-edicao-sessao-desfazer-mudanca.command.handler.interface";
import { IHorarioEdicaoSessaoPublicarCommandHandler } from "./domain/commands/horario-edicao-sessao-publicar.command.handler.interface";
import { IHorarioEdicaoSessaoDiferencaQueryHandler } from "./domain/queries/horario-edicao-sessao-diferenca.query.handler.interface";
import {
  IHorarioEdicaoApplicator,
  IHorarioEdicaoMudancaRepository,
  IHorarioEdicaoSessaoRepository,
} from "./domain/repositories";
import {
  HorarioEdicaoApplicatorTypeOrmAdapter,
  HorarioEdicaoMudancaTypeOrmRepositoryAdapter,
  HorarioEdicaoSessaoTypeOrmRepositoryAdapter,
} from "./infrastructure.database";
import { HorarioEdicaoRestController } from "./presentation.rest";

@Module({
  imports: [CalendarioAgendamentoModule],
  controllers: [HorarioEdicaoRestController],
  providers: [
    {
      provide: IHorarioEdicaoSessaoRepository,
      useClass: HorarioEdicaoSessaoTypeOrmRepositoryAdapter,
    },
    {
      provide: IHorarioEdicaoMudancaRepository,
      useClass: HorarioEdicaoMudancaTypeOrmRepositoryAdapter,
    },
    {
      provide: IHorarioEdicaoApplicator,
      useClass: HorarioEdicaoApplicatorTypeOrmAdapter,
    },
    {
      provide: IHorarioEdicaoSessaoPublicarCommandHandler,
      useClass: HorarioEdicaoSessaoPublicarCommandHandlerImpl,
    },
    {
      provide: IHorarioEdicaoSessaoDesfazerMudancaCommandHandler,
      useClass: HorarioEdicaoSessaoDesfazerMudancaCommandHandlerImpl,
    },
    {
      provide: IHorarioEdicaoSessaoDiferencaQueryHandler,
      useClass: HorarioEdicaoSessaoDiferencaQueryHandlerImpl,
    },
  ],
  exports: [
    IHorarioEdicaoSessaoRepository,
    IHorarioEdicaoMudancaRepository,
    IHorarioEdicaoApplicator,
  ],
})
export class HorarioEdicaoModule {}
