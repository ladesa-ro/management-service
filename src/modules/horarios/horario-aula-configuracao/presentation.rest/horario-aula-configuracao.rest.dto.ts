import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

// ============================================================================
// Horario Item (value object)
// ============================================================================

@ApiSchema({ name: "HorarioAulaItemInputDto" })
export class HorarioAulaItemInputRestDto {
  @ApiProperty({ type: "string", description: "Horario inicio (HH:MM:SS)" })
  inicio: string;

  @ApiProperty({ type: "string", description: "Horario fim (HH:MM:SS)" })
  fim: string;
}

@ApiSchema({ name: "HorarioAulaItemOutputDto" })
export class HorarioAulaItemOutputRestDto {
  @ApiProperty({ type: "string" }) inicio: string;
  @ApiProperty({ type: "string" }) fim: string;
}

// ============================================================================
// Create Input
// ============================================================================

@ApiSchema({ name: "HorarioAulaConfiguracaoCreateInputDto" })
export class HorarioAulaConfiguracaoCreateInputRestDto {
  @ApiProperty({ type: "string", format: "date", description: "Data inicio da configuracao" })
  dataInicio: string;

  @ApiPropertyOptional({
    type: "string",
    format: "date",
    nullable: true,
    description: "Data fim da configuracao",
  })
  dataFim?: string;

  @ApiProperty({ type: "boolean", description: "Configuracao ativa" })
  ativo: boolean;

  @ApiProperty({ type: "string", format: "uuid", description: "ID do campus" })
  campusId: string;

  @ApiPropertyOptional({
    type: () => [HorarioAulaItemInputRestDto],
    description: "Horarios de aula da configuracao",
  })
  horarios?: HorarioAulaItemInputRestDto[];
}

// ============================================================================
// Update Input
// ============================================================================

@ApiSchema({ name: "HorarioAulaConfiguracaoUpdateInputDto" })
export class HorarioAulaConfiguracaoUpdateInputRestDto {
  @ApiPropertyOptional({ type: "string", format: "date" })
  dataInicio?: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  dataFim?: string;
  @ApiPropertyOptional({ type: "boolean" }) ativo?: boolean;
  @ApiPropertyOptional({ type: "string", format: "uuid" })
  campusId?: string;
  @ApiPropertyOptional({
    type: () => [HorarioAulaItemInputRestDto],
    description: "Horarios de aula (substituicao completa)",
  })
  horarios?: HorarioAulaItemInputRestDto[];
}

// ============================================================================
// Params
// ============================================================================

@ApiSchema({ name: "HorarioAulaConfiguracaoFindOneParamsDto" })
export class HorarioAulaConfiguracaoFindOneParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  id: string;
}

// ============================================================================
// Output
// ============================================================================

@ApiSchema({ name: "HorarioAulaConfiguracaoFindOneOutputDto" })
export class HorarioAulaConfiguracaoFindOneOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string", format: "date" }) dataInicio: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true }) dataFim: string | null;
  @ApiProperty({ type: "boolean" }) ativo: boolean;
  @ApiProperty({ type: "string" }) campusId: string;
  @ApiProperty({ type: () => [HorarioAulaItemOutputRestDto] })
  horarios: HorarioAulaItemOutputRestDto[];
}

@ApiSchema({ name: "HorarioAulaConfiguracaoListOutputDto" })
export class HorarioAulaConfiguracaoListOutputRestDto {
  @ApiProperty({ type: () => [HorarioAulaConfiguracaoFindOneOutputRestDto] })
  data: HorarioAulaConfiguracaoFindOneOutputRestDto[];
}
