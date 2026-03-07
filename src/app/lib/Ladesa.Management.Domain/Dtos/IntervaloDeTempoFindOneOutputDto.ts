import { EntityOutputDto } from "@/Ladesa.Management.Domain/Abstractions/Dtos/EntityOutputDto";

export class IntervaloDeTempoFindOneOutputDto extends EntityOutputDto {
  periodoInicio!: string;
  periodoFim!: string;
}
