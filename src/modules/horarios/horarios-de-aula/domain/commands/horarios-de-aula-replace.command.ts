import type { IHorarioAulaItem } from "../horario-aula-configuracao.types";

export class HorariosDeAulaReplaceCommand {
  campusId!: string;
  horarios!: IHorarioAulaItem[];
}
