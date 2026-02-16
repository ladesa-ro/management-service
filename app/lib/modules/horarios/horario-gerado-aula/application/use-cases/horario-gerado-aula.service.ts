import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { DiarioProfessorService } from "@/modules/ensino/diario-professor/application/use-cases/diario-professor.service";
import { HorarioGeradoService } from "@/modules/horarios/horario-gerado";
import { HorarioGeradoAula, type IHorarioGeradoAula } from "@/modules/horarios/horario-gerado-aula";
import { IntervaloDeTempoService } from "@/modules/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type {
  HorarioGeradoAulaCreateInputDto,
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
  HorarioGeradoAulaUpdateInputDto,
} from "../dtos";
import {
  HORARIO_GERADO_AULA_REPOSITORY_PORT,
  type IHorarioGeradoAulaRepositoryPort,
} from "../ports";

@Injectable()
export class HorarioGeradoAulaService extends BaseCrudService<
  IHorarioGeradoAula,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaCreateInputDto,
  HorarioGeradoAulaUpdateInputDto
> {
  protected readonly resourceName = "HorarioGeradoAula";
  protected readonly createAction = "horario_gerado_aula:create";
  protected readonly updateAction = "horario_gerado_aula:update";
  protected readonly deleteAction = "horario_gerado_aula:delete";

  constructor(
    @Inject(HORARIO_GERADO_AULA_REPOSITORY_PORT)
    protected readonly repository: IHorarioGeradoAulaRepositoryPort,
    private readonly diarioProfessorService: DiarioProfessorService,
    private readonly horarioGeradoService: HorarioGeradoService,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaCreateInputDto,
  ): Promise<Partial<PersistInput<IHorarioGeradoAula>>> {
    const result: Record<string, any> = { data: dto.data };

    if (dto.diarioProfessor) {
      const diarioProfessor = await this.diarioProfessorService.findByIdStrict(
        accessContext,
        dto.diarioProfessor,
      );
      result.diarioProfessor = { id: diarioProfessor.id };
    }

    if (dto.horarioGerado) {
      const horarioGerado = await this.horarioGeradoService.findByIdStrict(
        accessContext,
        dto.horarioGerado,
      );
      result.horarioGerado = { id: horarioGerado.id };
    }

    if (dto.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      result.intervaloDeTempo = { id: intervalo!.id };
    }

    return result as IHorarioGeradoAula;
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto & HorarioGeradoAulaUpdateInputDto,
    current: HorarioGeradoAulaFindOneOutputDto,
  ): Promise<Partial<PersistInput<IHorarioGeradoAula>>> {
    const domain = HorarioGeradoAula.fromData(current);
    domain.atualizar({ data: dto.data });
    const result: Partial<PersistInput<IHorarioGeradoAula>> = { data: domain.data };

    if (has(dto, "diarioProfessor") && dto.diarioProfessor !== undefined) {
      const diarioProfessor = await this.diarioProfessorService.findByIdStrict(
        accessContext,
        dto.diarioProfessor!,
      );
      result.diarioProfessor = { id: diarioProfessor.id };
    }

    if (has(dto, "horarioGerado") && dto.horarioGerado !== undefined) {
      const horarioGerado = await this.horarioGeradoService.findByIdStrict(
        accessContext,
        dto.horarioGerado,
      );
      result.horarioGerado = { id: horarioGerado.id };
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo!,
      );
      result.intervaloDeTempo = { id: intervaloDeTempo!.id };
    }

    return result;
  }
}
