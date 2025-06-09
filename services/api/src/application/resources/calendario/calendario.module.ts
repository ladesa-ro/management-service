import { GradeHorarioOfertaFormacaoIntervaloDeTempoModule } from "@/application/resources/calendario/grade-horario-oferta-formacao-intervalo-de-tempo/grade-horario-oferta-formacao-intervalo-de-tempo.module";
import { GradeHorarioOfertaFormacaoModule } from "@/application/resources/calendario/grade-horario-oferta-formacao/grade-horario-oferta-formacao.module";
import { Module } from "@nestjs/common";
import { CalendarioLetivoModule } from "./calendario-letivo/calendario-letivo.module";
import { DiaCalendarioModule } from "./dia-calendario/dia-calendario.module";
import { EtapaModule } from "./etapa/etapa.module";
import { EventoModule } from "./evento/evento.module";

@Module({
  imports: [
    //
    CalendarioLetivoModule,
    GradeHorarioOfertaFormacaoModule,
    GradeHorarioOfertaFormacaoIntervaloDeTempoModule,
    EventoModule,
    DiaCalendarioModule,

    EtapaModule,
  ],
})
export class CalendarioModule {}
