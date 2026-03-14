import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { DiarioProfessorService } from "@/modules/ensino/diario-professor/application/use-cases/diario-professor.service";
import { HorarioGeradoService } from "@/modules/horarios/horario-gerado";
import {
  type IHorarioGeradoAulaUpdateCommand,
  IHorarioGeradoAulaUpdateCommandHandler,
} from "@/modules/horarios/horario-gerado-aula/domain/commands/horario-gerado-aula-update.command.handler.interface";
import { HorarioGeradoAula } from "@/modules/horarios/horario-gerado-aula/domain/horario-gerado-aula.domain";
import type { IHorarioGeradoAula } from "@/modules/horarios/horario-gerado-aula/domain/horario-gerado-aula.types";
import { IntervaloDeTempoService } from "@/modules/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type { HorarioGeradoAulaFindOneOutputDto } from "../../dtos";
import {
  HORARIO_GERADO_AULA_REPOSITORY_PORT,
  type IHorarioGeradoAulaRepositoryPort,
} from "../../ports";

@Injectable()
export class HorarioGeradoAulaUpdateCommandHandlerImpl
  implements IHorarioGeradoAulaUpdateCommandHandler
{
  constructor(
    @Inject(HORARIO_GERADO_AULA_REPOSITORY_PORT)
    private readonly repository: IHorarioGeradoAulaRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly diarioProfessorService: DiarioProfessorService,
    private readonly horarioGeradoService: HorarioGeradoService,
    private readonly intervaloDeTempoService: IntervaloDeTempoService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IHorarioGeradoAulaUpdateCommand): Promise<HorarioGeradoAulaFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("HorarioGeradoAula", dto.id);
    }

    await this.authorizationService.ensurePermission("horario_gerado_aula:update", { dto }, dto.id);

    const domain = HorarioGeradoAula.fromData(current);
    domain.atualizar({ data: dto.data });
    const updateData: Partial<PersistInput<IHorarioGeradoAula>> = { data: domain.data };
    if (has(dto, "diarioProfessor") && dto.diarioProfessor !== undefined) {
      const diarioProfessor = await this.diarioProfessorService.findByIdStrict(
        accessContext,
        dto.diarioProfessor!,
      );
      updateData.diarioProfessor = { id: diarioProfessor.id };
    }
    if (has(dto, "horarioGerado") && dto.horarioGerado !== undefined) {
      const horarioGerado = await this.horarioGeradoService.findByIdStrict(
        accessContext,
        dto.horarioGerado,
      );
      updateData.horarioGerado = { id: horarioGerado.id };
    }
    if (has(dto, "intervaloDeTempo") && dto.intervaloDeTempo !== undefined) {
      const intervaloDeTempo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo!,
      );
      updateData.intervaloDeTempo = { id: intervaloDeTempo!.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("HorarioGeradoAula", dto.id);
    }

    return result;
  }
}
