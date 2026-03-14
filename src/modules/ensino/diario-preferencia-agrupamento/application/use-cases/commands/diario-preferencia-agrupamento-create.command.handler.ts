import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { DiarioService } from "@/modules/ensino/diario/application/use-cases/diario.service";
import {
  type IDiarioPreferenciaAgrupamentoCreateCommand,
  IDiarioPreferenciaAgrupamentoCreateCommandHandler,
} from "@/modules/ensino/diario-preferencia-agrupamento/domain/commands/diario-preferencia-agrupamento-create.command.handler.interface";
import { DiarioPreferenciaAgrupamento } from "@/modules/ensino/diario-preferencia-agrupamento/domain/diario-preferencia-agrupamento.domain";
import { IntervaloDeTempoService } from "@/modules/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type { DiarioPreferenciaAgrupamentoFindOneOutputDto } from "../../dtos";
import {
  DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT,
  type IDiarioPreferenciaAgrupamentoRepositoryPort,
} from "../../ports";

@Injectable()
export class DiarioPreferenciaAgrupamentoCreateCommandHandlerImpl
  implements IDiarioPreferenciaAgrupamentoCreateCommandHandler
{
  constructor(
    @Inject(DIARIO_PREFERENCIA_AGRUPAMENTO_REPOSITORY_PORT)
    private readonly repository: IDiarioPreferenciaAgrupamentoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly diarioService: DiarioService,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
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
      const diario = await this.diarioService.findByIdStrict(accessContext, dto.diario);
      diarioRef = { id: diario.id };
    }
    let intervaloRef: { id: string } | undefined;
    if (dto.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      intervaloRef = { id: intervalo!.id };
    }
    const domain = DiarioPreferenciaAgrupamento.criar({
      diaSemanaIso: dto.diaSemanaIso,
      aulasSeguidas: dto.aulasSeguidas,
      dataInicio: dto.dataInicio,
      dataFim: dto.dataFim,
      diario: diarioRef!,
      intervaloDeTempo: intervaloRef!,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      ...(diarioRef ? { diario: diarioRef } : {}),
      ...(intervaloRef ? { intervaloDeTempo: intervaloRef } : {}),
    });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("DiarioPreferenciaAgrupamento", id);
    }

    return result;
  }
}
