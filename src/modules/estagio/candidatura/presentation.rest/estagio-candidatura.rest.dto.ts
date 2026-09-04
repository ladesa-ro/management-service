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
