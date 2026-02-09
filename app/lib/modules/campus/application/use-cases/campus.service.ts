import { Inject, Injectable } from "@nestjs/common";
import { get } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import {
  AUTHORIZATION_SERVICE_PORT,
  BaseCrudService,
  type IAuthorizationServicePort,
} from "@/modules/@shared";
import type {
  CampusCreateInputDto,
  CampusFindOneInputDto,
  CampusFindOneOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
  CampusUpdateInputDto,
} from "@/modules/campus/application/dtos";
import {
  CAMPUS_REPOSITORY_PORT,
  type ICampusRepositoryPort,
  type ICampusUseCasePort,
} from "@/modules/campus/application/ports";
import type { CampusEntity } from "@/modules/campus/infrastructure/persistence/typeorm";
import { type EnderecoInputDto, EnderecoService } from "@/modules/endereco";

@Injectable()
export class CampusService
  extends BaseCrudService<
    CampusEntity,
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
  protected readonly createFields = ["nomeFantasia", "razaoSocial", "apelido", "cnpj"] as const;
  protected readonly updateFields = ["nomeFantasia", "razaoSocial", "apelido", "cnpj"] as const;

  constructor(
    @Inject(CAMPUS_REPOSITORY_PORT)
    protected readonly repository: ICampusRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    protected readonly authorizationService: IAuthorizationServicePort,
    private readonly enderecoService: EnderecoService,
  ) {
    super();
  }

  protected override async beforeCreate(
    _accessContext: AccessContext,
    entity: CampusEntity,
    dto: CampusCreateInputDto,
  ): Promise<void> {
    const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(null, dto.endereco);
    this.repository.merge(entity, { endereco: { id: endereco.id } });
  }

  protected override async beforeUpdate(
    _accessContext: AccessContext,
    entity: CampusEntity,
    dto: CampusFindOneInputDto & CampusUpdateInputDto,
    current: CampusFindOneOutputDto,
  ): Promise<void> {
    const dtoEndereco = get(dto, "endereco");

    if (dtoEndereco) {
      const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(
        current.endereco.id,
        dtoEndereco as EnderecoInputDto,
      );
      this.repository.merge(entity, { endereco: { id: endereco.id } });
    }
  }
}
