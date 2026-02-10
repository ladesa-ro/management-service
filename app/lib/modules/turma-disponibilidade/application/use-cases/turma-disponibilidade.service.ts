import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { DisponibilidadeService } from "@/modules/disponibilidade/application/use-cases/disponibilidade.service";
import { TurmaService } from "@/modules/turma/application/use-cases/turma.service";
import type { ITurmaDisponibilidade } from "@/modules/turma-disponibilidade";
import type {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeListOutputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "../dtos";
import {
  type ITurmaDisponibilidadeRepositoryPort,
  TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
} from "../ports/out";

@Injectable()
export class TurmaDisponibilidadeService extends BaseCrudService<
  ITurmaDisponibilidade,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeListOutputDto,
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeUpdateInputDto
> {
  protected readonly resourceName = "TurmaDisponibilidade";
  protected readonly createAction = "turma_disponibilidade:create";
  protected readonly updateAction = "turma_disponibilidade:update";
  protected readonly deleteAction = "turma_disponibilidade:delete";

  constructor(
    @Inject(TURMA_DISPONIBILIDADE_REPOSITORY_PORT)
    protected readonly repository: ITurmaDisponibilidadeRepositoryPort,
    private readonly turmaService: TurmaService,
    private readonly disponibilidadeService: DisponibilidadeService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeCreateInputDto,
  ): Promise<Partial<PersistInput<ITurmaDisponibilidade>>> {
    const result: Record<string, any> = {};

    if (dto.turma) {
      const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);
      result.turma = { id: turma.id };
    }

    if (dto.disponibilidade) {
      const disponibilidade = await this.disponibilidadeService.findByIdSimpleStrict(
        accessContext,
        dto.disponibilidade.id,
      );
      result.disponibilidade = { id: disponibilidade.id };
    }

    return result as ITurmaDisponibilidade;
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeFindOneInputDto & TurmaDisponibilidadeUpdateInputDto,
    _current: TurmaDisponibilidadeFindOneOutputDto,
  ): Promise<Partial<PersistInput<ITurmaDisponibilidade>>> {
    const result: Partial<PersistInput<ITurmaDisponibilidade>> = {};

    if (has(dto, "turma") && dto.turma !== undefined) {
      if (dto.turma) {
        const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);
        result.turma = { id: turma.id };
      } else {
        result.turma = null;
      }
    }

    if (has(dto, "disponibilidade") && dto.disponibilidade !== undefined) {
      if (dto.disponibilidade) {
        const disponibilidade = await this.disponibilidadeService.findByIdSimpleStrict(
          accessContext,
          dto.disponibilidade.id,
        );
        result.disponibilidade = { id: disponibilidade.id };
      } else {
        result.disponibilidade = null;
      }
    }

    return result;
  }
}
