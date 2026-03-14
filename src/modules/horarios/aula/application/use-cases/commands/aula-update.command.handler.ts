import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { AmbienteService } from "@/modules/ambientes/ambiente/application/use-cases/ambiente.service";
import { DiarioService } from "@/modules/ensino/diario/application/use-cases/diario.service";
import { Aula } from "@/modules/horarios/aula/domain/aula.domain";
import type { IAula } from "@/modules/horarios/aula/domain/aula.types";
import {
  type IAulaUpdateCommand,
  IAulaUpdateCommandHandler,
} from "@/modules/horarios/aula/domain/commands/aula-update.command.handler.interface";
import { IntervaloDeTempoService } from "@/modules/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type { AulaFindOneOutputDto } from "../../dtos";
import { AULA_REPOSITORY_PORT, type IAulaRepositoryPort } from "../../ports";

@Injectable()
export class AulaUpdateCommandHandlerImpl implements IAulaUpdateCommandHandler {
  constructor(
    @Inject(AULA_REPOSITORY_PORT)
    private readonly repository: IAulaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly diarioService: DiarioService,
    private readonly intervaloService: IntervaloDeTempoService,
    private readonly ambienteService: AmbienteService,
  ) {}

  async execute({ accessContext, dto }: IAulaUpdateCommand): Promise<AulaFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("Aula", dto.id);
    }

    await this.authorizationService.ensurePermission("aula:update", { dto }, dto.id);

    const domain = Aula.fromData(current);
    domain.atualizar({ data: dto.data, modalidade: dto.modalidade });
    const updateData: Partial<PersistInput<IAula>> = {
      data: domain.data,
      modalidade: domain.modalidade,
    };
    if (has(dto, "ambiente") && dto.ambiente !== undefined) {
      if (dto.ambiente !== null) {
        const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
          id: dto.ambiente.id,
        });
        updateData.ambiente = { id: ambiente.id };
      } else {
        updateData.ambiente = null;
      }
    }
    if (has(dto, "diario") && dto.diario !== undefined) {
      const diario = await this.diarioService.findByIdSimpleStrict(accessContext, dto.diario.id);
      updateData.diario = { id: diario.id };
    }
    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      updateData.intervaloDeTempo = { id: intervaloDeTempo!.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("Aula", dto.id);
    }

    return result;
  }
}
