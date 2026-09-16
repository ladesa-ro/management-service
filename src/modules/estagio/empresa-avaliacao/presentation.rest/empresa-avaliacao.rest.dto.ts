import { z } from "zod";
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

export const empresaAvaliacaoListInputSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  order: z
    .enum(["relevancia", "mais_recentes", "mais_curtidos", "melhor_avaliacao", "pior_avaliacao"])
    .optional()
    .default("relevancia"),
  rating: z.coerce.number().int().min(1).max(5).optional(),
});

@ApiSchema({ name: "EmpresaAvaliacaoListInputDto" })
export class EmpresaAvaliacaoListInputRestDto {
  static schema = empresaAvaliacaoListInputSchema;

  @ApiPropertyOptional({
    description: "Número da página",
    minimum: 1,
    default: 1,
    example: 1,
  })
  page?: number;

  @ApiPropertyOptional({
    description: "Itens por página (máximo 100)",
    minimum: 1,
    maximum: 100,
    default: 20,
    example: 20,
  })
  limit?: number;

  @ApiPropertyOptional({
    description: "Critério de ordenação dos comentários/avaliações",
    enum: ["relevancia", "mais_recentes", "mais_curtidos", "melhor_avaliacao", "pior_avaliacao"],
    default: "relevancia",
  })
  order?: EmpresaAvaliacaoOrdenacao;

  @ApiPropertyOptional({
    description: "Filtrar por nota exata (1 a 5)",
    minimum: 1,
    maximum: 5,
    example: 5,
  })
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

// ============================================================================
// Empresas Elegíveis / Avaliáveis pelo Estagiário
// ============================================================================

@ApiSchema({ name: "EmpresaAvaliavelOutputDto" })
export class EmpresaAvaliavelOutputRestDto {
  @ApiProperty({
    description: "ID da empresa concedente",
    example: "018f3a2b-c4d5-7e8f-9a0b-1c2d3e4f5a6b",
  })
  empresaId: string;

  @ApiProperty({ description: "Razão social da empresa", example: "Acme Serviços LTDA" })
  razaoSocial: string;

  @ApiPropertyOptional({ description: "Nome fantasia da empresa", example: "Acme Tech" })
  nomeFantasia: string | null;

  @ApiProperty({ description: "CNPJ da empresa (apenas dígitos)", example: "12345678000195" })
  cnpj: string;

  @ApiProperty({
    description: "Indica se o estágio na empresa já foi concluído (status ENCERRADO)",
    example: true,
  })
  concluido: boolean;

  @ApiProperty({
    description: "Indica se o estagiário já realizou uma avaliação desta empresa",
    example: false,
  })
  avaliada: boolean;

  @ApiPropertyOptional({
    description: "ID da avaliação já realizada pelo estagiário, se existir",
    example: null,
  })
  avaliacaoId: string | null;
}
