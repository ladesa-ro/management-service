import { Inject, Injectable } from "@nestjs/common";
import { get } from "lodash";
import { type EnderecoInputDto, EnderecoService } from "@/modules/localidades/endereco";
import type { AccessContext } from "@/modules/@core/contexto-acesso";
import {
  AUTHORIZATION_SERVICE_PORT,
  BaseCrudService,
  type IAuthorizationServicePort,
  type PersistInput,
} from "@/modules/@shared";
import { Campus, type ICampus } from "@/modules/ambientes/campus";
import type {
  CampusCreateInputDto,
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
  CampusUpdateInputDto,
} from "@/modules/ambientes/campus/application/dtos";
import {
  CAMPUS_REPOSITORY_PORT,
  type ICampusRepositoryPort,
  type ICampusUseCasePort,
} from "@/modules/ambientes/campus/application/ports";

@Injectable()
export class CampusService
  extends BaseCrudService<
    ICampus,
    CampusListInputDto,
    CampusListOutputDto,
    CampusFindOneInputDto,
    CampusFindOneOutputDto,
    CampusCreateInputDto,
    CampusUpdateInputDto
  >
  implements ICampusUseCasePort
{
  protected readonly resourceName = "Campus";
  protected readonly createAction = "campus:create";
  protected readonly updateAction = "campus:update";
  protected readonly deleteAction = "campus:delete";

  constructor(
    @Inject(CAMPUS_REPOSITORY_PORT)
    protected readonly repository: ICampusRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    protected readonly authorizationService: IAuthorizationServicePort,
    private readonly enderecoService: EnderecoService,
  ) {
    super();
  }

  protected async buildCreateData(
    _ac: AccessContext,
    dto: CampusCreateInputDto,
  ): Promise<Partial<PersistInput<ICampus>>> {
    const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(null, dto.endereco);
    const domain = Campus.criar({
      nomeFantasia: dto.nomeFantasia,
      razaoSocial: dto.razaoSocial,
      apelido: dto.apelido,
      cnpj: dto.cnpj,
      endereco: dto.endereco,
    });
    return { ...domain, endereco: { id: endereco.id as string } };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: CampusFindOneInputDto & CampusUpdateInputDto,
    current: CampusFindOneOutputDto,
  ): Promise<Partial<PersistInput<ICampus>>> {
    const domain = Campus.fromData(current);
    domain.atualizar({
      nomeFantasia: dto.nomeFantasia,
      razaoSocial: dto.razaoSocial,
      apelido: dto.apelido,
      cnpj: dto.cnpj,
    });

    const result: Partial<PersistInput<ICampus>> = {
      nomeFantasia: domain.nomeFantasia,
      razaoSocial: domain.razaoSocial,
      apelido: domain.apelido,
      cnpj: domain.cnpj,
    };

    const dtoEndereco = get(dto, "endereco");
    if (dtoEndereco) {
      const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(
        current.endereco.id,
        dtoEndereco as EnderecoInputDto,
      );
      result.endereco = { id: endereco.id as string };
    }

    return result;
  }
}
