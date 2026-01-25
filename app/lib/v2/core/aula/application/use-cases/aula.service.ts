import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  AulaCreateInputDto,
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
  AulaUpdateInputDto,
} from "@/v2/adapters/in/http/aula/dto";
import type { AulaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { AmbienteService } from "@/v2/core/ambiente/application/use-cases/ambiente.service";
import { DiarioService } from "@/v2/core/diario/application/use-cases/diario.service";
import { IntervaloDeTempoService } from "@/v2/core/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type { IAulaRepositoryPort } from "../ports";

@Injectable()
export class AulaService {
  constructor(
    @Inject("IAulaRepositoryPort")
    private aulaRepository: IAulaRepositoryPort,
    private diarioService: DiarioService,
    private intervaloService: IntervaloDeTempoService,
    private ambienteService: AmbienteService,
  ) {}

  async aulaFindAll(
    accessContext: AccessContext,
    dto: AulaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<AulaListOutputDto> {
    return this.aulaRepository.findAll(accessContext, dto, selection);
  }

  async aulaFindById(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null> {
    return this.aulaRepository.findById(accessContext, dto, selection);
  }

  async aulaFindByIdStrict(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto> {
    const aula = await this.aulaRepository.findById(accessContext, dto, selection);

    if (!aula) {
      throw new NotFoundException();
    }

    return aula;
  }

  async aulaFindByIdSimple(
    accessContext: AccessContext,
    id: AulaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null> {
    return this.aulaRepository.findByIdSimple(accessContext, id, selection);
  }

  async aulaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: AulaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto> {
    const aula = await this.aulaRepository.findByIdSimple(accessContext, id, selection);

    if (!aula) {
      throw new NotFoundException();
    }

    return aula;
  }

  async aulaCreate(
    accessContext: AccessContext,
    dto: AulaCreateInputDto,
  ): Promise<AulaFindOneOutputDto> {
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
    dto: AulaFindOneInputDto & AulaUpdateInputDto,
  ): Promise<AulaFindOneOutputDto> {
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

  async aulaDeleteOneById(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("aula:delete", { dto }, dto.id);

    const aula = await this.aulaFindByIdStrict(accessContext, dto);

    if (aula) {
      await this.aulaRepository.softDeleteById(aula.id);
    }

    return true;
  }
}
