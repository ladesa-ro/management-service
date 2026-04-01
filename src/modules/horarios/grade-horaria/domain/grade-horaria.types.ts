export interface IGradeHorariaIntervalo {
  inicio: string;
  fim: string;
}

export interface IGradeHorariaOutputItem {
  identificadorExterno: string;
  nome: string;
  intervalos: IGradeHorariaIntervalo[];
}
