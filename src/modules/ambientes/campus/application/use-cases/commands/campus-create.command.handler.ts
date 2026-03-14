import { Inject, Injectable } from "@nestjs/common";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import {
  type ICampusCreateCommand,
  ICampusCreateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-create.command.handler.interface";
import { EnderecoService } from "@/modules/localidades/endereco";
import type { CampusFindOneOutputDto } from "../../dtos";
import { CAMPUS_REPOSITORY_PORT, type ICampusRepositoryPort } from "../../ports";

@Injectable()
export class CampusCreateCommandHandlerImpl implements ICampusCreateCommandHandler {
  constructor(
    @Inject(CAMPUS_REPOSITORY_PORT)
    private readonly repository: ICampusRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly enderecoService: EnderecoService,
  ) {}

  async execute({ accessContext, dto }: ICampusCreateCommand): Promise<CampusFindOneOutputDto> {
    await this.authorizationService.ensurePermission("campus:create", { dto });

    const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(null, dto.endereco);
    const domain = Campus.criar({
      nomeFantasia: dto.nomeFantasia,
      razaoSocial: dto.razaoSocial,
      apelido: dto.apelido,
      cnpj: dto.cnpj,
      endereco: dto.endereco,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      endereco: { id: endereco.id as string },
    });

    const result = await this.repository.findById(accessContext, { id });

    if (!result) {
      throw new ResourceNotFoundError("Campus", id);
    }

    return result;
  }
}
