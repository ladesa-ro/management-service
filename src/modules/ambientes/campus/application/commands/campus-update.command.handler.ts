import { get } from "lodash";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists, type PersistInput } from "@/modules/@shared";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import type { ICampus } from "@/modules/ambientes/campus/domain/campus.types";
import {
  type ICampusUpdateCommand,
  ICampusUpdateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-update.command.handler.interface";
import { IEnderecoCreateOrUpdateCommandHandler } from "@/modules/localidades/endereco/domain/commands/endereco-create-or-update.command.handler.interface";
import { ICampusPermissionChecker } from "../../domain/authorization";
import type { CampusFindOneQueryResult } from "../../domain/queries";
import { ICampusRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CampusUpdateCommandHandlerImpl implements ICampusUpdateCommandHandler {
  constructor(
    @DeclareDependency(ICampusRepository)
    private readonly repository: ICampusRepository,
    @DeclareDependency(ICampusPermissionChecker)
    private readonly permissionChecker: ICampusPermissionChecker,
    @DeclareDependency(IEnderecoCreateOrUpdateCommandHandler)
    private readonly enderecoCreateOrUpdateHandler: IEnderecoCreateOrUpdateCommandHandler,
  ) {}

  async execute({ accessContext, dto }: ICampusUpdateCommand): Promise<CampusFindOneQueryResult> {
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
