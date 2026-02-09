import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { AmbienteService } from "@/modules/ambiente/application/use-cases/ambiente.service";
import type { AulaEntity } from "@/modules/aula/infrastructure/persistence/typeorm";
import { DiarioService } from "@/modules/diario/application/use-cases/diario.service";
import { IntervaloDeTempoService } from "@/modules/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type {
  AulaCreateInputDto,
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
  AulaUpdateInputDto,
} from "../dtos";
import { AULA_REPOSITORY_PORT, type IAulaRepositoryPort } from "../ports";
import type { IAulaUseCasePort } from "../ports/in/aula.use-case.port";

@Injectable()
export class AulaService
  extends BaseCrudService<
    AulaEntity,
    AulaListInputDto,
    AulaListOutputDto,
    AulaFindOneInputDto,
    AulaFindOneOutputDto,
    AulaCreateInputDto,
    AulaUpdateInputDto
  >
  implements IAulaUseCasePort
{
  protected readonly resourceName = "Aula";
  protected readonly createAction = "aula:create";
  protected readonly updateAction = "aula:update";
  protected readonly deleteAction = "aula:delete";
  protected readonly createFields = ["data", "modalidade"] as const;
  protected readonly updateFields = ["data", "modalidade"] as const;

  constructor(
    @Inject(AULA_REPOSITORY_PORT)
    protected readonly repository: IAulaRepositoryPort,
    private readonly diarioService: DiarioService,
    private readonly intervaloService: IntervaloDeTempoService,
    private readonly ambienteService: AmbienteService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: AulaEntity,
    dto: AulaCreateInputDto,
  ): Promise<void> {
    if (dto.ambiente && dto.ambiente !== null) {
      const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
        id: dto.ambiente.id,
      });
      this.repository.merge(entity, { ambiente: { id: ambiente.id } });
    } else {
      this.repository.merge(entity, { ambiente: null });
    }

    const diario = await this.diarioService.findByIdSimpleStrict(accessContext, dto.diario.id);
    this.repository.merge(entity, { diario: { id: diario.id } });

    const intervalo = await this.intervaloService.intervaloCreateOrUpdate(
      accessContext,
      dto.intervaloDeTempo,
    );
    this.repository.merge(entity, { intervaloDeTempo: { id: intervalo!.id } });
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: AulaEntity,
    dto: AulaFindOneInputDto & AulaUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "ambiente") && dto.ambiente !== undefined) {
      if (dto.ambiente !== null) {
        const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
          id: dto.ambiente.id,
        });
        this.repository.merge(entity, { ambiente: { id: ambiente.id } });
      } else {
        this.repository.merge(entity, { ambiente: null });
      }
    }

    if (has(dto, "diario") && dto.diario !== undefined) {
      const diario = await this.diarioService.findByIdSimpleStrict(accessContext, dto.diario.id);
      this.repository.merge(entity, { diario: { id: diario.id } });
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      this.repository.merge(entity, { intervaloDeTempo: { id: intervaloDeTempo!.id } });
    }
  }
}
