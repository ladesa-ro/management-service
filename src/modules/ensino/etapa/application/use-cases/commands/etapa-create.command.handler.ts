import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import {
  type IEtapaCreateCommand,
  IEtapaCreateCommandHandler,
} from "@/modules/ensino/etapa/domain/commands/etapa-create.command.handler.interface";
import { Etapa } from "@/modules/ensino/etapa/domain/etapa.domain";
import { CalendarioLetivoService } from "@/modules/horarios/calendario-letivo";
import type { EtapaFindOneOutputDto } from "../../dtos";
import { ETAPA_REPOSITORY_PORT, type IEtapaRepositoryPort } from "../../ports";

@Injectable()
export class EtapaCreateCommandHandlerImpl implements IEtapaCreateCommandHandler {
  constructor(
    @Inject(ETAPA_REPOSITORY_PORT)
    private readonly repository: IEtapaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
  ) {}

  async execute({ accessContext, dto }: IEtapaCreateCommand): Promise<EtapaFindOneOutputDto> {
    await this.authorizationService.ensurePermission("etapa:create", { dto });

    let calendarioRef: { id: string } | undefined;
    if (dto.calendario) {
      const calendario = await this.calendarioLetivoService.findByIdSimpleStrict(
        accessContext,
        dto.calendario.id,
      );
      calendarioRef = { id: calendario.id };
    }
    const domain = Etapa.criar({
      numero: dto.numero,
      cor: dto.cor,
      dataInicio: dto.dataInicio,
      dataTermino: dto.dataTermino,
      calendario: calendarioRef!,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      ...(calendarioRef ? { calendario: calendarioRef } : {}),
    });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("Etapa", id);
    }

    return result;
  }
}
