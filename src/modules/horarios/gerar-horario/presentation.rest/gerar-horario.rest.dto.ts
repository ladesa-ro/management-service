import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { GerarHorarioFields } from "../domain/gerar-horario.fields";

// ============================================================================
// Create Input
// ============================================================================

@ApiSchema({ name: "GerarHorarioCreateInputDto" })
export class GerarHorarioCreateInputRestDto {
  @ApiProperty(GerarHorarioFields.dataInicio.swaggerMetadata)
  dataInicio: string;

  @ApiPropertyOptional(GerarHorarioFields.dataTermino.swaggerMetadata)
  dataTermino?: string;

  @ApiPropertyOptional(GerarHorarioFields.ofertaFormacaoIds.swaggerMetadata)
  ofertaFormacaoIds?: string[];

  @ApiPropertyOptional(GerarHorarioFields.duracao.swaggerMetadata)
  duracao?: string;
}

// ============================================================================
// FindOne Params
// ============================================================================

@ApiSchema({ name: "GerarHorarioFindOneParamsDto" })
export class GerarHorarioFindOneParamsRestDto {
  @ApiProperty(GerarHorarioFields.id.swaggerMetadata)
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "GerarHorarioFindOneOutputDto" })
export class GerarHorarioFindOneOutputRestDto {
  @ApiProperty(GerarHorarioFields.id.swaggerMetadata) id: string;

  @ApiProperty(GerarHorarioFields.status.swaggerMetadata)
  status: string;

  @ApiProperty(GerarHorarioFields.duracao.swaggerMetadata)
  duracao: string;

  @ApiProperty(GerarHorarioFields.dataInicio.swaggerMetadata)
  dataInicio: string;

  @ApiPropertyOptional(GerarHorarioFields.dataTermino.swaggerMetadata)
  dataTermino: string | null;

  @ApiPropertyOptional(GerarHorarioFields.respostaGerador.swaggerMetadata)
  respostaGerador: Record<string, unknown> | null;

  @ApiProperty(GerarHorarioFields.dateCreated.swaggerMetadata)
  dateCreated: string;
}
