import { BadRequestException } from "@nestjs/common";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagioSolicitacaoPermissionChecker } from "../../domain/authorization/estagio-solicitacao-permission-checker.interface";
import {
  type EstagioSolicitacaoExternoCreateCommand,
  IEstagioSolicitacaoExternoCreateCommandHandler,
} from "../../domain/commands/solicitacao-externo-create.command";
import { EstagioSolicitacao } from "../../domain/estagio-solicitacao";
import { IEstagioSolicitacaoRepository } from "../../domain/repositories/estagio-solicitacao.repository.interface";

@Impl()
export class EstagioSolicitacaoExternoCreateCommandHandlerImpl
  implements IEstagioSolicitacaoExternoCreateCommandHandler
{
  constructor(
    @Dep(IEstagioSolicitacaoRepository)
    private readonly solicitacaoRepository: IEstagioSolicitacaoRepository,
    @Dep(IEstagioSolicitacaoPermissionChecker)
    private readonly permissionChecker: IEstagioSolicitacaoPermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagioSolicitacaoExternoCreateCommand,
  ): Promise<EstagioSolicitacao> {
    const { estagiarioId, campusId } =
      await this.permissionChecker.ensureCanCreateSolicitacao(accessContext);

    const activeCount = await this.solicitacaoRepository.countActiveByEstagiarioId(estagiarioId);
    if (activeCount >= 3) {
      throw new BadRequestException(
        "Você já possui o limite máximo de 3 solicitações de estágio em análise simultaneamente.",
      );
    }

    const solicitacao = EstagioSolicitacao.createExterno({
      estagiarioId,
      campusId,
      empresa: {
        razaoSocial: dto.empresa.razaoSocial,
        nomeFantasia: dto.empresa.nomeFantasia,
        cnpj: dto.empresa.cnpj,
        email: dto.empresa.email,
        telefone: dto.empresa.telefone,
      },
      supervisor: {
        nome: dto.supervisor.nome,
        email: dto.supervisor.email,
        telefone: dto.supervisor.telefone,
      },
    });

    return await this.solicitacaoRepository.save(solicitacao);
  }
}
