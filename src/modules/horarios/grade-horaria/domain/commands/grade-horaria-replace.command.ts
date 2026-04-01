import type { IGradeHorariaIntervalo } from "../grade-horaria.types";

export class GradeHorariaReplaceCommand {
  campusId!: string;
  gradesHorarias!: Array<{
    identificadorExterno: string;
    nome: string;
    intervalos: IGradeHorariaIntervalo[];
  }>;
}
