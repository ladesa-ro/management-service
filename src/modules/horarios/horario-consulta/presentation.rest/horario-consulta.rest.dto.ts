import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
} from "@/modules/@shared/presentation/rest";
import {
  IsOptional,
  IsString,
  IsUUID,
  IsArray,
} from "@/modules/@shared/presentation/shared";

// ============================================================================
// Query Params
// ============================================================================

@ApiSchema({ name: "HorarioSemanalQueryParamsDto" })
export class HorarioSemanalQueryParamsRestDto {
  @ApiProperty({
    type: "string",
    description: "Data da semana desejada (YYYY-MM-DD). Qualquer dia da semana; a API calcula seg-dom.",
    format: "date",
  })
  @IsString()
  semana: string;
}

@ApiSchema({ name: "HorarioMescladoQueryParamsDto" })
export class HorarioMescladoQueryParamsRestDto extends HorarioSemanalQueryParamsRestDto {
  @ApiProperty({
    type: "string",
    description: "IDs das turmas, separados por virgula",
  })
  @IsString()
  ids: string;

  @ApiPropertyOptional({
    type: "string",
    description: "IDs dos professores (perfil), separados por virgula",
  })
  @IsOptional()
  @IsString()
  professorIds?: string;
}

// ============================================================================
// Output
// ============================================================================

@ApiSchema({ name: "HorarioAulaItemDisciplinaDto" })
export class HorarioAulaItemDisciplinaRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string" }) nome: string;
  @ApiProperty({ type: "string" }) nomeAbreviado: string;
}

@ApiSchema({ name: "HorarioAulaItemTurmaDto" })
export class HorarioAulaItemTurmaRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "number" }) periodo: number;
}

@ApiSchema({ name: "HorarioAulaItemDiarioDto" })
export class HorarioAulaItemDiarioRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: () => HorarioAulaItemDisciplinaRestDto }) disciplina: HorarioAulaItemDisciplinaRestDto;
  @ApiProperty({ type: () => HorarioAulaItemTurmaRestDto }) turma: HorarioAulaItemTurmaRestDto;
}

@ApiSchema({ name: "HorarioAulaItemProfessorUsuarioDto" })
export class HorarioAulaItemProfessorUsuarioRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiPropertyOptional({ type: "string", nullable: true }) nome: string | null;
}

@ApiSchema({ name: "HorarioAulaItemProfessorPerfilDto" })
export class HorarioAulaItemProfessorPerfilRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string" }) cargo: string;
}

@ApiSchema({ name: "HorarioAulaItemProfessorDto" })
export class HorarioAulaItemProfessorRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: () => HorarioAulaItemProfessorPerfilRestDto }) perfil: HorarioAulaItemProfessorPerfilRestDto;
  @ApiProperty({ type: () => HorarioAulaItemProfessorUsuarioRestDto }) usuario: HorarioAulaItemProfessorUsuarioRestDto;
}

@ApiSchema({ name: "HorarioAulaItemAmbienteDto" })
export class HorarioAulaItemAmbienteRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string" }) nome: string;
  @ApiProperty({ type: "string" }) codigo: string;
}

@ApiSchema({ name: "HorarioAulaItemDto" })
export class HorarioAulaItemRestDto {
  @ApiProperty({ type: "string" }) id: string;
  @ApiProperty({ type: "string", format: "date" }) dataInicio: string;
  @ApiPropertyOptional({ type: "string", format: "date", nullable: true }) dataFim: string | null;
  @ApiProperty({ type: "string" }) horarioInicio: string;
  @ApiProperty({ type: "string" }) horarioFim: string;
  @ApiPropertyOptional({ type: "string", nullable: true }) nome: string | null;
  @ApiPropertyOptional({ type: "string", nullable: true }) cor: string | null;
  @ApiPropertyOptional({ type: () => HorarioAulaItemDiarioRestDto, nullable: true }) diario: HorarioAulaItemDiarioRestDto | null;
  @ApiProperty({ type: () => [HorarioAulaItemProfessorRestDto] }) professores: HorarioAulaItemProfessorRestDto[];
  @ApiPropertyOptional({ type: () => HorarioAulaItemAmbienteRestDto, nullable: true }) ambiente: HorarioAulaItemAmbienteRestDto | null;
}

@ApiSchema({ name: "HorarioSemanalDiaDto" })
export class HorarioSemanalDiaRestDto {
  @ApiProperty({ type: "string", format: "date" }) data: string;
  @ApiProperty({ type: "number", description: "0=dom, 1=seg, ..., 6=sab" }) diaSemana: number;
  @ApiProperty({ type: () => [HorarioAulaItemRestDto] }) aulas: HorarioAulaItemRestDto[];
}

@ApiSchema({ name: "HorarioSemanalOutputDto" })
export class HorarioSemanalOutputRestDto {
  @ApiProperty({ type: "string", format: "date" }) semanaInicio: string;
  @ApiProperty({ type: "string", format: "date" }) semanaFim: string;
  @ApiProperty({ type: () => [HorarioSemanalDiaRestDto] }) dias: HorarioSemanalDiaRestDto[];
}
