import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { CalendarioLetivoService } from "@/modules/horarios/calendario-letivo";
import {
  type IHorarioGeradoCreateCommand,
  IHorarioGeradoCreateCommandHandler,
} from "@/modules/horarios/horario-gerado/domain/commands/horario-gerado-create.command.handler.interface";
import { HorarioGerado } from "@/modules/horarios/horario-gerado/domain/horario-gerado.domain";
import type { HorarioGeradoFindOneOutputDto } from "../../dtos";
import { HORARIO_GERADO_REPOSITORY_PORT, type IHorarioGeradoRepositoryPort } from "../../ports";

@Injectable()
export class HorarioGeradoCreateCommandHandlerImpl implements IHorarioGeradoCreateCommandHandler {
  constructor(
    @Inject(HORARIO_GERADO_REPOSITORY_PORT)
    private readonly repository: IHorarioGeradoRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IHorarioGeradoCreateCommand): Promise<HorarioGeradoFindOneOutputDto> {
    await this.authorizationService.ensurePermission("horario_gerado:create", { dto });

    let calendarioRef: { id: string } | undefined;
    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      calendarioRef = { id: calendario.id };
    }
    const domain = HorarioGerado.criar({
      status: dto.status,
      tipo: dto.tipo,
      dataGeracao: dto.dataGeracao,
      vigenciaInicio: dto.vigenciaInicio,
      vigenciaFim: dto.vigenciaFim,
      calendario: calendarioRef!,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      ...(calendarioRef ? { calendario: calendarioRef } : {}),
    });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("HorarioGerado", id);
    }

    return result;
  }
}
