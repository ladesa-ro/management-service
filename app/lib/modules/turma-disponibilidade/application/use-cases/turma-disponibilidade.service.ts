import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { DisponibilidadeService } from "@/modules/disponibilidade/application/use-cases/disponibilidade.service";
import { TurmaService } from "@/modules/turma/application/use-cases/turma.service";
import type { TurmaDisponibilidadeEntity } from "@/modules/turma-disponibilidade/infrastructure/persistence/typeorm";
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
  TurmaDisponibilidadeEntity,
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
  protected readonly createFields = [] as const;
  protected readonly updateFields = [] as const;

  constructor(
    @Inject(TURMA_DISPONIBILIDADE_REPOSITORY_PORT)
    protected readonly repository: ITurmaDisponibilidadeRepositoryPort,
    private readonly turmaService: TurmaService,
    private readonly disponibilidadeService: DisponibilidadeService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: TurmaDisponibilidadeEntity,
    dto: TurmaDisponibilidadeCreateInputDto,
  ): Promise<void> {
    if (dto.turma) {
      const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);
      this.repository.merge(entity, { turma: { id: turma.id } });
    }

    if (dto.disponibilidade) {
      const disponibilidade = await this.disponibilidadeService.findByIdSimpleStrict(
        accessContext,
        dto.disponibilidade.id,
      );
      this.repository.merge(entity, { disponibilidade: { id: disponibilidade.id } });
    }
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: TurmaDisponibilidadeEntity,
    dto: TurmaDisponibilidadeFindOneInputDto & TurmaDisponibilidadeUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "turma") && dto.turma !== undefined) {
      if (dto.turma) {
        const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);
        this.repository.merge(entity, { turma: { id: turma.id } });
      } else {
        this.repository.merge(entity, { turma: null as any });
      }
    }

    if (has(dto, "disponibilidade") && dto.disponibilidade !== undefined) {
      if (dto.disponibilidade) {
        const disponibilidade = await this.disponibilidadeService.findByIdSimpleStrict(
          accessContext,
          dto.disponibilidade.id,
        );
        this.repository.merge(entity, { disponibilidade: { id: disponibilidade.id } });
      } else {
        this.repository.merge(entity, { disponibilidade: null as any });
      }
    }
  }
}
