import { BadRequestException } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IIdempotencyService, type IIdempotencyServiceType } from "@/shared/idempotency";
import { getNowISO } from "@/utils/date";
import type { HorarioEdicaoSessaoPublicarCommand } from "../../domain/commands/horario-edicao-sessao-publicar.command";
import type { IHorarioEdicaoSessaoPublicarCommandHandler } from "../../domain/commands/horario-edicao-sessao-publicar.command.handler.interface";
import {
  HorarioEdicaoSessaoStatus,
  type IHorarioEdicaoSessao,
} from "../../domain/horario-edicao.types";
import { IHorarioEdicaoApplicator } from "../../domain/repositories/horario-edicao-applicator.interface";
import { IHorarioEdicaoMudancaRepository } from "../../domain/repositories/horario-edicao-mudanca.repository.interface";
import { IHorarioEdicaoSessaoRepository } from "../../domain/repositories/horario-edicao-sessao.repository.interface";

const COMANDO = "horario-edicao-sessao-publicar";

@Impl()
export class HorarioEdicaoSessaoPublicarCommandHandlerImpl
  implements IHorarioEdicaoSessaoPublicarCommandHandler
{
  constructor(
    @Dep(IHorarioEdicaoSessaoRepository)
    private readonly sessaoRepository: IHorarioEdicaoSessaoRepository,
    @Dep(IHorarioEdicaoMudancaRepository)
    private readonly mudancaRepository: IHorarioEdicaoMudancaRepository,
    @Dep(IHorarioEdicaoApplicator)
    private readonly horarioEdicaoApplicator: IHorarioEdicaoApplicator,
    @Dep(IIdempotencyService)
    private readonly idempotencyService: IIdempotencyServiceType,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    command: HorarioEdicaoSessaoPublicarCommand,
  ): Promise<IHorarioEdicaoSessao> {
    return this.idempotencyService.execute({
      idempotencyKey: command.idempotencyKey,
      comando: COMANDO,
      run: () => this.publicar(command),
    });
  }

  private async publicar(
    command: HorarioEdicaoSessaoPublicarCommand,
  ): Promise<IHorarioEdicaoSessao> {
    const sessao = await this.sessaoRepository.findById(command.sessaoId);
    ensureExists(sessao, "HorarioEdicaoSessao", command.sessaoId);

    if (sessao.status !== HorarioEdicaoSessaoStatus.ABERTA) {
      throw new BadRequestException(
        `Sessao ${command.sessaoId} nao esta aberta. Status atual: ${sessao.status}.`,
      );
    }

    const mudancas = await this.mudancaRepository.findBySessaoId(command.sessaoId);
    await this.horarioEdicaoApplicator.applyMudancas(mudancas);

    sessao.status = HorarioEdicaoSessaoStatus.SALVA;
    sessao.dateUpdated = getNowISO();

    return this.sessaoRepository.save(sessao);
  }
}
