import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApiSchema } from "@/shared/presentation/rest";
import { PaginationInputRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import {
  EstagioCandidaturaFields,
  EstagioCandidaturaSituacaoValues,
} from "../domain/estagio-candidatura.fields";

@ApiSchema({ name: "CandidaturaConvocarInputDto" })
export class CandidaturaConvocarInputRestDto {
  @ApiPropertyOptional({
    description: "Prazo de validade da convocação em dias (padrão: 5 dias)",
    example: 5,
    default: 5,
  })
  diasValidade?: number;
}

@ApiSchema({ name: "CandidaturaCancelarInputDto" })
export class CandidaturaCancelarInputRestDto {
  @ApiPropertyOptional(EstagioCandidaturaFields.motivoCancelamento.swaggerMetadata)
  motivo?: string;
}

@ApiSchema({ name: "MinhasCandidaturasListInputDto" })
export class MinhasCandidaturasListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por situação da candidatura",
    enum: EstagioCandidaturaSituacaoValues,
  })
  "filter.situacao"?: string;
}

@ApiSchema({ name: "EstagioCandidaturaEstagioRefDto" })
export class EstagioCandidaturaEstagioRefRestDto {
  @ApiProperty({ description: "ID do estágio", format: "uuid" })
  id!: string;

  @ApiProperty({ description: "Status do estágio", example: "DISPONIVEL" })
  status!: string;

  @ApiProperty({ description: "Carga horária semanal", example: 30 })
  cargaHoraria!: number;

  @ApiPropertyOptional({ description: "Empresa concedente" })
  empresa?: { id: string; razaoSocial?: string; nomeFantasia?: string } | null;

  @ApiPropertyOptional({ description: "Campus do estágio" })
  campus?: { id: string; nome?: string } | null;

  @ApiPropertyOptional({ description: "Curso de referência" })
  CursoReferencia?: { id: string; nome?: string } | null;
}

@ApiSchema({ name: "EstagioCandidaturaOutputDto" })
export class EstagioCandidaturaOutputRestDto {
  @ApiProperty(EstagioCandidaturaFields.id.swaggerMetadata)
  id!: string;

  @ApiProperty(EstagioCandidaturaFields.situacao.swaggerMetadata)
  situacao!: string;

  @ApiPropertyOptional(EstagioCandidaturaFields.posicaoFila.swaggerMetadata)
  posicaoFila!: number | null;

  @ApiProperty(EstagioCandidaturaFields.dataInscricao.swaggerMetadata)
  dataInscricao!: string;

  @ApiPropertyOptional(EstagioCandidaturaFields.dataOferta.swaggerMetadata)
  dataOferta!: string | null;

  @ApiPropertyOptional(EstagioCandidaturaFields.expiraEm.swaggerMetadata)
  expiraEm!: string | null;

  @ApiPropertyOptional(EstagioCandidaturaFields.dataResposta.swaggerMetadata)
  dataResposta!: string | null;

  @ApiProperty(EstagioCandidaturaFields.acaoDisponivel.swaggerMetadata)
  acaoDisponivel!: boolean;

  @ApiProperty({ type: () => EstagioCandidaturaEstagioRefRestDto })
  estagio!: EstagioCandidaturaEstagioRefRestDto;
}

@ApiSchema({ name: "MinhasCandidaturasListOutputDto" })
export class MinhasCandidaturasListOutputRestDto {
  @ApiProperty({ type: () => [EstagioCandidaturaOutputRestDto] })
  data!: EstagioCandidaturaOutputRestDto[];

  @ApiProperty({ type: () => PaginationMetaRestDto })
  meta!: PaginationMetaRestDto;
}

@ApiSchema({ name: "FilaEsperaAlunoDto" })
export class FilaEsperaAlunoRestDto {
  @ApiProperty({ description: "ID do usuário do aluno", format: "uuid" })
  id!: string;

  @ApiProperty({ description: "Nome do aluno" })
  nome!: string;

  @ApiPropertyOptional({ description: "Matrícula do aluno" })
  matricula?: string | null;

  @ApiProperty({ description: "Email do aluno" })
  email!: string;
}

@ApiSchema({ name: "FilaEsperaCursoDto" })
export class FilaEsperaCursoRestDto {
  @ApiProperty({ description: "ID do curso", format: "uuid" })
  id!: string;

  @ApiProperty({ description: "Nome do curso" })
  nome!: string;
}

@ApiSchema({ name: "FilaEsperaEstagiarioDto" })
export class FilaEsperaEstagiarioRestDto {
  @ApiProperty({ description: "ID do estagiário", format: "uuid" })
  id!: string;

  @ApiProperty({ description: "Período do estudante", example: "3º ano" })
  periodo!: string;

  @ApiProperty({ description: "Telefone de contato", example: "69999999999" })
  telefone!: string;

  @ApiPropertyOptional({ description: "Email institucional" })
  emailInstitucional?: string | null;

  @ApiPropertyOptional({ type: () => FilaEsperaAlunoRestDto })
  aluno?: FilaEsperaAlunoRestDto | null;

  @ApiPropertyOptional({ type: () => FilaEsperaCursoRestDto })
  curso?: FilaEsperaCursoRestDto | null;
}

@ApiSchema({ name: "FilaEsperaItemDto" })
export class FilaEsperaItemRestDto {
  @ApiProperty(EstagioCandidaturaFields.id.swaggerMetadata)
  id!: string;

  @ApiProperty(EstagioCandidaturaFields.situacao.swaggerMetadata)
  situacao!: string;

  @ApiPropertyOptional(EstagioCandidaturaFields.posicaoFila.swaggerMetadata)
  posicaoFila!: number | null;

  @ApiProperty(EstagioCandidaturaFields.dataInscricao.swaggerMetadata)
  dataInscricao!: string;

  @ApiPropertyOptional(EstagioCandidaturaFields.dataOferta.swaggerMetadata)
  dataOferta!: string | null;

  @ApiPropertyOptional(EstagioCandidaturaFields.expiraEm.swaggerMetadata)
  expiraEm!: string | null;

  @ApiPropertyOptional(EstagioCandidaturaFields.dataResposta.swaggerMetadata)
  dataResposta!: string | null;

  @ApiPropertyOptional(EstagioCandidaturaFields.motivoCancelamento.swaggerMetadata)
  motivoCancelamento!: string | null;

  @ApiProperty({ type: () => FilaEsperaEstagiarioRestDto })
  estagiario!: FilaEsperaEstagiarioRestDto;
}

@ApiSchema({ name: "FilaEsperaListInputDto" })
export class FilaEsperaListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por situação da candidatura",
    enum: EstagioCandidaturaSituacaoValues,
  })
  "filter.situacao"?: string;

  @ApiPropertyOptional({
    description: "Filtro por situação da candidatura (alias direto)",
    enum: EstagioCandidaturaSituacaoValues,
  })
  situacao?: string;
}

@ApiSchema({ name: "FilaEsperaListOutputDto" })
export class FilaEsperaListOutputRestDto {
  @ApiProperty({ type: () => [FilaEsperaItemRestDto] })
  data!: FilaEsperaItemRestDto[];

  @ApiProperty({ type: () => PaginationMetaRestDto })
  meta!: PaginationMetaRestDto;
}
