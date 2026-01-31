import type { ScalarDate, ScalarDateTimeString } from "@/core/@shared";
import type { Diario } from "@/core/diario/domain/diario.domain";
import type { IntervaloDeTempo } from "@/core/intervalo-de-tempo/domain/intervalo-de-tempo.domain";
import type {
  IDiarioPreferenciaAgrupamento,
  IDiarioPreferenciaAgrupamentoCreate,
} from "./diario-preferencia-agrupamento.types";

export class DiarioPreferenciaAgrupamento implements IDiarioPreferenciaAgrupamento {
  id!: string;
  dataInicio!: ScalarDate;
  dataFim!: ScalarDate | null;
  diaSemanaIso!: number;
  aulasSeguidas!: number;
  intervaloDeTempo!: IntervaloDeTempo;
  diario!: Diario;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  static criar(dados: IDiarioPreferenciaAgrupamentoCreate): DiarioPreferenciaAgrupamento {
    const diarioPreferenciaAgrupamento = new DiarioPreferenciaAgrupamento();
    diarioPreferenciaAgrupamento.dataInicio = dados.dataInicio;
    diarioPreferenciaAgrupamento.dataFim = dados.dataFim ?? null;
    diarioPreferenciaAgrupamento.diaSemanaIso = dados.diaSemanaIso;
    diarioPreferenciaAgrupamento.aulasSeguidas = dados.aulasSeguidas;
    return diarioPreferenciaAgrupamento;
  }

  static fromData(dados: IDiarioPreferenciaAgrupamento): DiarioPreferenciaAgrupamento {
    const diarioPreferenciaAgrupamento = new DiarioPreferenciaAgrupamento();
    Object.assign(diarioPreferenciaAgrupamento, dados);
    return diarioPreferenciaAgrupamento;
  }

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }
}
