import type { CalendarioLetivo } from "@/v2/core/calendario-letivo/domain/calendario-letivo.domain";
import type { IHorarioGerado, IHorarioGeradoCreate } from "./horario-gerado.types";

export class HorarioGerado implements IHorarioGerado {
  id!: string;
  status!: string | null;
  tipo!: string | null;
  dataGeracao!: Date | null;
  vigenciaInicio!: Date | null;
  vigenciaFim!: Date | null;
  calendario!: CalendarioLetivo;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

  static criar(dados: IHorarioGeradoCreate): HorarioGerado {
    const horarioGerado = new HorarioGerado();
    horarioGerado.status = dados.status ?? null;
    horarioGerado.tipo = dados.tipo ?? null;
    horarioGerado.dataGeracao = dados.dataGeracao ?? null;
    horarioGerado.vigenciaInicio = dados.vigenciaInicio ?? null;
    horarioGerado.vigenciaFim = dados.vigenciaFim ?? null;
    return horarioGerado;
  }

  static fromData(dados: IHorarioGerado): HorarioGerado {
    const horarioGerado = new HorarioGerado();
    Object.assign(horarioGerado, dados);
    return horarioGerado;
  }
}
