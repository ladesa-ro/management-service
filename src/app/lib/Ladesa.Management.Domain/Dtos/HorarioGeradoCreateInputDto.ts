import type { ScalarDate } from "@/Ladesa.Management.Domain/Abstractions/Scalars";
import type { CalendarioLetivoInputRefDto } from "./CalendarioLetivoInputRefDto";

export class HorarioGeradoCreateInputDto {
  status?: string | null;
  tipo?: string | null;
  dataGeracao?: ScalarDate | null;
  vigenciaInicio?: ScalarDate | null;
  vigenciaFim?: ScalarDate | null;
  calendario!: CalendarioLetivoInputRefDto;
}
