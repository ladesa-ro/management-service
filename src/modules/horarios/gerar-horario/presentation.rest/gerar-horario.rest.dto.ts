import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

export enum GerarHorarioDuracao {
  TEMPORARIO = "TEMPORARIO",
  PERMANENTE = "PERMANENTE",
}

// ============================================================================
// Create Input
// ============================================================================

@ApiSchema({ name: "GerarHorarioCreateInputDto" })
export class GerarHorarioCreateInputRestDto {
  @ApiProperty({ type: "string", format: "date", description: "Data inicio do periodo" })
  dataInicio: string;

  @ApiPropertyOptional({
    type: "string",
    format: "date",
    description: "Data termino do periodo",
    nullable: true,
  })
  dataTermino?: string;

  @ApiPropertyOptional({
    type: "string",
    isArray: true,
    description: "IDs das ofertas de formacao",
  })
  ofertaFormacaoIds?: string[];

  @ApiPropertyOptional({
    enum: GerarHorarioDuracao,
    description: "Duracao: TEMPORARIO ou PERMANENTE",
  })
  duracao?: GerarHorarioDuracao;
}

// ============================================================================
// FindOne Params
// ============================================================================

@ApiSchema({ name: "GerarHorarioFindOneParamsDto" })
export class GerarHorarioFindOneParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID da solicitacao" })
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "GerarHorarioFindOneOutputDto" })
export class GerarHorarioFindOneOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({
    type: "string",
    enum: ["SOLICITADO", "PENDENTE", "SUCESSO", "ERRO", "ACEITO", "REJEITADO"],
  })
  status: string;
  @ApiProperty({ type: "string" }) duracao: string;
  @ApiProperty({ type: "string", format: "date" }) dataInicio: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true }) dataTermino:
    | string
    | null;
  @ApiPropertyOptional({ nullable: true }) respostaGerador: Record<string, unknown> | null;
  @ApiProperty({ type: "string", format: "date-time" }) dateCreated: string;
}
