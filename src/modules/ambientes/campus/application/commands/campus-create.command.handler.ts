import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { Campus, type ICampus } from "@/modules/ambientes/campus/domain/campus";
import type { CampusCreateCommand } from "@/modules/ambientes/campus/domain/commands/campus-create.command";
import { ICampusCreateCommandHandler } from "@/modules/ambientes/campus/domain/commands/campus-create.command.handler.interface";
import { IEnderecoCreateOrUpdateCommandHandler } from "@/modules/localidades/endereco/domain/commands/endereco-create-or-update.command.handler.interface";
import { ICampusPermissionChecker } from "../../domain/authorization";
import type { CampusFindOneQueryResult } from "../../domain/queries";
import { ICampusRepository } from "../../domain/repositories";

@Impl()
export class CampusCreateCommandHandlerImpl implements ICampusCreateCommandHandler {
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
    dto: CampusCreateCommand,
  ): Promise<CampusFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const endereco = await this.enderecoCreateOrUpdateHandler.execute(null, {
      id: null,
      dto: dto.endereco,
    });

    const domain = Campus.create({
      nomeFantasia: dto.nomeFantasia,
      razaoSocial: dto.razaoSocial,
      apelido: dto.apelido,
      cnpj: dto.cnpj,
      endereco: dto.endereco,
    });

    // Associar o endereco persistido ao domínio (Campus.create não atribui endereco)
    domain.endereco = { id: endereco.id as string } as ICampus["endereco"];

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: domain.id });

    ensureExists(result, Campus.entityName, domain.id);

    return result;
  }
}
