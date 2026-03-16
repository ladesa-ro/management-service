import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
} from "@/modules/@shared/presentation/rest";
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from "@/modules/@shared/presentation/shared";

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
  @IsString()
  dataInicio: string;

  @ApiPropertyOptional({ type: "string", format: "date", description: "Data termino do periodo", nullable: true })
  dataTermino?: string;

  @ApiPropertyOptional({ type: "string", isArray: true, description: "IDs das ofertas de formacao" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  ofertaFormacaoIds?: string[];

  @ApiPropertyOptional({ enum: GerarHorarioDuracao, description: "Duracao: TEMPORARIO ou PERMANENTE" })
  @IsOptional()
  @IsEnum(GerarHorarioDuracao)
  duracao?: GerarHorarioDuracao;
}

// ============================================================================
// FindOne Params
// ============================================================================

@ApiSchema({ name: "GerarHorarioFindOneParamsDto" })
export class GerarHorarioFindOneParamsRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID da solicitacao" })
  @IsUUID()
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "GerarHorarioFindOneOutputDto" })
export class GerarHorarioFindOneOutputRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string", enum: ["SOLICITADO", "PENDENTE", "SUCESSO", "ERRO", "ACEITO", "REJEITADO"] })
  status: string;
  @ApiProperty({ type: "string" }) duracao: string;
  @ApiProperty({ type: "string", format: "date" }) dataInicio: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true }) dataTermino: string | null;
  @ApiPropertyOptional({ nullable: true }) respostaGerador: Record<string, unknown> | null;
  @ApiProperty({ type: "string", format: "date-time" }) dateCreated: string;
}
