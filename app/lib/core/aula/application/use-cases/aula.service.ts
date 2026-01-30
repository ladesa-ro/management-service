import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import { AmbienteService } from "@/core/ambiente/application/use-cases/ambiente.service";
import { DiarioService } from "@/core/diario/application/use-cases/diario.service";
import { IntervaloDeTempoService } from "@/core/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type { AulaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  AulaCreateInput,
  AulaFindOneInput,
  AulaFindOneOutput,
  AulaListInput,
  AulaListOutput,
  AulaUpdateInput,
} from "../dtos";
import { AULA_REPOSITORY_PORT, type IAulaRepositoryPort } from "../ports";
import type { IAulaUseCasePort } from "../ports/in/aula.use-case.port";

@Injectable()
export class AulaService implements IAulaUseCasePort {
  constructor(
    @Inject(AULA_REPOSITORY_PORT)
    private aulaRepository: IAulaRepositoryPort,
    private diarioService: DiarioService,
    private intervaloService: IntervaloDeTempoService,
    private ambienteService: AmbienteService,
  ) {}

  async aulaFindAll(
    accessContext: AccessContext,
    dto: AulaListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<AulaListOutput> {
    return this.aulaRepository.findAll(accessContext, dto, selection);
  }

  async aulaFindById(
    accessContext: AccessContext,
    dto: AulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput | null> {
    return this.aulaRepository.findById(accessContext, dto, selection);
  }

  async aulaFindByIdStrict(
    accessContext: AccessContext,
    dto: AulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput> {
    const aula = await this.aulaRepository.findById(accessContext, dto, selection);

    if (!aula) {
      throw new NotFoundException();
    }

    return aula;
  }

  async aulaFindByIdSimple(
    accessContext: AccessContext,
    id: AulaFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput | null> {
    return this.aulaRepository.findByIdSimple(accessContext, id, selection);
  }

  async aulaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: AulaFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput> {
    const aula = await this.aulaRepository.findByIdSimple(accessContext, id, selection);

    if (!aula) {
      throw new NotFoundException();
    }

    return aula;
  }

  async aulaCreate(accessContext: AccessContext, dto: AulaCreateInput): Promise<AulaFindOneOutput> {
    await accessContext.ensurePermission("aula:create", { dto } as any);

    const dtoAula = pick(dto, ["formato", "data"]);

    const aula = this.aulaRepository.create();

    this.aulaRepository.merge(aula, {
      ...dtoAula,
    });

    if (dto.ambiente && dto.ambiente !== null) {
      const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
        id: dto.ambiente.id,
      });
      this.aulaRepository.merge(aula, { ambiente: { id: ambiente.id } });
    } else {
      this.aulaRepository.merge(aula, { ambiente: null });
    }

    const diario = await this.diarioService.diarioFindByIdSimpleStrict(
      accessContext,
      dto.diario.id,
    );
    this.aulaRepository.merge(aula, { diario: { id: diario.id } });

    const intervalo = await this.intervaloService.intervaloCreateOrUpdate(
      accessContext,
      dto.intervaloDeTempo,
    );

    this.aulaRepository.merge(aula, {
      intervaloDeTempo: { id: intervalo!.id },
    });

    await this.aulaRepository.save(aula);

    return this.aulaFindByIdStrict(accessContext, { id: aula.id });
  }

  async aulaUpdate(
    accessContext: AccessContext,
    dto: AulaFindOneInput & AulaUpdateInput,
  ): Promise<AulaFindOneOutput> {
    const currentAula = await this.aulaFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission("aula:update", { dto }, dto.id);

    const dtoAula = pick(dto, ["formato", "data", "intervaloDeTempo", "diario", "ambiente"]);

    const aula = {
      id: currentAula.id,
    } as AulaEntity;

    this.aulaRepository.merge(aula, {
      ...dtoAula,
    });

    if (has(dto, "ambiente") && dto.ambiente !== undefined) {
      if (dto.ambiente !== null) {
        const ambiente = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
          id: dto.ambiente.id,
        });

        this.aulaRepository.merge(aula, { ambiente: { id: ambiente.id } });
      } else {
        this.aulaRepository.merge(aula, { ambiente: null });
      }
    }

    if (has(dto, "diario") && dto.diario !== undefined) {
      const diario = await this.diarioService.diarioFindByIdSimpleStrict(
        accessContext,
        dto.diario.id,
      );

      this.aulaRepository.merge(aula, { diario: { id: diario.id } });
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      this.aulaRepository.merge(aula, {
        intervaloDeTempo: { id: intervaloDeTempo!.id },
      });
    }

    await this.aulaRepository.save(aula);

    return this.aulaFindByIdStrict(accessContext, { id: aula.id });
  }

  async aulaDeleteOneById(accessContext: AccessContext, dto: AulaFindOneInput): Promise<boolean> {
    await accessContext.ensurePermission("aula:delete", { dto }, dto.id);

    const aula = await this.aulaFindByIdStrict(accessContext, dto);

    if (aula) {
      await this.aulaRepository.softDeleteById(aula.id);
    }

    return true;
  }
}
