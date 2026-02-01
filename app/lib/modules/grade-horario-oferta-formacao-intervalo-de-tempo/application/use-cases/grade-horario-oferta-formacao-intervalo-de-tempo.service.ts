import { Inject, Injectable } from "@nestjs/common";
import { has, pick } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { ResourceNotFoundError } from "@/modules/@shared";
import { GradeHorarioOfertaFormacaoService } from "@/modules/grade-horario-oferta-formacao";
import type { GradeHorarioOfertaFormacaoIntervaloDeTempoEntity } from "@/modules/grade-horario-oferta-formacao-intervalo-de-tempo/infrastructure/persistence/typeorm";
import { IntervaloDeTempoService } from "@/modules/intervalo-de-tempo";
import type {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput,
} from "../dtos";
import {
  GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT,
  type IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
} from "../ports/out";

// ============================================================================

const aliasGradeHorarioOfertaFormacaoIntervaloDeTempo = "gh_of_it";

// ============================================================================

@Injectable()
export class GradeHorarioOfertaFormacaoIntervaloDeTempoService {
  constructor(
    @Inject(GRADE_HORARIO_OFERTA_FORMACAO_INTERVALO_DE_TEMPO_REPOSITORY_PORT)
    private readonly gradeHorarioOfertaFormacaoIntervaloDeTempoRepository: IGradeHorarioOfertaFormacaoIntervaloDeTempoRepositoryPort,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
    private readonly gradeHorarioOfertaFormacaoService: GradeHorarioOfertaFormacaoService,
  ) {}

  // Generic method names
  async findAll(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInput | null = null,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.findAll(
      accessContext,
      dto,
      selection,
    );
  }

  async findById(
    accessContext: AccessContext | null,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | null> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.findById(
      accessContext,
      dto,
      selection,
    );
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput> {
    const gradeHorarioOfertaFormacaoIntervaloDeTempo = await this.findById(
      accessContext,
      dto,
      selection,
    );

    if (!gradeHorarioOfertaFormacaoIntervaloDeTempo) {
      throw new ResourceNotFoundError("GradeHorarioOfertaFormacaoIntervaloDeTempo", dto.id);
    }

    return gradeHorarioOfertaFormacaoIntervaloDeTempo;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | null> {
    return this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.findByIdSimple(
      accessContext,
      id,
      selection,
    );
  }

  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput> {
    const gradeHorarioOfertaFormacaoIntervaloDeTempo = await this.findByIdSimple(
      accessContext,
      id,
      selection,
    );

    if (!gradeHorarioOfertaFormacaoIntervaloDeTempo) {
      throw new ResourceNotFoundError("GradeHorarioOfertaFormacaoIntervaloDeTempo", id);
    }

    return gradeHorarioOfertaFormacaoIntervaloDeTempo;
  }

  // Legacy method aliases for compatibility
  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindAll(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInput | null = null,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput> {
    return this.findAll(accessContext, dto, selection);
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindById(
    accessContext: AccessContext | null,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | null> {
    return this.findById(accessContext, dto, selection);
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdStrict(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoCreate(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput> {
    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao_intervalo_de_tempo:create",
      { dto } as any,
    );

    const dtoGradeHorarioOfertaFormacaoIntervaloDeTempo = pick(dto, []);

    const gradeHorarioOfertaFormacaoIntervaloDeTempo =
      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.create();

    this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(
      gradeHorarioOfertaFormacaoIntervaloDeTempo,
      {
        ...dtoGradeHorarioOfertaFormacaoIntervaloDeTempo,
      },
    );

    if (dto.gradeHorarioOfertaFormacao) {
      const gradeHorarioOfertaFormacao =
        await this.gradeHorarioOfertaFormacaoService.findByIdStrict(accessContext, {
          id: dto.gradeHorarioOfertaFormacao.id,
        });

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(
        gradeHorarioOfertaFormacaoIntervaloDeTempo,
        {
          gradeHorarioOfertaFormacao: {
            id: gradeHorarioOfertaFormacao.id,
          },
        },
      );
    }

    if (dto.intervaloDeTempo) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(
        gradeHorarioOfertaFormacaoIntervaloDeTempo,
        {
          intervaloDeTempo: {
            id: intervaloDeTempo.id,
          },
        },
      );
    }

    const savedEntity = await this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.save(
      gradeHorarioOfertaFormacaoIntervaloDeTempo,
    );

    return this.findByIdStrict(accessContext, {
      id: savedEntity.id,
    });
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoUpdate(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput &
      GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput,
  ): Promise<GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput> {
    const currentGradeHorarioOfertaFormacaoIntervaloDeTempo = await this.findByIdStrict(
      accessContext,
      dto,
    );

    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao_intervalo_de_tempo:update",
      { dto },
      dto.id,
      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(
        aliasGradeHorarioOfertaFormacaoIntervaloDeTempo,
      ),
    );

    const dtoGradeHorarioOfertaFormacaoIntervaloDeTempo = pick(dto, ["nome", "slug"]);

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = <
      GradeHorarioOfertaFormacaoIntervaloDeTempoEntity
    >{
      id: currentGradeHorarioOfertaFormacaoIntervaloDeTempo.id,
    };

    this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(
      gradeHorarioOfertaFormacaoIntervaloDeTempo,
      {
        ...dtoGradeHorarioOfertaFormacaoIntervaloDeTempo,
      },
    );

    if (has(dto, "gradeHorarioOfertaFormacao") && dto.gradeHorarioOfertaFormacao !== undefined) {
      const gradeHorarioOfertaFormacao =
        dto.gradeHorarioOfertaFormacao &&
        (await this.gradeHorarioOfertaFormacaoService.findByIdStrict(accessContext, {
          id: dto.gradeHorarioOfertaFormacao.id,
        }));

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(
        gradeHorarioOfertaFormacaoIntervaloDeTempo,
        {
          gradeHorarioOfertaFormacao: gradeHorarioOfertaFormacao && {
            id: gradeHorarioOfertaFormacao.id,
          },
        },
      );
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo =
        dto.intervaloDeTempo &&
        (await this.intervaloDeTempoService.intervaloCreateOrUpdate(
          accessContext,
          dto.intervaloDeTempo,
        ));

      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.merge(
        gradeHorarioOfertaFormacaoIntervaloDeTempo,
        {
          intervaloDeTempo: intervaloDeTempo && {
            id: intervaloDeTempo.id,
          },
        },
      );
    }

    await this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.save(
      gradeHorarioOfertaFormacaoIntervaloDeTempo,
    );

    return this.findByIdStrict(accessContext, {
      id: gradeHorarioOfertaFormacaoIntervaloDeTempo.id,
    });
  }

  async gradeHorarioOfertaFormacaoIntervaloDeTempoDeleteOneById(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
  ): Promise<boolean> {
    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao_intervalo_de_tempo:delete",
      { dto },
      dto.id,
      this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.createQueryBuilder(
        aliasGradeHorarioOfertaFormacaoIntervaloDeTempo,
      ),
    );

    const gradeHorarioOfertaFormacaoIntervaloDeTempo = await this.findByIdStrict(
      accessContext,
      dto,
    );

    if (gradeHorarioOfertaFormacaoIntervaloDeTempo) {
      await this.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository.softDeleteById(
        gradeHorarioOfertaFormacaoIntervaloDeTempo.id,
      );
    }

    return true;
  }
}
