import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { AmbienteService } from "@/Ladesa.Management.Application/ambientes/ambiente/application/use-cases/ambiente.service";
import { DiarioService } from "@/Ladesa.Management.Application/ensino/diario/application/use-cases/diario.service";
import { Aula } from "@/Ladesa.Management.Application/horarios/aula";
import { IntervaloDeTempoService } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import { type AulaCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaCreateInputDto";
import { type AulaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaFindOneInputDto";
import { type AulaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/AulaFindOneOutputDto";
import { type AulaListInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaListInputDto";
import { type AulaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/AulaListOutputDto";
import { type AulaUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/AulaUpdateInputDto";
import { IAulaRepository } from "../ports";
import type { IAulaUseCasePort } from "../ports/in/aula.use-case.port";

@Injectable()
export class AulaService
  extends BaseCrudService<
    Aula,
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
    @Inject(IAulaRepository)
    protected readonly repository: IAulaRepository,
    private readonly diarioService: DiarioService,
    private readonly intervaloService: IntervaloDeTempoService,
    private readonly ambienteService: AmbienteService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: AulaCreateInputDto,
  ): Promise<Partial<PersistInput<Aula>>> {
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
    return { ...domain };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto & AulaUpdateInputDto,
    current: AulaFindOneOutputDto,
  ): Promise<Partial<PersistInput<Aula>>> {
    const domain = Aula.fromData({
      ...current,
      intervaloDeTempoId: current.intervaloDeTempo.id,
      diarioId: current.diario.id,
      ambienteId: current.ambiente?.id ?? null,
    } as unknown as Aula);
    domain.atualizar({ data: dto.data, modalidade: dto.modalidade });
    const result: Partial<PersistInput<Aula>> = {
      data: domain.data,
      modalidade: domain.modalidade,
    };

    if (has(dto, "ambiente") && dto.ambiente !== undefined) {
      if (dto.ambiente !== null) {
        const ambiente = await this.ambienteService.findByIdStrict(accessContext, {
          id: dto.ambiente.id,
        });
        result.ambienteId = ambiente.id;
      } else {
        result.ambienteId = null;
      }
    }

    if (has(dto, "diario") && dto.diario !== undefined) {
      const diario = await this.diarioService.findByIdSimpleStrict(accessContext, dto.diario.id);
      result.diarioId = diario.id;
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      result.intervaloDeTempoId = intervaloDeTempo!.id;
    }

    return result;
  }
}
