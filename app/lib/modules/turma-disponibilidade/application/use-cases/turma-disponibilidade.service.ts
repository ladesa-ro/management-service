import { Inject, Injectable } from "@nestjs/common";
import { has, pick } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { ResourceNotFoundError } from "@/modules/@shared";
import { DisponibilidadeService } from "@/modules/disponibilidade/application/use-cases/disponibilidade.service";
import { TurmaService } from "@/modules/turma/application/use-cases/turma.service";
import type { TurmaDisponibilidadeEntity } from "@/modules/turma-disponibilidade/infrastructure/persistence/typeorm";
import type {
  TurmaDisponibilidadeCreateInput,
  TurmaDisponibilidadeFindOneInput,
  TurmaDisponibilidadeFindOneOutput,
  TurmaDisponibilidadeListInput,
  TurmaDisponibilidadeListOutput,
  TurmaDisponibilidadeUpdateInput,
} from "../dtos";
import {
  type ITurmaDisponibilidadeRepositoryPort,
  TURMA_DISPONIBILIDADE_REPOSITORY_PORT,
} from "../ports/out";

// ============================================================================

const aliasTurmaDisponibilidade = "turma_disponibilidade";

// ============================================================================

@Injectable()
export class TurmaDisponibilidadeService {
  constructor(
    @Inject(TURMA_DISPONIBILIDADE_REPOSITORY_PORT)
    private readonly turmaDisponibilidadeRepository: ITurmaDisponibilidadeRepositoryPort,
    private readonly turmaService: TurmaService,
    private readonly disponibilidadeService: DisponibilidadeService,
  ) {}

  // Generic method names
  async findAll(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeListInput | null = null,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeListOutput> {
    return this.turmaDisponibilidadeRepository.findAll(accessContext, dto, selection);
  }

  async findById(
    accessContext: AccessContext | null,
    dto: TurmaDisponibilidadeFindOneInput,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutput | null> {
    return this.turmaDisponibilidadeRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeFindOneInput,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutput> {
    const turmaDisponibilidade = await this.findById(accessContext, dto, selection);

    if (!turmaDisponibilidade) {
      throw new ResourceNotFoundError("TurmaDisponibilidade", dto.id);
    }

    return turmaDisponibilidade;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutput | null> {
    return this.turmaDisponibilidadeRepository.findByIdSimple(accessContext, id, selection);
  }

  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutput> {
    const turmaDisponibilidade = await this.findByIdSimple(accessContext, id, selection);

    if (!turmaDisponibilidade) {
      throw new ResourceNotFoundError("TurmaDisponibilidade", id);
    }

    return turmaDisponibilidade;
  }

  // Legacy method aliases for compatibility
  async turmaDisponibilidadeFindAll(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeListInput | null = null,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeListOutput> {
    return this.findAll(accessContext, dto, selection);
  }

  async turmaDisponibilidadeFindById(
    accessContext: AccessContext | null,
    dto: TurmaDisponibilidadeFindOneInput,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutput | null> {
    return this.findById(accessContext, dto, selection);
  }

  async turmaDisponibilidadeFindByIdStrict(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeFindOneInput,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutput> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async turmaDisponibilidadeFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutput | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async turmaDisponibilidadeFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<TurmaDisponibilidadeFindOneOutput> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async turmaDisponibilidadeCreate(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeCreateInput,
  ): Promise<TurmaDisponibilidadeFindOneOutput> {
    await accessContext.ensurePermission("turma_disponibilidade:create", {
      dto,
    } as any);

    const dtoTurmaDisponibilidade = pick(dto, []);

    const turmaDisponibilidade = this.turmaDisponibilidadeRepository.create();

    this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
      ...dtoTurmaDisponibilidade,
    });

    if (dto.turma) {
      const turma = await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id);

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        turma: {
          id: turma.id,
        },
      });
    }

    if (dto.disponibilidade) {
      const disponibilidade = await this.disponibilidadeService.findByIdSimpleStrict(
        accessContext,
        dto.disponibilidade.id,
      );

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        disponibilidade: {
          id: disponibilidade.id,
        },
      });
    }

    const savedTurmaDisponibilidade =
      await this.turmaDisponibilidadeRepository.save(turmaDisponibilidade);

    return this.findByIdStrict(accessContext, {
      id: savedTurmaDisponibilidade.id,
    });
  }

  async turmaDisponibilidadeUpdate(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeFindOneInput & TurmaDisponibilidadeUpdateInput,
  ): Promise<TurmaDisponibilidadeFindOneOutput> {
    const currentTurmaDisponibilidade = await this.findByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission(
      "turma_disponibilidade:update",
      { dto },
      dto.id,
      this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade),
    );

    const dtoTurmaDisponibilidade = pick(dto, []);

    const turmaDisponibilidade = <TurmaDisponibilidadeEntity>{
      id: currentTurmaDisponibilidade.id,
    };

    this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
      ...dtoTurmaDisponibilidade,
    });

    if (has(dto, "turma") && dto.turma !== undefined) {
      const turma =
        dto.turma && (await this.turmaService.findByIdSimpleStrict(accessContext, dto.turma.id));

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        turma: turma && {
          id: turma.id,
        },
      });
    }

    if (has(dto, "disponibilidade") && dto.disponibilidade !== undefined) {
      const disponibilidade =
        dto.disponibilidade &&
        (await this.disponibilidadeService.findByIdSimpleStrict(
          accessContext,
          dto.disponibilidade.id,
        ));

      this.turmaDisponibilidadeRepository.merge(turmaDisponibilidade, {
        disponibilidade: disponibilidade && {
          id: disponibilidade.id,
        },
      });
    }

    await this.turmaDisponibilidadeRepository.save(turmaDisponibilidade);

    return this.findByIdStrict(accessContext, {
      id: turmaDisponibilidade.id,
    });
  }

  async turmaDisponibilidadeDeleteOneById(
    accessContext: AccessContext,
    dto: TurmaDisponibilidadeFindOneInput,
  ): Promise<boolean> {
    await accessContext.ensurePermission(
      "turma_disponibilidade:delete",
      { dto },
      dto.id,
      this.turmaDisponibilidadeRepository.createQueryBuilder(aliasTurmaDisponibilidade),
    );

    const turmaDisponibilidade = await this.findByIdStrict(accessContext, dto);

    if (turmaDisponibilidade) {
      await this.turmaDisponibilidadeRepository.softDeleteById(turmaDisponibilidade.id);
    }

    return true;
  }
}
