import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

// ============================================================================
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoPeriodoParentParamsDto" })
export class OfertaFormacaoPeriodoParentParamsRestDto {
  @ApiProperty({
    type: "string",
    description: "ID da oferta de formacao (uuid)",
    format: "uuid",
  })
  ofertaFormacaoId: string;
}

// ============================================================================
// Etapa Item (nested)
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoPeriodoEtapaItemDto" })
export class OfertaFormacaoPeriodoEtapaItemRestDto {
  @ApiProperty({ type: "string", description: "Nome da etapa" })
  nome: string;

  @ApiPropertyOptional({ type: "string", description: "Cor da etapa" })
  cor?: string;
}

// ============================================================================
// Periodo Item (for bulk replace)
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoPeriodoBulkReplaceItemDto" })
export class OfertaFormacaoPeriodoBulkReplaceItemRestDto {
  @ApiProperty({ type: "integer", description: "Numero do periodo", minimum: 1 })
  numeroPeriodo: number;

  @ApiPropertyOptional({
    type: () => [OfertaFormacaoPeriodoEtapaItemRestDto],
    description: "Etapas do periodo",
  })
  etapas?: OfertaFormacaoPeriodoEtapaItemRestDto[];
}

// ============================================================================
// Bulk Replace Input
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoPeriodoBulkReplaceInputDto" })
export class OfertaFormacaoPeriodoBulkReplaceInputRestDto {
  @ApiProperty({
    type: () => [OfertaFormacaoPeriodoBulkReplaceItemRestDto],
    description: "Lista de periodos com suas etapas",
  })
  periodos: OfertaFormacaoPeriodoBulkReplaceItemRestDto[];
}

// ============================================================================
// Output
// ============================================================================

@ApiSchema({ name: "OfertaFormacaoPeriodoEtapaOutputDto" })
export class OfertaFormacaoPeriodoEtapaOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string" }) nome: string;
  @ApiProperty({ type: "string" }) cor: string;
}

@ApiSchema({ name: "OfertaFormacaoPeriodoFindOneOutputDto" })
export class OfertaFormacaoPeriodoFindOneOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "integer" }) numeroPeriodo: number;
  @ApiProperty({ type: () => [OfertaFormacaoPeriodoEtapaOutputRestDto] })
  etapas: OfertaFormacaoPeriodoEtapaOutputRestDto[];
}

@ApiSchema({ name: "OfertaFormacaoPeriodoListOutputDto" })
export class OfertaFormacaoPeriodoListOutputRestDto {
  @ApiProperty({ type: () => [OfertaFormacaoPeriodoFindOneOutputRestDto] })
  data: OfertaFormacaoPeriodoFindOneOutputRestDto[];
}
