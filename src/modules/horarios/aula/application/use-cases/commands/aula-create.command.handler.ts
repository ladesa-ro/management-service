import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { AmbienteService } from "@/modules/ambientes/ambiente/application/use-cases/ambiente.service";
import { DiarioService } from "@/modules/ensino/diario/application/use-cases/diario.service";
import { Aula } from "@/modules/horarios/aula/domain/aula.domain";
import {
  type IAulaCreateCommand,
  IAulaCreateCommandHandler,
} from "@/modules/horarios/aula/domain/commands/aula-create.command.handler.interface";
import { IntervaloDeTempoService } from "@/modules/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type { AulaFindOneOutputDto } from "../../dtos";
import { AULA_REPOSITORY_PORT, type IAulaRepositoryPort } from "../../ports";

@Injectable()
export class AulaCreateCommandHandlerImpl implements IAulaCreateCommandHandler {
  constructor(
    @Inject(AULA_REPOSITORY_PORT)
    private readonly repository: IAulaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly diarioService: DiarioService,
    private readonly intervaloService: IntervaloDeTempoService,
    private readonly ambienteService: AmbienteService,
  ) {}

  async execute({ accessContext, dto }: IAulaCreateCommand): Promise<AulaFindOneOutputDto> {
    await this.authorizationService.ensurePermission("aula:create", { dto });

    let ambienteRef: { id: string } | null = null;
    if (dto.ambiente && dto.ambiente !== null) {
      const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
        id: dto.ambiente.id,
      });
      ambienteRef = { id: ambiente.id };
    }
    const diario = await this.diarioService.findByIdSimpleStrict(accessContext, dto.diario.id);
    const intervalo = await this.intervaloService.intervaloCreateOrUpdate(
      accessContext,
      dto.intervaloDeTempo,
    );
    const domain = Aula.criar({
      data: dto.data,
      modalidade: dto.modalidade,
      intervaloDeTempo: { id: intervalo!.id },
      diario: { id: diario.id },
      ambiente: ambienteRef,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      diario: { id: diario.id },
      intervaloDeTempo: { id: intervalo!.id },
      ambiente: ambienteRef,
    });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("Aula", id);
    }

    return result;
  }
}
