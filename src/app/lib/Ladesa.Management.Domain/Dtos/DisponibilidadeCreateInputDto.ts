import type { ScalarDateTimeString } from "@/Ladesa.Management.Domain/Abstractions/Scalars";

export class DisponibilidadeCreateInputDto {
  dataInicio!: ScalarDateTimeString;
  dataFim?: ScalarDateTimeString | null;
}
