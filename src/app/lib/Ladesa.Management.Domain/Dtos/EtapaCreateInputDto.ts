import type { ScalarDate } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import type { CalendarioLetivoInputRefDto } from "./CalendarioLetivoInputRefDto";

export class EtapaCreateInputDto {
  numero?: number | null;
  dataInicio!: ScalarDate;
  dataTermino!: ScalarDate;
  cor?: string | null;
  calendario!: CalendarioLetivoInputRefDto;
}
