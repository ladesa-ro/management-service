import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { DiarioService } from "@/modules/ensino/diario/application/use-cases/diario.service";
import { AmbienteService } from "@/modules/sisgea/ambiente/application/use-cases/ambiente.service";
import { Aula, type IAula } from "@/modules/sisgha/aula";
import { IntervaloDeTempoService } from "@/modules/sisgha/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
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
    IAula,
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

  constructor(
    @Inject(AULA_REPOSITORY_PORT)
    protected readonly repository: IAulaRepositoryPort,
    private readonly diarioService: DiarioService,
    private readonly intervaloService: IntervaloDeTempoService,
    private readonly ambienteService: AmbienteService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: AulaCreateInputDto,
  ): Promise<Partial<PersistInput<IAula>>> {
    let ambienteRef: { id: string } | null = null;
    if (dto.ambiente && dto.ambiente !== null) {
      const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
        id: dto.ambiente.id,
      });
      ambienteRef = { id: ambiente.id };
    }

    const diario = await this.diarioService.findByIdSimpleStrict(accessContext, dto.diario.id);
    const intervalo = await this.intervaloService.intervaloCreateOrUpdate(
      accessContext,
      dto.intervaloDeTempo,
    );

    const domain = Aula.criar({
      data: dto.data,
      modalidade: dto.modalidade,
      intervaloDeTempo: { id: intervalo!.id },
      diario: { id: diario.id },
      ambiente: ambienteRef,
    });
    return {
      ...domain,
      diario: { id: diario.id },
      intervaloDeTempo: { id: intervalo!.id },
      ambiente: ambienteRef,
    };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto & AulaUpdateInputDto,
    current: AulaFindOneOutputDto,
  ): Promise<Partial<PersistInput<IAula>>> {
    const domain = Aula.fromData(current);
    domain.atualizar({ data: dto.data, modalidade: dto.modalidade });
    const result: Partial<PersistInput<IAula>> = {
      data: domain.data,
      modalidade: domain.modalidade,
    };

    if (has(dto, "ambiente") && dto.ambiente !== undefined) {
      if (dto.ambiente !== null) {
        const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
          id: dto.ambiente.id,
        });
        result.ambiente = { id: ambiente.id };
      } else {
        result.ambiente = null;
      }
    }

    if (has(dto, "diario") && dto.diario !== undefined) {
      const diario = await this.diarioService.findByIdSimpleStrict(accessContext, dto.diario.id);
      result.diario = { id: diario.id };
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      result.intervaloDeTempo = { id: intervaloDeTempo!.id };
    }

    return result;
  }
}
