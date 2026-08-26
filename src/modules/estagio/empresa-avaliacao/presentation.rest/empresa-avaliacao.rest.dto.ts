import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { EntityBaseRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import type { EmpresaAvaliacaoOrdenacao } from "../domain/queries/empresa-avaliacao-list.query";

// ============================================================================
// Autor DTO
// ============================================================================

@ApiSchema({ name: "EmpresaAvaliacaoAutorOutputDto" })
export class EmpresaAvaliacaoAutorOutputRestDto {
  @ApiProperty({ description: "ID do usuário/estagiário autor da avaliação" })
  id: string;

  @ApiPropertyOptional({ description: "Nome do autor" })
  nome: string | null;

  @ApiPropertyOptional({ description: "Email institucional ou pessoal do autor" })
  email: string | null;

  @ApiPropertyOptional({ description: "Matrícula do estagiário" })
  matricula: string | null;
}

// ============================================================================
// FindOne / Detalhe Output
// ============================================================================

@ApiSchema({ name: "EmpresaAvaliacaoFindOneOutputDto" })
export class EmpresaAvaliacaoFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({ description: "ID da empresa avaliada" })
  empresaId: string;

  @ApiProperty({ description: "ID do perfil de estagiário" })
  estagiarioId: string;

  @ApiProperty({
    description: "Dados do autor da avaliação",
    type: () => EmpresaAvaliacaoAutorOutputRestDto,
  })
  autor: EmpresaAvaliacaoAutorOutputRestDto;

  @ApiProperty({ description: "Nota atribuída de 1 a 5 estrelas", example: 5 })
  rating: number;

  @ApiPropertyOptional({
    description: "Comentário sobre o estágio (até 2000 caracteres)",
    example: "Excelente empresa para aprender e se desenvolver.",
  })
  comentario: string | null;

  @ApiProperty({
    description: "Score de relevância calculado para o comentário",
    example: 8.45,
  })
  relevanceScore: number;

  @ApiProperty({ description: "Quantidade total de curtidas recebidas", example: 12 })
  likesCount: number;

  @ApiPropertyOptional({
    description: "Indica se o usuário autenticado curtiu esta avaliação",
    example: true,
  })
  isLikedByCurrentUser?: boolean;
}

// ============================================================================
// Create / Update Inputs
// ============================================================================

@ApiSchema({ name: "EmpresaAvaliacaoCreateInputDto" })
export class EmpresaAvaliacaoCreateInputRestDto {
  @ApiProperty({
    description: "Nota de 1 a 5 estrelas",
    minimum: 1,
    maximum: 5,
    example: 5,
  })
  rating: number;

  @ApiPropertyOptional({
    description: "Comentário detalhado (até 2.000 caracteres)",
    maxLength: 2000,
    example: "Ambiente muito acolhedor, ótimos projetos e mentoria atenciosa.",
  })
  comentario?: string | null;
}

@ApiSchema({ name: "EmpresaAvaliacaoUpdateInputDto" })
export class EmpresaAvaliacaoUpdateInputRestDto {
  @ApiPropertyOptional({
    description: "Nota atualizada de 1 a 5 estrelas",
    minimum: 1,
    maximum: 5,
    example: 4,
  })
  rating?: number;

  @ApiPropertyOptional({
    description: "Comentário atualizado (até 2.000 caracteres)",
    maxLength: 2000,
  })
  comentario?: string | null;
}

// ============================================================================
// List Query Params & Output
// ============================================================================

@ApiSchema({ name: "EmpresaAvaliacaoListInputDto" })
export class EmpresaAvaliacaoListInputRestDto {
  @ApiPropertyOptional({ description: "Número da página", default: 1, example: 1 })
  page?: number;

  @ApiPropertyOptional({ description: "Itens por página", default: 20, example: 20 })
  limit?: number;

  @ApiPropertyOptional({
    description: "Critério de ordenação dos comentários/avaliações",
    enum: ["relevancia", "mais_recentes", "mais_curtidos", "melhor_avaliacao", "pior_avaliacao"],
    default: "relevancia",
  })
  order?: EmpresaAvaliacaoOrdenacao;

  @ApiPropertyOptional({ description: "Filtrar por nota exata (1 a 5)", example: 5 })
  rating?: number;
}

@ApiSchema({ name: "EmpresaAvaliacaoListOutputDto" })
export class EmpresaAvaliacaoListOutputRestDto {
  @ApiProperty({ type: () => PaginationMetaRestDto })
  meta: PaginationMetaRestDto;

  @ApiProperty({ type: () => [EmpresaAvaliacaoFindOneOutputRestDto] })
  data: EmpresaAvaliacaoFindOneOutputRestDto[];
}

// ============================================================================
// Curtida Output
// ============================================================================

@ApiSchema({ name: "EmpresaAvaliacaoLikeOutputDto" })
export class EmpresaAvaliacaoLikeOutputRestDto {
  @ApiProperty({ description: "ID da avaliação" })
  avaliacaoId: string;

  @ApiProperty({ description: "Quantidade atualizada de curtidas", example: 5 })
  likesCount: number;

  @ApiProperty({ description: "Se o usuário atual curtiu a avaliação", example: true })
  isLikedByCurrentUser: boolean;

  @ApiProperty({ description: "Score de relevância recalculado", example: 6.82 })
  relevanceScore: number;
}

// ============================================================================
// Histórico Output
// ============================================================================

@ApiSchema({ name: "EmpresaAvaliacaoHistoricoOutputDto" })
export class EmpresaAvaliacaoHistoricoOutputRestDto {
  @ApiProperty({ description: "ID do registro de histórico" })
  id: string;

  @ApiProperty({ description: "ID da avaliação" })
  avaliacaoId: string;

  @ApiProperty({ description: "ID do usuário que efetuou a alteração" })
  usuarioId: string;

  @ApiPropertyOptional({ description: "Nome do usuário" })
  usuarioNome: string | null;

  @ApiPropertyOptional({ description: "Nota anterior" })
  ratingAnterior: number | null;

  @ApiProperty({ description: "Nota nova" })
  ratingNovo: number;

  @ApiPropertyOptional({ description: "Comentário anterior" })
  comentarioAnterior: string | null;

  @ApiPropertyOptional({ description: "Comentário novo" })
  comentarioNovo: string | null;

  @ApiProperty({ description: "Ação realizada: CRIACAO, EDICAO, REMOCAO", example: "EDICAO" })
  acao: string;

  @ApiProperty({ description: "Data/hora da alteração" })
  dateCreated: string;
}
