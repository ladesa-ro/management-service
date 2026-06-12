import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  type EnderecoDeleteCommand,
  IEnderecoDeleteCommandHandler,
} from "@/modules/localidades/endereco/domain/commands";
import { Endereco } from "@/modules/localidades/endereco/domain/endereco";
import { IEnderecoRepository } from "@/modules/localidades/endereco/domain/repositories";

@Impl()
export class EnderecoDeleteCommandHandlerImpl implements IEnderecoDeleteCommandHandler {
  constructor(
    @Dep(IEnderecoRepository)
    private readonly repository: IEnderecoRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: EnderecoDeleteCommand,
  ): Promise<boolean> {
    const exists = await this.repository.exists(command.id);
    ensureExists(exists, Endereco.entityName, command.id);
    await this.repository.softDeleteById(command.id);
    return true;
  }
}
