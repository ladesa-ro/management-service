import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { CalendarioLetivoService } from "@/modules/horarios/calendario-letivo";
import {
  type IDiaCalendarioCreateCommand,
  IDiaCalendarioCreateCommandHandler,
} from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-create.command.handler.interface";
import { DiaCalendario } from "@/modules/horarios/dia-calendario/domain/dia-calendario.domain";
import type { DiaCalendarioFindOneOutputDto } from "../../dtos";
import { DIA_CALENDARIO_REPOSITORY_PORT, type IDiaCalendarioRepositoryPort } from "../../ports";

@Injectable()
export class DiaCalendarioCreateCommandHandlerImpl implements IDiaCalendarioCreateCommandHandler {
  constructor(
    @Inject(DIA_CALENDARIO_REPOSITORY_PORT)
    private readonly repository: IDiaCalendarioRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDiaCalendarioCreateCommand): Promise<DiaCalendarioFindOneOutputDto> {
    await this.authorizationService.ensurePermission("dia_calendario:create", { dto });

    let calendarioRef: { id: string } | undefined;
    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      calendarioRef = { id: calendario.id };
    }
    const domain = DiaCalendario.criar({
      data: dto.data,
      diaLetivo: dto.diaLetivo,
      feriado: dto.feriado,
      tipo: dto.tipo,
      diaPresencial: dto.diaPresencial,
      extraCurricular: dto.extraCurricular,
      calendario: calendarioRef!,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      ...(calendarioRef ? { calendario: calendarioRef } : {}),
    });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("DiaCalendario", id);
    }

    return result;
  }
}
