import { Inject, Injectable } from "@nestjs/common";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { type IModalidade, Modalidade } from "@/modules/modalidade";
import type {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
  ModalidadeUpdateInputDto,
} from "@/modules/modalidade/application/dtos";
import {
  type IModalidadeRepositoryPort,
  type IModalidadeUseCasePort,
  MODALIDADE_REPOSITORY_PORT,
} from "@/modules/modalidade/application/ports";

@Injectable()
export class ModalidadeService
  extends BaseCrudService<
    IModalidade,
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
    @Inject(MODALIDADE_REPOSITORY_PORT)
    protected readonly repository: IModalidadeRepositoryPort,
  ) {
    super();
  }

  protected async buildCreateData(
    _ac: AccessContext,
    dto: ModalidadeCreateInputDto,
  ): Promise<Partial<PersistInput<IModalidade>>> {
    const domain = Modalidade.criar({ nome: dto.nome, slug: dto.slug });
    return { ...domain };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: ModalidadeFindOneInputDto & ModalidadeUpdateInputDto,
    current: ModalidadeFindOneOutputDto,
  ): Promise<Partial<PersistInput<IModalidade>>> {
    const domain = Modalidade.fromData(current);
    domain.atualizar({ nome: dto.nome, slug: dto.slug });
    return { nome: domain.nome, slug: domain.slug };
  }
}
