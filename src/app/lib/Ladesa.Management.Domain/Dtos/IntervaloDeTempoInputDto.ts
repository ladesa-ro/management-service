import type { IdUuid } from "@/Ladesa.Management.Domain/Abstractions/Scalars";

export class IntervaloDeTempoInputDto {
  id?: IdUuid;
  periodoInicio?: string;
  periodoFim?: string;
}
