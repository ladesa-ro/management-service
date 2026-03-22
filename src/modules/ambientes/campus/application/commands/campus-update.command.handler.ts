import { get } from "lodash";
import { ensureExists } from "@/application/errors";
import type { PersistInput } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { Campus, type ICampus } from "@/modules/ambientes/campus/domain/campus";
import type { CampusUpdateCommand } from "@/modules/ambientes/campus/domain/commands/campus-update.command";
import { ICampusUpdateCommandHandler } from "@/modules/ambientes/campus/domain/commands/campus-update.command.handler.interface";
import type { CampusFindOneQuery } from "@/modules/ambientes/campus/domain/queries";
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

  async execute(
    accessContext: AccessContext | null,
    dto: CampusFindOneQuery & CampusUpdateCommand,
  ): Promise<CampusFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Campus.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Campus.load(current);
    domain.update({
      nomeFantasia: dto.nomeFantasia,
      razaoSocial: dto.razaoSocial,
      apelido: dto.apelido,
      cnpj: dto.cnpj,
    });
    const updateData: Partial<PersistInput<ICampus>> = { ...domain };
    const dtoEndereco = get(dto, "endereco");
    if (dtoEndereco) {
      const endereco = await this.enderecoCreateOrUpdateHandler.execute(null, {
        id: current.endereco.id,
        dto: dtoEndereco as any,
      });
      updateData.endereco = { id: endereco.id as string };
    }
    await this.repository.update(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Campus.entityName, dto.id);

    return result;
  }
}
