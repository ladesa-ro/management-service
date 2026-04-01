import { SharedFields } from "@/domain/abstractions";
import { TurmaEventoFields } from "@/modules/ensino/turma/domain/turma-evento.fields";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

// ============================================================================
// Parent Route Params
// ============================================================================

@ApiSchema({ name: "TurmaEventoParentParamsDto" })
export class TurmaEventoParentParamsRestDto {
  @ApiProperty({ ...SharedFields.idUuid.swaggerMetadata, description: "ID da turma" })
  turmaId: string;
}

@ApiSchema({ name: "TurmaEventoItemParamsDto" })
export class TurmaEventoItemParamsRestDto {
  @ApiProperty({ ...SharedFields.idUuid.swaggerMetadata, description: "ID da turma" })
  turmaId: string;

  @ApiProperty({ ...SharedFields.idUuid.swaggerMetadata, description: "ID do evento" })
  eventoId: string;
}

// ============================================================================
// Create Input
// ============================================================================

@ApiSchema({ name: "TurmaEventoCreateInputDto" })
export class TurmaEventoCreateInputRestDto {
  @ApiProperty(TurmaEventoFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(TurmaEventoFields.dataInicio.swaggerMetadata)
  dataInicio: string;

  @ApiPropertyOptional(TurmaEventoFields.dataFim.swaggerMetadata)
  dataFim?: string;

  @ApiProperty(TurmaEventoFields.diaInteiro.swaggerMetadata)
  diaInteiro: boolean;

  @ApiPropertyOptional(TurmaEventoFields.horarioInicio.swaggerMetadata)
  horarioInicio?: string;

  @ApiPropertyOptional(TurmaEventoFields.horarioFim.swaggerMetadata)
  horarioFim?: string;

  @ApiPropertyOptional(TurmaEventoFields.cor.swaggerMetadata)
  cor?: string;

  @ApiPropertyOptional(TurmaEventoFields.repeticao.swaggerMetadata)
  repeticao?: string;
}

// ============================================================================
// Update Input
// ============================================================================

@ApiSchema({ name: "TurmaEventoUpdateInputDto" })
export class TurmaEventoUpdateInputRestDto {
  @ApiPropertyOptional(TurmaEventoFields.nome.swaggerMetadata) nome?: string;
  @ApiPropertyOptional(TurmaEventoFields.dataInicio.swaggerMetadata) dataInicio?: string;
  @ApiPropertyOptional(TurmaEventoFields.dataFim.swaggerMetadata) dataFim?: string;
  @ApiPropertyOptional(TurmaEventoFields.diaInteiro.swaggerMetadata) diaInteiro?: boolean;
  @ApiPropertyOptional(TurmaEventoFields.horarioInicio.swaggerMetadata) horarioInicio?: string;
  @ApiPropertyOptional(TurmaEventoFields.horarioFim.swaggerMetadata) horarioFim?: string;
  @ApiPropertyOptional(TurmaEventoFields.cor.swaggerMetadata) cor?: string;
  @ApiPropertyOptional(TurmaEventoFields.repeticao.swaggerMetadata) repeticao?: string;
}

// ============================================================================
// Output (reuses CalendarioEventoFindOneOutputRestDto shape)
// ============================================================================

@ApiSchema({ name: "TurmaEventoFindOneOutputDto" })
export class TurmaEventoFindOneOutputRestDto {
  @ApiProperty(TurmaEventoFields.id.swaggerMetadata) id: string;
  @ApiPropertyOptional(TurmaEventoFields.nome.swaggerMetadata) nome: string | null;
  @ApiProperty(TurmaEventoFields.dataInicio.swaggerMetadata) dataInicio: string;
  @ApiPropertyOptional(TurmaEventoFields.dataFim.swaggerMetadata) dataFim: string | null;
  @ApiProperty(TurmaEventoFields.diaInteiro.swaggerMetadata) diaInteiro: boolean;
  @ApiProperty(TurmaEventoFields.horarioInicio.swaggerMetadata) horarioInicio: string;
  @ApiProperty(TurmaEventoFields.horarioFim.swaggerMetadata) horarioFim: string;
  @ApiPropertyOptional(TurmaEventoFields.cor.swaggerMetadata) cor: string | null;
  @ApiPropertyOptional(TurmaEventoFields.repeticao.swaggerMetadata) repeticao: string | null;
  @ApiPropertyOptional(TurmaEventoFields.status.swaggerMetadata) status: string | null;
}

@ApiSchema({ name: "TurmaEventoListOutputDto" })
export class TurmaEventoListOutputRestDto {
  @ApiProperty({
    ...SharedFields.data.swaggerMetadata,
    type: () => [TurmaEventoFindOneOutputRestDto],
  })
  data: TurmaEventoFindOneOutputRestDto[];
}
