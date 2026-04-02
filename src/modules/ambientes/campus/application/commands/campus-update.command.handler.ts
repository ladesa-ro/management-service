import { get } from "lodash";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { Campus, type ICampus } from "@/modules/ambientes/campus/domain/campus";
import type { CampusUpdateCommand } from "@/modules/ambientes/campus/domain/commands/campus-update.command";
import { ICampusUpdateCommandHandler } from "@/modules/ambientes/campus/domain/commands/campus-update.command.handler.interface";
import type { CampusFindOneQuery } from "@/modules/ambientes/campus/domain/queries";
import { IEnderecoCreateOrUpdateCommandHandler } from "@/modules/localidades/endereco/domain/commands/endereco-create-or-update.command.handler.interface";
import type { EnderecoInputCommand } from "@/modules/localidades/endereco/domain/commands/endereco-input.command";
import { ICampusPermissionChecker } from "../../domain/authorization";
import type { CampusFindOneQueryResult } from "../../domain/queries";
import { ICampusRepository } from "../../domain/repositories";

@Impl()
export class CampusUpdateCommandHandlerImpl implements ICampusUpdateCommandHandler {
  constructor(
    @Dep(ICampusRepository)
    private readonly repository: ICampusRepository,
    @Dep(ICampusPermissionChecker)
    private readonly permissionChecker: ICampusPermissionChecker,
    @Dep(IEnderecoCreateOrUpdateCommandHandler)
    private readonly enderecoCreateOrUpdateHandler: IEnderecoCreateOrUpdateCommandHandler,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: CampusFindOneQuery & CampusUpdateCommand,
  ): Promise<CampusFindOneQueryResult> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, Campus.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    domain.update({
      nomeFantasia: dto.nomeFantasia,
      razaoSocial: dto.razaoSocial,
      apelido: dto.apelido,
      cnpj: dto.cnpj,
    });

    const dtoEndereco = get(dto, "endereco");
    if (dtoEndereco) {
      const endereco = await this.enderecoCreateOrUpdateHandler.execute(null, {
        id: domain.endereco.id,
        dto: dtoEndereco as EnderecoInputCommand,
      });
      domain.endereco = { id: endereco.id as string } as ICampus["endereco"];
    }

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });
    ensureExists(result, Campus.entityName, dto.id);

    return result;
  }
}
