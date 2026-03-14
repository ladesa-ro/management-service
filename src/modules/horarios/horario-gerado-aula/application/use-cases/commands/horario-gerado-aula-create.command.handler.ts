import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { DiarioProfessorService } from "@/modules/ensino/diario-professor/application/use-cases/diario-professor.service";
import { HorarioGeradoService } from "@/modules/horarios/horario-gerado";
import {
  type IHorarioGeradoAulaCreateCommand,
  IHorarioGeradoAulaCreateCommandHandler,
} from "@/modules/horarios/horario-gerado-aula/domain/commands/horario-gerado-aula-create.command.handler.interface";
import type { IHorarioGeradoAula } from "@/modules/horarios/horario-gerado-aula/domain/horario-gerado-aula.types";
import { IntervaloDeTempoService } from "@/modules/horarios/intervalo-de-tempo/application/use-cases/intervalo-de-tempo.service";
import type { HorarioGeradoAulaFindOneOutputDto } from "../../dtos";
import {
  HORARIO_GERADO_AULA_REPOSITORY_PORT,
  type IHorarioGeradoAulaRepositoryPort,
} from "../../ports";

@Injectable()
export class HorarioGeradoAulaCreateCommandHandlerImpl
  implements IHorarioGeradoAulaCreateCommandHandler
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
  }: IHorarioGeradoAulaCreateCommand): Promise<HorarioGeradoAulaFindOneOutputDto> {
    await this.authorizationService.ensurePermission("horario_gerado_aula:create", { dto });

    const createData: Partial<PersistInput<IHorarioGeradoAula>> = { data: dto.data };
    if (dto.diarioProfessor) {
      const diarioProfessor = await this.diarioProfessorService.findByIdStrict(
        accessContext,
        dto.diarioProfessor,
      );
      createData.diarioProfessor = { id: diarioProfessor.id };
    }
    if (dto.horarioGerado) {
      const horarioGerado = await this.horarioGeradoService.findByIdStrict(
        accessContext,
        dto.horarioGerado,
      );
      createData.horarioGerado = { id: horarioGerado.id };
    }
    if (dto.intervaloDeTempo) {
      const intervalo = await this.intervaloDeTempoService.intervaloCreateOrUpdate(
        accessContext,
        dto.intervaloDeTempo,
      );
      createData.intervaloDeTempo = { id: intervalo!.id };
    }
    const { id } = await this.repository.createFromDomain(createData as any);

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("HorarioGeradoAula", id);
    }

    return result;
  }
}
