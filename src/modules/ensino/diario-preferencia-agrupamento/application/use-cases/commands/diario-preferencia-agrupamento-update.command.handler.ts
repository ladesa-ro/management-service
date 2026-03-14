import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { ensureExists, IAuthorizationService, type PersistInput } from "@/modules/@shared";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import {
  type IDiarioPreferenciaAgrupamentoUpdateCommand,
  IDiarioPreferenciaAgrupamentoUpdateCommandHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-update.command.handler.interface";
import { DiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento.domain";
import type { IDiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento.types";
import { IDiarioPreferenciaAgrupamentoRepository } from "../../../domain/repositories";
import type { DiarioPreferenciaAgrupamentoFindOneOutputDto } from "../../dtos";

@Injectable()
export class DiarioPreferenciaAgrupamentoUpdateCommandHandlerImpl
  implements IDiarioPreferenciaAgrupamentoUpdateCommandHandler
{
  constructor(
    @Inject(IDiarioPreferenciaAgrupamentoRepository)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
    @Inject(IDiarioFindOneQueryHandler)
    private readonly diarioFindOneHandler: IDiarioFindOneQueryHandler,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDiarioPreferenciaAgrupamentoUpdateCommand): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, "DiarioPreferenciaAgrupamento", dto.id);

    await this.authorizationService.ensurePermission(
      "diario_preferencia_agrupamento:update",
      { dto },
      dto.id,
    );

    const domain = DiarioPreferenciaAgrupamento.fromData(current);
    domain.atualizar({
      diaSemanaIso: dto.diaSemanaIso,
      aulasSeguidas: dto.aulasSeguidas,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
    });
    const updateData: Partial<PersistInput<IDiarioPreferenciaAgrupamento>> = {
      diaSemanaIso: domain.diaSemanaIso,
      aulasSeguidas: domain.aulasSeguidas,
      dataInicio: domain.dataInicio,
      dataFim: domain.dataFim,
    };
    if (has(dto, "diario") && dto.diario !== undefined) {
      const diario = await this.diarioFindOneHandler.execute({
        accessContext,
        dto: dto.diario,
      });
      ensureExists(diario, "Diario", dto.diario.id);
      updateData.diario = { id: diario.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, "DiarioPreferenciaAgrupamento", dto.id);

    return result;
  }
}
