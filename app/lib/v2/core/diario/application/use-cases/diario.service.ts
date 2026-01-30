import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { CalendarioLetivoService } from "@/core/calendario-letivo";
import { DisciplinaService } from "@/core/disciplina/application/use-cases/disciplina.service";
import type { DiarioEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { AmbienteService } from "@/core/ambiente/application/use-cases/ambiente.service";
import { BaseCrudService } from "@/v2/core/shared";
import { TurmaService } from "@/core/turma/application/use-cases/turma.service";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiarioCreateInputDto,
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
  DiarioUpdateInputDto,
} from "@/v2/server/modules/diario/http/dto";
import type { IDiarioRepositoryPort } from "../ports";

@Injectable()
export class DiarioService extends BaseCrudService<
  DiarioEntity,
  DiarioListInputDto,
  DiarioListOutputDto,
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioCreateInputDto,
  DiarioUpdateInputDto
> {
  protected readonly resourceName = "Diario";
  protected readonly createAction = "diario:create";
  protected readonly updateAction = "diario:update";
  protected readonly deleteAction = "diario:delete";
  protected readonly createFields = ["ativo"] as const;
  protected readonly updateFields = ["ativo"] as const;

  constructor(
    @Inject("IDiarioRepositoryPort")
    protected readonly repository: IDiarioRepositoryPort,
    private readonly calendarioLetivoService: CalendarioLetivoService,
    private readonly turmaService: TurmaService,
    private readonly disciplinaService: DisciplinaService,
    private readonly ambienteService: AmbienteService,
  ) {
    super();
  }

  async diarioFindAll(
    accessContext: AccessContext,
    dto: DiarioListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async diarioFindById(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  // Métodos prefixados para compatibilidade

  async diarioFindByIdStrict(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async diarioFindByIdSimple(
    accessContext: AccessContext,
    id: DiarioFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async diarioFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: DiarioFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async diarioCreate(
    accessContext: AccessContext,
    dto: DiarioCreateInputDto,
  ): Promise<DiarioFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async diarioUpdate(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto & DiarioUpdateInputDto,
  ): Promise<DiarioFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async diarioDeleteOneById(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: DiarioEntity,
    dto: DiarioCreateInputDto,
  ): Promise<void> {
    if (dto.ambientePadrao != null) {
      const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
        id: dto.ambientePadrao.id,
      });
      this.repository.merge(entity, { ambientePadrao: { id: ambientePadrao.id } });
    } else {
      this.repository.merge(entity, { ambientePadrao: null });
    }

    const calendarioLetivo =
      await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
        accessContext,
        dto.calendarioLetivo.id,
      );
    this.repository.merge(entity, { calendarioLetivo: { id: calendarioLetivo.id } });

    const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(
      accessContext,
      dto.disciplina.id,
    );
    this.repository.merge(entity, { disciplina: { id: disciplina.id } });

    const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.turma.id);
    this.repository.merge(entity, { turma: { id: turma.id } });
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: DiarioEntity,
    dto: DiarioFindOneInputDto & DiarioUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "ambientePadrao") && dto.ambientePadrao !== undefined) {
      if (dto.ambientePadrao !== null) {
        const ambientePadrao = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
          id: dto.ambientePadrao.id,
        });
        this.repository.merge(entity, { ambientePadrao: { id: ambientePadrao.id } });
      } else {
        this.repository.merge(entity, { ambientePadrao: null });
      }
    }

    if (has(dto, "disciplina") && dto.disciplina !== undefined) {
      const disciplina = await this.disciplinaService.disciplinaFindByIdSimpleStrict(
        accessContext,
        dto.disciplina.id,
      );
      this.repository.merge(entity, { disciplina: { id: disciplina.id } });
    }

    if (has(dto, "turma") && dto.turma !== undefined) {
      const turma = await this.turmaService.turmaFindByIdSimpleStrict(accessContext, dto.turma.id);
      this.repository.merge(entity, { turma: { id: turma.id } });
    }

    if (has(dto, "calendarioLetivo") && dto.calendarioLetivo !== undefined) {
      const calendarioLetivo =
        await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(
          accessContext,
          dto.calendarioLetivo.id,
        );
      this.repository.merge(entity, { calendarioLetivo: { id: calendarioLetivo.id } });
    }
  }
}
