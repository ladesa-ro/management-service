import { ResourceNotFoundError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEmpresaAvaliacaoRepository, IEmpresaAvaliacaoUnlikeCommandHandler } from "../../domain";
import type {
  EmpresaAvaliacaoLikeResult,
  EmpresaAvaliacaoUnlikeCommand,
} from "../../domain/commands";

@Impl()
export class EmpresaAvaliacaoUnlikeCommandHandlerImpl
  implements IEmpresaAvaliacaoUnlikeCommandHandler
{
  constructor(
    @Dep(IEmpresaAvaliacaoRepository)
    private readonly repository: IEmpresaAvaliacaoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EmpresaAvaliacaoUnlikeCommand,
  ): Promise<EmpresaAvaliacaoLikeResult> {
    const userId = accessContext?.requestActor?.id;
    if (!userId) {
      throw new UnauthorizedError("Usuário deve estar autenticado para descurtir uma avaliação.");
    }

    const avaliacao = await this.repository.loadById(accessContext, dto.avaliacaoId);
    if (!avaliacao || !avaliacao.isActive()) {
      throw new ResourceNotFoundError("Avaliação não encontrada.");
    }

    const activeLike = await this.repository.findActiveLike(dto.avaliacaoId, userId);
    if (!activeLike) {
      throw new ResourceNotFoundError("Curtida não encontrada.");
    }

    activeLike.softDelete();
    await this.repository.saveLike(activeLike);

    const newLikesCount = await this.repository.countActiveLikes(dto.avaliacaoId);
    avaliacao.updateLikesCount(newLikesCount);
    await this.repository.save(avaliacao);

    return {
      avaliacaoId: avaliacao.id,
      likesCount: avaliacao.likesCount,
      isLikedByCurrentUser: false,
      relevanceScore: avaliacao.relevanceScore,
    };
  }
}
