import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { ensureExists } from "@/modules/@shared";
import { Campus } from "@/modules/ambientes/campus/domain/campus.domain";
import {
  type ICampusCreateCommand,
  ICampusCreateCommandHandler,
} from "@/modules/ambientes/campus/domain/commands/campus-create.command.handler.interface";
import { IEnderecoCreateOrUpdateCommandHandler } from "@/modules/localidades/endereco/domain/commands/endereco-create-or-update.command.handler.interface";
import { ICampusPermissionChecker } from "../../domain/authorization";
import type { CampusFindOneQueryResult } from "../../domain/queries";
import { ICampusRepository } from "../../domain/repositories";

@DeclareImplementation()
export class CampusCreateCommandHandlerImpl implements ICampusCreateCommandHandler {
  constructor(
    @DeclareDependency(ICampusRepository)
    private readonly repository: ICampusRepository,
    @DeclareDependency(ICampusPermissionChecker)
    private readonly permissionChecker: ICampusPermissionChecker,
    @DeclareDependency(IEnderecoCreateOrUpdateCommandHandler)
    private readonly enderecoCreateOrUpdateHandler: IEnderecoCreateOrUpdateCommandHandler,
  ) {}

  async execute({ accessContext, dto }: ICampusCreateCommand): Promise<CampusFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    const endereco = await this.enderecoCreateOrUpdateHandler.execute({
      id: null,
      dto: dto.endereco,
    });
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

    ensureExists(result, Campus.entityName, id);

    return result;
  }
}
