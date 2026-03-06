import { type ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";

/**
 * Interface para criacao de Disponibilidade
 */
export interface DisponibilidadeCreateDto {
  dataInicio: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
}
