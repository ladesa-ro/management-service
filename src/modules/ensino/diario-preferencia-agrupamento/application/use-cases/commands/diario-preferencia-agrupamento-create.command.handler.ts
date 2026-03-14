import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import {
  type IDiarioPreferenciaAgrupamentoCreateCommand,
  IDiarioPreferenciaAgrupamentoCreateCommandHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-create.command.handler.interface";
import { DiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento.domain";
import {
  DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
  type IDiarioPreferenciaAgrupamentoRepositoryPort,
} from "../../../domain/repositories";
import type { DiarioPreferenciaAgrupamentoFindOneOutputDto } from "../../dtos";

@Injectable()
export class DiarioPreferenciaAgrupamentoCreateCommandHandlerImpl
  implements IDiarioPreferenciaAgrupamentoCreateCommandHandler
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
  }: IDiarioPreferenciaAgrupamentoCreateCommand): Promise<DiarioPreferenciaAgrupamentoFindOneOutputDto> {
    await this.authorizationService.ensurePermission("diario_preferencia_agrupamento:create", {
      dto,
    });

    let diarioRef: { id: string } | undefined;
    if (dto.diario) {
      const diario = await this.diarioFindOneHandler.execute({
        accessContext,
        dto: dto.diario,
      });
      if (!diario) {
        throw new ResourceNotFoundError("Diario", dto.diario.id);
      }
      diarioRef = { id: diario.id };
    }
    const domain = DiarioPreferenciaAgrupamento.criar({
      diaSemanaIso: dto.diaSemanaIso,
      aulasSeguidas: dto.aulasSeguidas,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      diario: diarioRef!,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      ...(diarioRef ? { diario: diarioRef } : {}),
    });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("DiarioPreferenciaAgrupamento", id);
    }

    return result;
  }
}
