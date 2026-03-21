import { Module } from "@nestjs/common";
import { CalendarioAgendamentoModule } from "@/modules/horarios/calendario-agendamento/calendario-agendamento.module";
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
  ],
})
export class HorarioEdicaoModule {}
