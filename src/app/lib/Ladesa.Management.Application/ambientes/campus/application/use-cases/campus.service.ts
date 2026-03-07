import { Inject, Injectable } from "@nestjs/common";
import { get } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import {
  AUTHORIZATION_SERVICE_PORT,
  BaseCrudService,
  type IAuthorizationServicePort,
  type PersistInput,
} from "@/Ladesa.Management.Application/@shared";
import { Campus } from "@/Ladesa.Management.Application/ambientes/campus";
import {
  ICampusRepository,
  type ICampusUseCasePort,
} from "@/Ladesa.Management.Application/ambientes/campus/application/ports";
import {
  type EnderecoInputDto,
  EnderecoService,
} from "@/Ladesa.Management.Application/localidades/endereco";
import { type CampusCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusCreateInputDto";
import { type CampusFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusFindOneInputDto";
import { type CampusFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CampusFindOneOutputDto";
import { type CampusListInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusListInputDto";
import { type CampusListOutputDto } from "@/Ladesa.Management.Domain/Dtos/CampusListOutputDto";
import { type CampusUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/CampusUpdateInputDto";

@Injectable()
export class CampusService
  extends BaseCrudService<
    Campus,
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
    @Inject(ICampusRepository)
    protected readonly repository: ICampusRepository,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    protected readonly authorizationService: IAuthorizationServicePort,
    private readonly enderecoService: EnderecoService,
  ) {
    super();
  }

  protected async buildCreateData(
    _ac: AccessContext,
    dto: CampusCreateInputDto,
  ): Promise<Partial<PersistInput<Campus>>> {
    const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(null, dto.endereco);
    const domain = Campus.criar(
      {
        nomeFantasia: dto.nomeFantasia,
        razaoSocial: dto.razaoSocial,
        apelido: dto.apelido,
        cnpj: dto.cnpj,
        endereco: dto.endereco,
      },
      endereco.id as string,
    );
    return { ...domain };
  }

  protected async buildUpdateData(
    _ac: AccessContext,
    dto: CampusFindOneInputDto & CampusUpdateInputDto,
    current: CampusFindOneOutputDto,
  ): Promise<Partial<PersistInput<Campus>>> {
    const domain = Campus.fromData({
      ...current,
      enderecoId: current.endereco.id as string,
    } as unknown as Campus);
    domain.atualizar({
      nomeFantasia: dto.nomeFantasia,
      razaoSocial: dto.razaoSocial,
      apelido: dto.apelido,
      cnpj: dto.cnpj,
    });

    const result: Partial<PersistInput<Campus>> = {
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
      result.enderecoId = endereco.id as string;
    }

    return result;
  }
}
