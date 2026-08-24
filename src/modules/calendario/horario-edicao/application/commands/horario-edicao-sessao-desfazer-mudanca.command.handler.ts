import { BadRequestException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { getNowISO } from "@/utils/date";
import type { HorarioEdicaoSessaoDesfazerMudancaCommand } from "../../domain/commands/horario-edicao-sessao-desfazer-mudanca.command";
import type { IHorarioEdicaoSessaoDesfazerMudancaCommandHandler } from "../../domain/commands/horario-edicao-sessao-desfazer-mudanca.command.handler.interface";
import {
  HorarioEdicaoSessaoStatus,
  type IHorarioEdicaoSessao,
} from "../../domain/horario-edicao.types";
import { IHorarioEdicaoMudancaRepository } from "../../domain/repositories/horario-edicao-mudanca.repository.interface";
import { IHorarioEdicaoSessaoRepository } from "../../domain/repositories/horario-edicao-sessao.repository.interface";

@Impl()
export class HorarioEdicaoSessaoDesfazerMudancaCommandHandlerImpl
  implements IHorarioEdicaoSessaoDesfazerMudancaCommandHandler
{
  constructor(
    @Dep(IHorarioEdicaoSessaoRepository)
    private readonly sessaoRepository: IHorarioEdicaoSessaoRepository,
    @Dep(IHorarioEdicaoMudancaRepository)
    private readonly mudancaRepository: IHorarioEdicaoMudancaRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    command: HorarioEdicaoSessaoDesfazerMudancaCommand,
  ): Promise<IHorarioEdicaoSessao> {
    const sessao = await this.sessaoRepository.findById(command.sessaoId);
    ensureExists(sessao, "HorarioEdicaoSessao", command.sessaoId);

    if (sessao.status !== HorarioEdicaoSessaoStatus.ABERTA) {
      throw new BadRequestException(
        `Sessao ${command.sessaoId} nao esta aberta. Status atual: ${sessao.status}.`,
      );
    }

    const mudanca = await this.mudancaRepository.findById(command.mudancaId);
    ensureExists(mudanca, "HorarioEdicaoMudanca", command.mudancaId);

    if (mudanca.sessao.id !== command.sessaoId) {
      throw new BadRequestException(
        `A mudanca ${command.mudancaId} nao pertence a sessao ${command.sessaoId}.`,
      );
    }

    await this.mudancaRepository.deleteById(mudanca.id);

    sessao.dateUpdated = getNowISO();

    return this.sessaoRepository.save(sessao);
  }
}
