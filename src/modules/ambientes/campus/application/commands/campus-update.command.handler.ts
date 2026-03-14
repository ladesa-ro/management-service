import { Inject, Injectable } from "@nestjs/common";
import { get } from "lodash";
import { ensureExists, type PersistInput } from "@/modules/@shared";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import type { ICampus } from "@/modules/ambientes/campus/domain/campus.types";
import {
  type ICampusUpdateCommand,
  ICampusUpdateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-update.command.handler.interface";
import { IEnderecoCreateOrUpdateCommandHandler } from "@/modules/localidades/endereco/domain/commands/endereco-create-or-update.command.handler.interface";
import { ICampusPermissionChecker } from "../../domain/authorization";
import { ICampusRepository } from "../../domain/repositories";
import type { CampusFindOneOutputDto } from "../dtos";

@Injectable()
export class CampusUpdateCommandHandlerImpl implements ICampusUpdateCommandHandler {
  constructor(
    @Inject(ICampusRepository)
    private readonly repository: ICampusRepository,
    @Inject(ICampusPermissionChecker)
    private readonly permissionChecker: ICampusPermissionChecker,
    @Inject(IEnderecoCreateOrUpdateCommandHandler)
    private readonly enderecoCreateOrUpdateHandler: IEnderecoCreateOrUpdateCommandHandler,
  ) {}

  async execute({ accessContext, dto }: ICampusUpdateCommand): Promise<CampusFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Campus.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

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

    ensureExists(result, Campus.entityName, dto.id);

    return result;
  }
}
