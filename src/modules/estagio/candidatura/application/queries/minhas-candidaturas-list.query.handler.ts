import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IPerfilRepository } from "@/modules/acesso/usuario/perfil/domain/repositories/perfil.repository.interface";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario";
import type { MinhasCandidaturasListQuery } from "../../domain/queries/minhas-candidaturas-list.query";
import type { IMinhasCandidaturasListQueryHandler } from "../../domain/queries/minhas-candidaturas-list.query.handler.interface";
import type { MinhasCandidaturasListQueryResult } from "../../domain/queries/minhas-candidaturas-list.query.result";
import { IEstagioCandidaturaRepository } from "../../domain/repositories/estagio-candidatura.repository.interface";

@Impl()
export class MinhasCandidaturasListQueryHandlerImpl implements IMinhasCandidaturasListQueryHandler {
  constructor(
    @Dep(IEstagioCandidaturaRepository)
    private readonly repository: IEstagioCandidaturaRepository,
    @Dep(IEstagiarioRepository)
    private readonly estagiarioRepository: IEstagiarioRepository,
    @Dep(IPerfilRepository)
    private readonly perfilRepository: IPerfilRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    query: MinhasCandidaturasListQuery | null,
  ): Promise<MinhasCandidaturasListQueryResult> {
    const actorId = accessContext?.requestActor?.id;
    if (!actorId) {
      throw new UnauthorizedError("Usuário não autenticado.");
    }

    let estagiario = await this.estagiarioRepository.findByUsuarioId(actorId);
    if (!estagiario) {
      const perfis = await this.perfilRepository.findAllActiveByUsuarioId(accessContext, actorId);
      for (const perfil of perfis) {
        estagiario = await this.estagiarioRepository.findByPerfilId(perfil.id);
        if (estagiario) break;
      }
    }

    if (!estagiario) {
      throw new ForbiddenError("Usuário não possui perfil de estagiário cadastrado.");
    }

    const page = query?.page ?? 1;
    const limit = query?.limit ?? 10;
    const situacao = query?.["filter.situacao"] as string | undefined;

    const { items, total } = await this.repository.findMinhasCandidaturas(
      accessContext,
      estagiario.id,
      {
        page,
        limit,
        situacao,
      },
    );

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      data: items,
      meta: {
        totalItems: total,
        currentPage: page,
        totalPages,
        itemsPerPage: limit,
      },
    };
  }
}
