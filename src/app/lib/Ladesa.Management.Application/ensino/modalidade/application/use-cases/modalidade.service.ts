import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { Modalidade } from "@/Ladesa.Management.Application/ensino/modalidade";
import type {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
  ModalidadeUpdateInputDto,
} from "@/Ladesa.Management.Application/ensino/modalidade/application/dtos";
import {
  IModalidadeRepository,
  type IModalidadeUseCasePort,
} from "@/Ladesa.Management.Application/ensino/modalidade/application/ports";

@Injectable()
export class ModalidadeService
  extends BaseCrudService<
    Modalidade,
    ModalidadeListInputDto,
    ModalidadeListOutputDto,
    ModalidadeFindOneInputDto,
    ModalidadeFindOneOutputDto,
    ModalidadeCreateInputDto,
    ModalidadeUpdateInputDto
  >
  implements IModalidadeUseCasePort
{
  protected readonly resourceName = "Modalidade";
  protected readonly createAction = "modalidade:create";
  protected readonly updateAction = "modalidade:update";
  protected readonly deleteAction = "modalidade:delete";

  constructor(
    @Inject(IModalidadeRepository)
    protected readonly repository: IModalidadeRepository,
  ) {
    super();
  }

  protected async buildCreateData(
    _ac: AccessContext,
    dto: ModalidadeCreateInputDto,
  ): Promise<Partial<PersistInput<Modalidade>>> {
    const domain = Modalidade.criar({ nome: dto.nome, slug: dto.slug });
    return { ...domain };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: ModalidadeFindOneInputDto & ModalidadeUpdateInputDto,
    current: ModalidadeFindOneOutputDto,
  ): Promise<Partial<PersistInput<Modalidade>>> {
    const domain = Modalidade.fromData(current as unknown as Modalidade);
    domain.atualizar({ nome: dto.nome, slug: dto.slug });
    return { nome: domain.nome, slug: domain.slug };
  }
}
