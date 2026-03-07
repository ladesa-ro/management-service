import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { DisponibilidadeService } from "@/Ladesa.Management.Application/ensino/disponibilidade/application/use-cases/disponibilidade.service";
import { TurmaService } from "@/Ladesa.Management.Application/ensino/turma/application/use-cases/turma.service";
import type { TurmaDisponibilidade } from "@/Ladesa.Management.Application/ensino/turma-disponibilidade";
import type {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeListInputDto,
  TurmaDisponibilidadeListOutputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "../dtos";
import { ITurmaDisponibilidadeRepository } from "../ports/out";

@Injectable()
export class TurmaDisponibilidadeService extends BaseCrudService<
  TurmaDisponibilidade,
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
    @Inject(ITurmaDisponibilidadeRepository)
    protected readonly repository: ITurmaDisponibilidadeRepository,
    private readonly turmaService: TurmaService,
    private readonly disponibilidadeService: DisponibilidadeService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeCreateInputDto,
  ): Promise<Partial<PersistInput<TurmaDisponibilidade>>> {
    const result: Record<string, any> = {};

    if (dto.turma) {
      const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);
      result.turmaId = turma.id;
    }

    if (dto.disponibilidade) {
      const disponibilidade = await this.disponibilidadeService.findByIdSimpleStrict(
        accessContext,
        dto.disponibilidade.id,
      );
      result.disponibilidadeId = disponibilidade.id;
    }

    return result as TurmaDisponibilidade;
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeFindOneInputDto & TurmaDisponibilidadeUpdateInputDto,
    _current: TurmaDisponibilidadeFindOneOutputDto,
  ): Promise<Partial<PersistInput<TurmaDisponibilidade>>> {
    const result: Partial<PersistInput<TurmaDisponibilidade>> = {};

    if (has(dto, "turma") && dto.turma !== undefined) {
      if (dto.turma) {
        const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);
        result.turmaId = turma.id;
      } else {
        result.turmaId = undefined;
      }
    }

    if (has(dto, "disponibilidade") && dto.disponibilidade !== undefined) {
      if (dto.disponibilidade) {
        const disponibilidade = await this.disponibilidadeService.findByIdSimpleStrict(
          accessContext,
          dto.disponibilidade.id,
        );
        result.disponibilidadeId = disponibilidade.id;
      } else {
        result.disponibilidadeId = undefined;
      }
    }

    return result;
  }
}
