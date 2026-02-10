import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { Disponibilidade, type IDisponibilidade } from "@/modules/disponibilidade";
import type {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeUpdateInputDto,
} from "@/modules/disponibilidade/application/dtos";
import {
  DISPONIBILIDADE_REPOSITORY_PORT,
  type IDisponibilidadeRepositoryPort,
  type IDisponibilidadeUseCasePort,
} from "@/modules/disponibilidade/application/ports";

@Injectable()
export class DisponibilidadeService
  extends BaseCrudService<
    IDisponibilidade,
    DisponibilidadeListInputDto,
    DisponibilidadeListOutputDto,
    DisponibilidadeFindOneInputDto,
    DisponibilidadeFindOneOutputDto,
    DisponibilidadeCreateInputDto,
    DisponibilidadeUpdateInputDto
  >
  implements IDisponibilidadeUseCasePort
{
  protected readonly resourceName = "Disponibilidade";
  protected readonly createAction = "disponibilidade:create";
  protected readonly updateAction = "disponibilidade:update";
  protected readonly deleteAction = "disponibilidade:delete";

  constructor(
    @Inject(DISPONIBILIDADE_REPOSITORY_PORT)
    protected readonly repository: IDisponibilidadeRepositoryPort,
  ) {
    super();
  }

  protected async buildCreateData(
    _ac: AccessContext,
    dto: DisponibilidadeCreateInputDto,
  ): Promise<Partial<PersistInput<IDisponibilidade>>> {
    const domain = Disponibilidade.criar({ dataInicio: dto.dataInicio, dataFim: dto.dataFim });
    return { ...domain };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: DisponibilidadeFindOneInputDto & DisponibilidadeUpdateInputDto,
    current: DisponibilidadeFindOneOutputDto,
  ): Promise<Partial<PersistInput<IDisponibilidade>>> {
    const domain = Disponibilidade.fromData(current);
    domain.atualizar({ dataInicio: dto.dataInicio, dataFim: dto.dataFim });
    return { dataInicio: domain.dataInicio, dataFim: domain.dataFim };
  }
}
