import { BadRequestException } from "@nestjs/common";
import { ensureExists, ForbiddenError } from "@/application/errors";
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
    accessContext: IAccessContext | null,
    command: HorarioEdicaoSessaoPublicarCommand,
  ): Promise<IHorarioEdicaoSessao> {
    return this.idempotencyService.execute({
      idempotencyKey: command.idempotencyKey,
      comando: COMANDO,
      run: () => this.publicar(accessContext, command),
    });
  }

  private async publicar(
    accessContext: IAccessContext | null,
    command: HorarioEdicaoSessaoPublicarCommand,
  ): Promise<IHorarioEdicaoSessao> {
    const sessao = await this.sessaoRepository.findById(command.sessaoId);
    ensureExists(sessao, "HorarioEdicaoSessao", command.sessaoId);

    const isSuperUser = accessContext?.requestActor?.isSuperUser ?? false;
    const actorId = accessContext?.requestActor?.id;
    if (!isSuperUser && (!actorId || sessao.usuario?.id !== actorId)) {
      throw new ForbiddenError("Você não tem permissão para publicar esta sessão de edição.");
    }

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
