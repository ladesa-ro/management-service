import { ConflictError, ResourceNotFoundError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagioSolicitacaoPermissionChecker } from "../../domain/authorization/estagio-solicitacao-permission-checker.interface";
import {
  type EstagioSolicitacaoIndeferirCommand,
  IEstagioSolicitacaoIndeferirCommandHandler,
} from "../../domain/commands/solicitacao-indeferir.command";
import type { EstagioSolicitacao } from "../../domain/estagio-solicitacao";
import { IEstagioSolicitacaoRepository } from "../../domain/repositories/estagio-solicitacao.repository.interface";

@Impl()
export class EstagioSolicitacaoIndeferirCommandHandlerImpl
  implements IEstagioSolicitacaoIndeferirCommandHandler
{
  constructor(
    @Dep(IEstagioSolicitacaoRepository)
    private readonly solicitacaoRepository: IEstagioSolicitacaoRepository,
    @Dep(IEstagioSolicitacaoPermissionChecker)
    private readonly permissionChecker: IEstagioSolicitacaoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagioSolicitacaoIndeferirCommand,
  ): Promise<EstagioSolicitacao> {
    const { userId } = await this.permissionChecker.ensureCanManageSolicitacoes(accessContext);

    const solicitacao = await this.solicitacaoRepository.findById(dto.id);
    if (!solicitacao) {
      throw new ResourceNotFoundError("Solicitação de estágio", dto.id);
    }

    if (solicitacao.situacao !== "PENDENTE" && solicitacao.situacao !== "EM_ANALISE") {
      throw new ConflictError(
        `A solicitação não pode ser indeferida porque seu estado atual é ${solicitacao.situacao}.`,
      );
    }

    solicitacao.indeferir(userId, dto.parecer);
    return await this.solicitacaoRepository.save(solicitacao);
  }
}
