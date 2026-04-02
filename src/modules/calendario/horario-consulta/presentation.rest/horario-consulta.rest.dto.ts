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
} from "@/modules/calendario/horario-consulta/domain/horario-consulta.fields";
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
    ...HorarioAulaItemDiarioFields.disciplina.swaggerMetadata,
    type: () => HorarioAulaItemDisciplinaRestDto,
  })
  disciplina: HorarioAulaItemDisciplinaRestDto;
  @ApiProperty({
    ...HorarioAulaItemDiarioFields.turma.swaggerMetadata,
    type: () => HorarioAulaItemTurmaRestDto,
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
    ...HorarioAulaItemProfessorFields.perfil.swaggerMetadata,
    type: () => HorarioAulaItemProfessorPerfilRestDto,
  })
  perfil: HorarioAulaItemProfessorPerfilRestDto;
  @ApiProperty({
    ...HorarioAulaItemProfessorFields.usuario.swaggerMetadata,
    type: () => HorarioAulaItemProfessorUsuarioRestDto,
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
    ...HorarioAulaItemFields.diario.swaggerMetadata,
    type: () => HorarioAulaItemDiarioRestDto,
  })
  diario: HorarioAulaItemDiarioRestDto | null;
  @ApiProperty({
    ...HorarioAulaItemFields.professores.swaggerMetadata,
    type: () => [HorarioAulaItemProfessorRestDto],
  })
  professores: HorarioAulaItemProfessorRestDto[];
  @ApiPropertyOptional({
    ...HorarioAulaItemFields.ambiente.swaggerMetadata,
    type: () => HorarioAulaItemAmbienteRestDto,
  })
  ambiente: HorarioAulaItemAmbienteRestDto | null;
}

@ApiSchema({ name: "HorarioSemanalDiaDto" })
export class HorarioSemanalDiaRestDto {
  @ApiProperty(HorarioSemanalDiaFields.data.swaggerMetadata) data: string;
  @ApiProperty(HorarioSemanalDiaFields.diaSemana.swaggerMetadata) diaSemana: number;
  @ApiProperty({
    ...HorarioSemanalDiaFields.aulas.swaggerMetadata,
    type: () => [HorarioAulaItemRestDto],
  })
  aulas: HorarioAulaItemRestDto[];
}

@ApiSchema({ name: "HorarioSemanalOutputDto" })
export class HorarioSemanalOutputRestDto {
  @ApiProperty(HorarioSemanalOutputFields.semanaInicio.swaggerMetadata) semanaInicio: string;
  @ApiProperty(HorarioSemanalOutputFields.semanaFim.swaggerMetadata) semanaFim: string;
  @ApiProperty({
    ...HorarioSemanalOutputFields.dias.swaggerMetadata,
    type: () => [HorarioSemanalDiaRestDto],
  })
  dias: HorarioSemanalDiaRestDto[];
}
