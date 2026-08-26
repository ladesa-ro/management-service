import { ConflictError, ResourceNotFoundError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  EmpresaAvaliacaoCurtida,
  IEmpresaAvaliacaoLikeCommandHandler,
  IEmpresaAvaliacaoRepository,
} from "../../domain";
import type {
  EmpresaAvaliacaoLikeCommand,
  EmpresaAvaliacaoLikeResult,
} from "../../domain/commands/empresa-avaliacao-like.command";

@Impl()
export class EmpresaAvaliacaoLikeCommandHandlerImpl implements IEmpresaAvaliacaoLikeCommandHandler {
  constructor(
    @Dep(IEmpresaAvaliacaoRepository)
    private readonly repository: IEmpresaAvaliacaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EmpresaAvaliacaoLikeCommand,
  ): Promise<EmpresaAvaliacaoLikeResult> {
    const userId = accessContext?.requestActor?.id;
    if (!userId) {
      throw new UnauthorizedError("Usuário deve estar autenticado para curtir uma avaliação.");
    }

    const avaliacao = await this.repository.loadById(accessContext, dto.avaliacaoId);
    if (!avaliacao || !avaliacao.isActive()) {
      throw new ResourceNotFoundError("Avaliação não encontrada.");
    }

    const activeLike = await this.repository.findActiveLike(dto.avaliacaoId, userId);
    if (activeLike) {
      throw new ConflictError("Você já curtiu esta avaliação.");
    }

    const existingInactiveLike = await this.repository.findAnyLike(dto.avaliacaoId, userId);
    if (existingInactiveLike) {
      existingInactiveLike.reactivate();
      await this.repository.saveLike(existingInactiveLike);
    } else {
      const newLike = EmpresaAvaliacaoCurtida.create({
        avaliacaoId: dto.avaliacaoId,
        usuarioId: userId,
      });
      await this.repository.saveLike(newLike);
    }

    const newLikesCount = await this.repository.countActiveLikes(dto.avaliacaoId);
    avaliacao.updateLikesCount(newLikesCount);
    await this.repository.save(avaliacao);

    return {
      avaliacaoId: avaliacao.id,
      likesCount: avaliacao.likesCount,
      isLikedByCurrentUser: true,
      relevanceScore: avaliacao.relevanceScore,
    };
  }
}
