import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

@ApiSchema({ name: "HorarioAulaCreateInputDto" })
export class HorarioAulaCreateInputRestDto {
  @ApiProperty({ type: "string", description: "Horario inicio (HH:MM:SS)" })
  inicio: string;

  @ApiProperty({ type: "string", description: "Horario fim (HH:MM:SS)" })
  fim: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID da configuracao de horario de aula",
  })
  horarioAulaConfiguracaoId: string;
}

@ApiSchema({ name: "HorarioAulaUpdateInputDto" })
export class HorarioAulaUpdateInputRestDto {
  @ApiPropertyOptional({ type: "string" }) inicio?: string;
  @ApiPropertyOptional({ type: "string" }) fim?: string;
  @ApiPropertyOptional({ type: "string", format: "uuid" })
  horarioAulaConfiguracaoId?: string;
}

@ApiSchema({ name: "HorarioAulaFindOneParamsDto" })
export class HorarioAulaFindOneParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  id: string;
}

@ApiSchema({ name: "HorarioAulaFindOneOutputDto" })
export class HorarioAulaFindOneOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string" }) inicio: string;
  @ApiProperty({ type: "string" }) fim: string;
  @ApiProperty({ type: "string" }) horarioAulaConfiguracaoId: string;
}

@ApiSchema({ name: "HorarioAulaListOutputDto" })
export class HorarioAulaListOutputRestDto {
  @ApiProperty({ type: () => [HorarioAulaFindOneOutputRestDto] })
  data: HorarioAulaFindOneOutputRestDto[];
}
