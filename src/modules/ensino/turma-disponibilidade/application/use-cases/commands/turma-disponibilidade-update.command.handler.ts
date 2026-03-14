import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { DisponibilidadeService } from "@/modules/ensino/disponibilidade/application/use-cases/disponibilidade.service";
import { TurmaService } from "@/modules/ensino/turma/application/use-cases/turma.service";
import {
  type ITurmaDisponibilidadeUpdateCommand,
  ITurmaDisponibilidadeUpdateCommandHandler,
} from "@/modules/ensino/turma-disponibilidade/domain/commands/turma-disponibilidade-update.command.handler.interface";
import type { ITurmaDisponibilidade } from "@/modules/ensino/turma-disponibilidade/domain/turma-disponibilidade.types";
import type { TurmaDisponibilidadeFindOneOutputDto } from "../../dtos";
import {
  type ITurmaDisponibilidadeRepositoryPort,
  TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
} from "../../ports";

@Injectable()
export class TurmaDisponibilidadeUpdateCommandHandlerImpl
  implements ITurmaDisponibilidadeUpdateCommandHandler
{
  constructor(
    @Inject(TURMA_DISPONIBILIDADE_REPOSITORY_PORT)
    private readonly repository: ITurmaDisponibilidadeRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly turmaService: TurmaService,
    private readonly disponibilidadeService: DisponibilidadeService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: ITurmaDisponibilidadeUpdateCommand): Promise<TurmaDisponibilidadeFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("TurmaDisponibilidade", dto.id);
    }

    await this.authorizationService.ensurePermission(
      "turma_disponibilidade:update",
      { dto },
      dto.id,
    );

    const updateData: Partial<PersistInput<ITurmaDisponibilidade>> = {};
    if (has(dto, "turma") && dto.turma !== undefined) {
      if (dto.turma) {
        const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);
        updateData.turma = { id: turma.id };
      } else {
        updateData.turma = null;
      }
    }
    if (has(dto, "disponibilidade") && dto.disponibilidade !== undefined) {
      if (dto.disponibilidade) {
        const disponibilidade = await this.disponibilidadeService.findByIdSimpleStrict(
          accessContext,
          dto.disponibilidade.id,
        );
        updateData.disponibilidade = { id: disponibilidade.id };
      } else {
        updateData.disponibilidade = null;
      }
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("TurmaDisponibilidade", dto.id);
    }

    return result;
  }
}
