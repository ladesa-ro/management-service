import { createMapper } from "@/shared/mapping";
import type { EmpresaAvaliacao, IEmpresaAvaliacao } from "../../domain/empresa-avaliacao";
import type { EmpresaAvaliacaoCurtida } from "../../domain/empresa-avaliacao-curtida";
import type {
  EmpresaAvaliacaoFindOneQueryResult,
  EmpresaAvaliacaoHistoricoQueryResult,
} from "../../domain/queries";
import type { EmpresaAvaliacaoTypeormEntity } from "./empresa-avaliacao.typeorm.entity";
import type { EmpresaAvaliacaoCurtidaTypeormEntity } from "./empresa-avaliacao-curtida.typeorm.entity";
import type { EmpresaAvaliacaoHistoricoTypeormEntity } from "./empresa-avaliacao-historico.typeorm.entity";

export const EmpresaAvaliacaoTypeormMapper = {
  domainToPersistence: createMapper<EmpresaAvaliacao, Partial<EmpresaAvaliacaoTypeormEntity>>(
    (domain) => ({
      id: domain.id,
      empresa: { id: domain.empresa.id } as any,
      estagiario: { id: domain.estagiario.id } as any,
      rating: domain.rating,
      comentario: domain.comentario,
      relevanceScore: domain.relevanceScore,
      likesCount: domain.likesCount,
      dateCreated: domain.dateCreated,
      dateUpdated: domain.dateUpdated,
      dateDeleted: domain.dateDeleted,
    }),
  ),

  entityToDomain: createMapper<EmpresaAvaliacaoTypeormEntity, IEmpresaAvaliacao>((entity) => ({
    id: entity.id,
    empresa: { id: entity.empresa?.id },
    estagiario: { id: entity.estagiario?.id },
    rating: Number(entity.rating),
    comentario: entity.comentario,
    relevanceScore: Number(entity.relevanceScore),
    likesCount: Number(entity.likesCount ?? 0),
    dateCreated: entity.dateCreated,
    dateUpdated: entity.dateUpdated,
    dateDeleted: entity.dateDeleted,
  })),

  entityToFindOneQueryResult: createMapper<
    EmpresaAvaliacaoTypeormEntity,
    EmpresaAvaliacaoFindOneQueryResult
  >((entity) => {
    const usuario = entity.estagiario?.perfil?.usuario;
    return {
      id: entity.id,
      empresaId: entity.empresa?.id,
      estagiarioId: entity.estagiario?.id,
      autor: {
        id: usuario?.id ?? entity.estagiario?.id ?? "",
        nome: usuario?.nome ?? null,
        email: usuario?.email ?? null,
        matricula: usuario?.matricula ?? null,
      },
      rating: Number(entity.rating),
      comentario: entity.comentario,
      relevanceScore: Number(entity.relevanceScore),
      likesCount: Number(entity.likesCount ?? 0),
      dateCreated: entity.dateCreated,
      dateUpdated: entity.dateUpdated,
      dateDeleted: entity.dateDeleted,
    };
  }),

  curtidaEntityToDomain: createMapper<
    EmpresaAvaliacaoCurtidaTypeormEntity,
    EmpresaAvaliacaoCurtida
  >((entity) =>
    (entity as any)
      ? ({
          id: entity.id,
          avaliacao: { id: entity.avaliacao?.id },
          usuario: { id: entity.usuario?.id },
          dateCreated: entity.dateCreated,
          dateDeleted: entity.dateDeleted,
          ativo: entity.dateDeleted === null,
        } as any)
      : null,
  ),

  historicoEntityToQueryResult: createMapper<
    EmpresaAvaliacaoHistoricoTypeormEntity,
    EmpresaAvaliacaoHistoricoQueryResult
  >((entity) => ({
    id: entity.id,
    avaliacaoId: entity.avaliacao?.id,
    usuarioId: entity.usuario?.id,
    usuarioNome: entity.usuario?.nome ?? null,
    ratingAnterior: entity.ratingAnterior !== null ? Number(entity.ratingAnterior) : null,
    ratingNovo: Number(entity.ratingNovo),
    comentarioAnterior: entity.comentarioAnterior,
    comentarioNovo: entity.comentarioNovo,
    acao: entity.acao,
    dateCreated: entity.dateCreated,
  })),
};
