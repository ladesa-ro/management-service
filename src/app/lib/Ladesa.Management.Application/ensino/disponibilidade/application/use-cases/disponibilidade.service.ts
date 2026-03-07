import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { Disponibilidade } from "@/Ladesa.Management.Application/ensino/disponibilidade";
import type {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeUpdateInputDto,
} from "@/Ladesa.Management.Application/ensino/disponibilidade/application/dtos";
import {
  IDisponibilidadeRepository,
  type IDisponibilidadeUseCasePort,
} from "@/Ladesa.Management.Application/ensino/disponibilidade/application/ports";

@Injectable()
export class DisponibilidadeService
  extends BaseCrudService<
    Disponibilidade,
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
    @Inject(IDisponibilidadeRepository)
    protected readonly repository: IDisponibilidadeRepository,
  ) {
    super();
  }

  protected async buildCreateData(
    _ac: AccessContext,
    dto: DisponibilidadeCreateInputDto,
  ): Promise<Partial<PersistInput<Disponibilidade>>> {
    const domain = Disponibilidade.criar({ dataInicio: dto.dataInicio, dataFim: dto.dataFim });
    return { ...domain };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: DisponibilidadeFindOneInputDto & DisponibilidadeUpdateInputDto,
    current: DisponibilidadeFindOneOutputDto,
  ): Promise<Partial<PersistInput<Disponibilidade>>> {
    const domain = Disponibilidade.fromData(current as unknown as Disponibilidade);
    domain.atualizar({ dataInicio: dto.dataInicio, dataFim: dto.dataFim });
    return { dataInicio: domain.dataInicio, dataFim: domain.dataFim };
  }
}
