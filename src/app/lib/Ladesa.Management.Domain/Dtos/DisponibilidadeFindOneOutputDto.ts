import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";
import type { ScalarDateTimeString } from "@/Ladesa.Management.Domain/Abstractions/Scalars";

export class DisponibilidadeFindOneOutputDto extends EntityOutputDto {
  dataInicio!: ScalarDateTimeString;
  dataFim!: ScalarDateTimeString | null;
}
