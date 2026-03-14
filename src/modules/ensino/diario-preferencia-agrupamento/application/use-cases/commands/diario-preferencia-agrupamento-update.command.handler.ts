import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import {
  type IDiarioPreferenciaAgrupamentoUpdateCommand,
  IDiarioPreferenciaAgrupamentoUpdateCommandHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-update.command.handler.interface";
import { DiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento.domain";
import type { IDiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento.types";
import {
  DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
  type IDiarioPreferenciaAgrupamentoRepositoryPort,
} from "../../../domain/repositories";
import type { DiarioPreferenciaAgrupamentoFindOneOutputDto } from "../../dtos";

@Injectable()
export class DiarioPreferenciaAgrupamentoUpdateCommandHandlerImpl
  implements IDiarioPreferenciaAgrupamentoUpdateCommandHandler
{
  constructor(
    @Inject(DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(IDiarioFindOneQueryHandler)
    private readonly diarioFindOneHandler: IDiarioFindOneQueryHandler,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDiarioPreferenciaAgrupamentoUpdateCommand): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("DiarioPreferenciaAgrupamento", dto.id);
    }

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
      if (!diario) {
        throw new ResourceNotFoundError("Diario", dto.diario.id);
      }
      updateData.diario = { id: diario.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("DiarioPreferenciaAgrupamento", dto.id);
    }

    return result;
  }
}
