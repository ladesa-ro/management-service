import { Inject, Injectable } from "@nestjs/common";
import { get } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import type { ICampus } from "@/modules/ambientes/campus/domain/campus.types";
import {
  type ICampusUpdateCommand,
  ICampusUpdateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-update.command.handler.interface";
import { IEnderecoCreateOrUpdateCommandHandler } from "@/modules/localidades/endereco/domain/commands/endereco-create-or-update.command.handler.interface";
import { CAMPUS_REPOSITORY_PORT, type ICampusRepositoryPort } from "../../../domain/repositories";
import type { CampusFindOneOutputDto } from "../../dtos";

@Injectable()
export class CampusUpdateCommandHandlerImpl implements ICampusUpdateCommandHandler {
  constructor(
    @Inject(CAMPUS_REPOSITORY_PORT)
    private readonly repository: ICampusRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(IEnderecoCreateOrUpdateCommandHandler)
    private readonly enderecoCreateOrUpdateHandler: IEnderecoCreateOrUpdateCommandHandler,
  ) {}

  async execute({ accessContext, dto }: ICampusUpdateCommand): Promise<CampusFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("Campus", dto.id);
    }

    await this.authorizationService.ensurePermission("campus:update", { dto }, dto.id);

    const domain = Campus.fromData(current);
    domain.atualizar({
      nomeFantasia: dto.nomeFantasia,
      razaoSocial: dto.razaoSocial,
      apelido: dto.apelido,
      cnpj: dto.cnpj,
    });
    const updateData: Partial<PersistInput<ICampus>> = {
      nomeFantasia: domain.nomeFantasia,
      razaoSocial: domain.razaoSocial,
      apelido: domain.apelido,
      cnpj: domain.cnpj,
    };
    const dtoEndereco = get(dto, "endereco");
    if (dtoEndereco) {
      const endereco = await this.enderecoCreateOrUpdateHandler.execute({
        id: current.endereco.id,
        dto: dtoEndereco as any,
      });
      updateData.endereco = { id: endereco.id as string };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("Campus", dto.id);
    }

    return result;
  }
}
