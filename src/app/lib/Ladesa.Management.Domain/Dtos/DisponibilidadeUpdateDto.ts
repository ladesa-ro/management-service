import { type ScalarDateTimeString } from "@/Ladesa.Management.Application/@shared";

/**
 * Interface para atualizacao de Disponibilidade
 */
export interface DisponibilidadeUpdateDto {
  dataInicio?: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
}
