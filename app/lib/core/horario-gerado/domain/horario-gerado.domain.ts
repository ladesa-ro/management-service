import { BaseEntity, type ScalarDateTimeString } from "@/core/@shared";
import type { CalendarioLetivo } from "@/core/calendario-letivo";
import type { IHorarioGerado, IHorarioGeradoCreate } from "./horario-gerado.types";

export class HorarioGerado extends BaseEntity implements IHorarioGerado {
  id!: string;
  status!: string | null;
  tipo!: string | null;
  dataGeracao!: ScalarDateTimeString | null;
  vigenciaInicio!: ScalarDateTimeString | null;
  vigenciaFim!: ScalarDateTimeString | null;
  calendario!: CalendarioLetivo;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

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
