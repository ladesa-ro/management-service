import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { DiarioProfessorService } from "@/Ladesa.Management.Application/ensino/diario-professor/application/use-cases/diario-professor.service";
import { HorarioGeradoService } from "@/Ladesa.Management.Application/horarios/horario-gerado";
import { HorarioGeradoAula } from "@/Ladesa.Management.Application/horarios/horario-gerado-aula";
import { IntervaloDeTempoService } from "@/Ladesa.Management.Application/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import { type HorarioGeradoAulaCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaCreateInputDto";
import { type HorarioGeradoAulaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaFindOneInputDto";
import { type HorarioGeradoAulaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaFindOneOutputDto";
import { type HorarioGeradoAulaListInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaListInputDto";
import { type HorarioGeradoAulaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaListOutputDto";
import { type HorarioGeradoAulaUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/HorarioGeradoAulaUpdateInputDto";
import { IHorarioGeradoAulaRepository } from "../ports";

@Injectable()
export class HorarioGeradoAulaService extends BaseCrudService<
  HorarioGeradoAula,
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
    @Inject(IHorarioGeradoAulaRepository)
    protected readonly repository: IHorarioGeradoAulaRepository,
    private readonly diarioProfessorService: DiarioProfessorService,
    private readonly horarioGeradoService: HorarioGeradoService,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaCreateInputDto,
  ): Promise<Partial<PersistInput<HorarioGeradoAula>>> {
    const result: Record<string, any> = { data: dto.data };

    if (dto.diarioProfessor) {
      const diarioProfessor = await this.diarioProfessorService.findByIdStrict(
        accessContext,
        dto.diarioProfessor,
      );
      result.diarioProfessorId = diarioProfessor.id;
    }

    if (dto.horarioGerado) {
      const horarioGerado = await this.horarioGeradoService.findByIdStrict(
        accessContext,
        dto.horarioGerado,
      );
      result.horarioGeradoId = horarioGerado.id;
    }

    if (dto.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      result.intervaloDeTempoId = intervalo!.id;
    }

    return result as HorarioGeradoAula;
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto & HorarioGeradoAulaUpdateInputDto,
    current: HorarioGeradoAulaFindOneOutputDto,
  ): Promise<Partial<PersistInput<HorarioGeradoAula>>> {
    const domain = HorarioGeradoAula.fromData({
      ...current,
      diarioProfessorId: current.diarioProfessor.id,
      horarioGeradoId: current.horarioGerado.id,
      intervaloDeTempoId: current.intervaloDeTempo.id,
    } as unknown as HorarioGeradoAula);
    domain.atualizar({ data: dto.data });
    const result: Partial<PersistInput<HorarioGeradoAula>> = { data: domain.data };

    if (has(dto, "diarioProfessor") && dto.diarioProfessor !== undefined) {
      const diarioProfessor = await this.diarioProfessorService.findByIdStrict(
        accessContext,
        dto.diarioProfessor!,
      );
      result.diarioProfessorId = diarioProfessor.id;
    }

    if (has(dto, "horarioGerado") && dto.horarioGerado !== undefined) {
      const horarioGerado = await this.horarioGeradoService.findByIdStrict(
        accessContext,
        dto.horarioGerado,
      );
      result.horarioGeradoId = horarioGerado.id;
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo!,
      );
      result.intervaloDeTempoId = intervaloDeTempo!.id;
    }

    return result;
  }
}
