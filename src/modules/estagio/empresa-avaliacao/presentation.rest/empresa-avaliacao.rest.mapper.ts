import { createMapper } from "@/shared/mapping";
import type {
  EmpresaAvaliacaoCreateCommand,
  EmpresaAvaliacaoUpdateCommand,
} from "../domain/commands";
import type {
  EmpresaAvaliacaoFindOneQueryResult,
  EmpresaAvaliacaoHistoricoQueryResult,
  EmpresaAvaliacaoListQuery,
  EmpresaAvaliacaoListQueryResult,
} from "../domain/queries";
import type {
  EmpresaAvaliacaoCreateInputRestDto,
  EmpresaAvaliacaoFindOneOutputRestDto,
  EmpresaAvaliacaoHistoricoOutputRestDto,
  EmpresaAvaliacaoListInputRestDto,
  EmpresaAvaliacaoListOutputRestDto,
  EmpresaAvaliacaoUpdateInputRestDto,
} from "./empresa-avaliacao.rest.dto";

export const EmpresaAvaliacaoRestMapper = {
  createInputDtoToCreateCommand: (
    empresaId: string,
    dto: EmpresaAvaliacaoCreateInputRestDto,
  ): EmpresaAvaliacaoCreateCommand => ({
    empresaId,
    rating: dto.rating,
    comentario: dto.comentario,
  }),

  updateInputDtoToUpdateCommand: (
    id: string,
    dto: EmpresaAvaliacaoUpdateInputRestDto,
  ): EmpresaAvaliacaoUpdateCommand => ({
    id,
    rating: dto.rating,
    comentario: dto.comentario,
  }),

  listInputDtoToListQuery: (
    empresaId: string,
    dto: EmpresaAvaliacaoListInputRestDto,
  ): EmpresaAvaliacaoListQuery => ({
    empresaId,
    page: dto.page,
    limit: dto.limit,
    order: dto.order,
    rating: dto.rating,
  }),

  findOneQueryResultToOutputDto: createMapper<
    EmpresaAvaliacaoFindOneQueryResult,
    EmpresaAvaliacaoFindOneOutputRestDto
  >((result) => ({
    id: result.id,
    empresaId: result.empresaId,
    estagiarioId: result.estagiarioId,
    autor: {
      id: result.autor?.id ?? "",
      nome: result.autor?.nome ?? null,
      email: result.autor?.email ?? null,
      matricula: result.autor?.matricula ?? null,
    },
    rating: result.rating,
    comentario: result.comentario,
    relevanceScore: result.relevanceScore,
    likesCount: result.likesCount,
    isLikedByCurrentUser: result.isLikedByCurrentUser,
    dateCreated: result.dateCreated,
    dateUpdated: result.dateUpdated,
    dateDeleted: result.dateDeleted,
  })),

  listQueryResultToListOutputDto: (
    result: EmpresaAvaliacaoListQueryResult,
  ): EmpresaAvaliacaoListOutputRestDto => ({
    meta: {
      totalItems: result.meta.totalItems,
      itemsPerPage: result.meta.itemsPerPage,
      totalPages: result.meta.totalPages,
      currentPage: result.meta.currentPage,
      sortBy: result.meta.sortBy as any,
      search: "",
    },
    data: result.data.map(EmpresaAvaliacaoRestMapper.findOneQueryResultToOutputDto.map),
  }),

  historicoQueryResultToOutputDto: createMapper<
    EmpresaAvaliacaoHistoricoQueryResult,
    EmpresaAvaliacaoHistoricoOutputRestDto
  >((result) => ({
    id: result.id,
    avaliacaoId: result.avaliacaoId,
    usuarioId: result.usuarioId,
    usuarioNome: result.usuarioNome,
    ratingAnterior: result.ratingAnterior,
    ratingNovo: result.ratingNovo,
    comentarioAnterior: result.comentarioAnterior,
    comentarioNovo: result.comentarioNovo,
    acao: result.acao,
    dateCreated: result.dateCreated,
  })),
};
