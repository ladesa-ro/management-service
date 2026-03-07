import type { ScalarDateTimeString } from "@/Ladesa.Management.Domain/Abstractions/Scalars";

export class DisponibilidadeUpdateInputDto {
  dataInicio?: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
}
