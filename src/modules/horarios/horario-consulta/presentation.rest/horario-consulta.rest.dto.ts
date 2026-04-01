import {
  HorarioAulaItemAmbienteFields,
  HorarioAulaItemDiarioFields,
  HorarioAulaItemDisciplinaFields,
  HorarioAulaItemFields,
  HorarioAulaItemProfessorFields,
  HorarioAulaItemProfessorPerfilFields,
  HorarioAulaItemProfessorUsuarioFields,
  HorarioAulaItemTurmaFields,
  HorarioSemanalDiaFields,
  HorarioSemanalOutputFields,
} from "@/modules/horarios/horario-consulta/domain/horario-consulta.fields";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { HorarioSemanalQueryFields } from "../domain/queries/horario-semanal.query";

// ============================================================================
// Query Params
// ============================================================================

@ApiSchema({ name: "HorarioSemanalQueryParamsDto" })
export class HorarioSemanalQueryParamsRestDto {
  @ApiProperty(HorarioSemanalQueryFields.semana.swaggerMetadata)
  semana: string;
}

@ApiSchema({ name: "HorarioMescladoQueryParamsDto" })
export class HorarioMescladoQueryParamsRestDto extends HorarioSemanalQueryParamsRestDto {
  @ApiProperty(HorarioSemanalQueryFields.turmaIds.swaggerMetadata)
  ids: string;

  @ApiPropertyOptional(HorarioSemanalQueryFields.professorIds.swaggerMetadata)
  professorIds?: string;
}

// ============================================================================
// Output
// ============================================================================

@ApiSchema({ name: "HorarioAulaItemDisciplinaDto" })
export class HorarioAulaItemDisciplinaRestDto {
  @ApiProperty(HorarioAulaItemDisciplinaFields.id.swaggerMetadata) id: string;
  @ApiProperty(HorarioAulaItemDisciplinaFields.nome.swaggerMetadata) nome: string;
  @ApiProperty(HorarioAulaItemDisciplinaFields.nomeAbreviado.swaggerMetadata) nomeAbreviado: string;
}

@ApiSchema({ name: "HorarioAulaItemTurmaDto" })
export class HorarioAulaItemTurmaRestDto {
  @ApiProperty(HorarioAulaItemTurmaFields.id.swaggerMetadata) id: string;
  @ApiProperty(HorarioAulaItemTurmaFields.periodo.swaggerMetadata) periodo: number;
}

@ApiSchema({ name: "HorarioAulaItemDiarioDto" })
export class HorarioAulaItemDiarioRestDto {
  @ApiProperty(HorarioAulaItemDiarioFields.id.swaggerMetadata) id: string;
  @ApiProperty({
    type: () => HorarioAulaItemDisciplinaRestDto,
    ...HorarioAulaItemDiarioFields.disciplina.swaggerMetadata,
  })
  disciplina: HorarioAulaItemDisciplinaRestDto;
  @ApiProperty({
    type: () => HorarioAulaItemTurmaRestDto,
    ...HorarioAulaItemDiarioFields.turma.swaggerMetadata,
  })
  turma: HorarioAulaItemTurmaRestDto;
}

@ApiSchema({ name: "HorarioAulaItemProfessorUsuarioDto" })
export class HorarioAulaItemProfessorUsuarioRestDto {
  @ApiProperty(HorarioAulaItemProfessorUsuarioFields.id.swaggerMetadata) id: string;
  @ApiPropertyOptional(HorarioAulaItemProfessorUsuarioFields.nome.swaggerMetadata)
  nome: string | null;
}

@ApiSchema({ name: "HorarioAulaItemProfessorPerfilDto" })
export class HorarioAulaItemProfessorPerfilRestDto {
  @ApiProperty(HorarioAulaItemProfessorPerfilFields.id.swaggerMetadata) id: string;
  @ApiProperty(HorarioAulaItemProfessorPerfilFields.cargo.swaggerMetadata) cargo: string;
}

@ApiSchema({ name: "HorarioAulaItemProfessorDto" })
export class HorarioAulaItemProfessorRestDto {
  @ApiProperty(HorarioAulaItemProfessorFields.id.swaggerMetadata) id: string;
  @ApiProperty({
    type: () => HorarioAulaItemProfessorPerfilRestDto,
    ...HorarioAulaItemProfessorFields.perfil.swaggerMetadata,
  })
  perfil: HorarioAulaItemProfessorPerfilRestDto;
  @ApiProperty({
    type: () => HorarioAulaItemProfessorUsuarioRestDto,
    ...HorarioAulaItemProfessorFields.usuario.swaggerMetadata,
  })
  usuario: HorarioAulaItemProfessorUsuarioRestDto;
}

@ApiSchema({ name: "HorarioAulaItemAmbienteDto" })
export class HorarioAulaItemAmbienteRestDto {
  @ApiProperty(HorarioAulaItemAmbienteFields.id.swaggerMetadata) id: string;
  @ApiProperty(HorarioAulaItemAmbienteFields.nome.swaggerMetadata) nome: string;
  @ApiProperty(HorarioAulaItemAmbienteFields.codigo.swaggerMetadata) codigo: string;
}

@ApiSchema({ name: "HorarioAulaItemDto" })
export class HorarioAulaItemRestDto {
  @ApiProperty(HorarioAulaItemFields.id.swaggerMetadata) id: string;
  @ApiProperty(HorarioAulaItemFields.dataInicio.swaggerMetadata) dataInicio: string;
  @ApiPropertyOptional(HorarioAulaItemFields.dataFim.swaggerMetadata) dataFim: string | null;
  @ApiProperty(HorarioAulaItemFields.horarioInicio.swaggerMetadata) horarioInicio: string;
  @ApiProperty(HorarioAulaItemFields.horarioFim.swaggerMetadata) horarioFim: string;
  @ApiPropertyOptional(HorarioAulaItemFields.nome.swaggerMetadata) nome: string | null;
  @ApiPropertyOptional(HorarioAulaItemFields.cor.swaggerMetadata) cor: string | null;
  @ApiPropertyOptional({
    type: () => HorarioAulaItemDiarioRestDto,
    ...HorarioAulaItemFields.diario.swaggerMetadata,
  })
  diario: HorarioAulaItemDiarioRestDto | null;
  @ApiProperty({
    type: () => [HorarioAulaItemProfessorRestDto],
    ...HorarioAulaItemFields.professores.swaggerMetadata,
  })
  professores: HorarioAulaItemProfessorRestDto[];
  @ApiPropertyOptional({
    type: () => HorarioAulaItemAmbienteRestDto,
    ...HorarioAulaItemFields.ambiente.swaggerMetadata,
  })
  ambiente: HorarioAulaItemAmbienteRestDto | null;
}

@ApiSchema({ name: "HorarioSemanalDiaDto" })
export class HorarioSemanalDiaRestDto {
  @ApiProperty(HorarioSemanalDiaFields.data.swaggerMetadata) data: string;
  @ApiProperty(HorarioSemanalDiaFields.diaSemana.swaggerMetadata) diaSemana: number;
  @ApiProperty({
    type: () => [HorarioAulaItemRestDto],
    ...HorarioSemanalDiaFields.aulas.swaggerMetadata,
  })
  aulas: HorarioAulaItemRestDto[];
}

@ApiSchema({ name: "HorarioSemanalOutputDto" })
export class HorarioSemanalOutputRestDto {
  @ApiProperty(HorarioSemanalOutputFields.semanaInicio.swaggerMetadata) semanaInicio: string;
  @ApiProperty(HorarioSemanalOutputFields.semanaFim.swaggerMetadata) semanaFim: string;
  @ApiProperty({
    type: () => [HorarioSemanalDiaRestDto],
    ...HorarioSemanalOutputFields.dias.swaggerMetadata,
  })
  dias: HorarioSemanalDiaRestDto[];
}
