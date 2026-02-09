import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { DiarioProfessorService } from "@/modules/diario-professor/application/use-cases/diario-professor.service";
import { HorarioGeradoService } from "@/modules/horario-gerado";
import type { HorarioGeradoAulaEntity } from "@/modules/horario-gerado-aula/infrastructure/persistence/typeorm";
import { IntervaloDeTempoService } from "@/modules/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
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
  HorarioGeradoAulaEntity,
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
  protected readonly createFields = ["data"] as const;
  protected readonly updateFields = ["data"] as const;

  constructor(
    @Inject(HORARIO_GERADO_AULA_REPOSITORY_PORT)
    protected readonly repository: IHorarioGeradoAulaRepositoryPort,
    private readonly diarioProfessorService: DiarioProfessorService,
    private readonly horarioGeradoService: HorarioGeradoService,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
  ) {
    super();
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: HorarioGeradoAulaEntity,
    dto: HorarioGeradoAulaCreateInputDto,
  ): Promise<void> {
    if (dto.diarioProfessor) {
      const diarioProfessor = await this.diarioProfessorService.findByIdStrict(
        accessContext,
        dto.diarioProfessor,
      );
      this.repository.merge(entity, { diarioProfessor: { id: diarioProfessor.id } });
    }

    if (dto.horarioGerado) {
      const horarioGerado = await this.horarioGeradoService.findByIdStrict(
        accessContext,
        dto.horarioGerado,
      );
      this.repository.merge(entity, { horarioGerado: { id: horarioGerado.id } });
    }

    if (dto.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      this.repository.merge(entity, { intervaloDeTempo: { id: intervalo!.id } });
    }
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: HorarioGeradoAulaEntity,
    dto: HorarioGeradoAulaFindOneInputDto & HorarioGeradoAulaUpdateInputDto,
  ): Promise<void> {
    if (has(dto, "diarioProfessor") && dto.diarioProfessor !== undefined) {
      const diarioProfessor = await this.diarioProfessorService.findByIdStrict(
        accessContext,
        dto.diarioProfessor!,
      );
      this.repository.merge(entity, { diarioProfessor: { id: diarioProfessor.id } });
    }

    if (has(dto, "horarioGerado") && dto.horarioGerado !== undefined) {
      const horarioGerado = await this.horarioGeradoService.findByIdStrict(
        accessContext,
        dto.horarioGerado,
      );
      this.repository.merge(entity, { horarioGerado: { id: horarioGerado.id } });
    }

    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo!,
      );
      this.repository.merge(entity, { intervaloDeTempo: { id: intervaloDeTempo!.id } });
    }
  }
}
