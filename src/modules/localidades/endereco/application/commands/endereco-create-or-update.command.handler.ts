import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IEnderecoCreateOrUpdateCommand,
  IEnderecoCreateOrUpdateCommandHandler,
} from "@/modules/localidades/endereco/domain/commands/endereco-create-or-update.command.handler.interface";
import { IEnderecoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EnderecoCreateOrUpdateCommandHandlerImpl
  implements IEnderecoCreateOrUpdateCommandHandler
{
  constructor(
    @DeclareDependency(IEnderecoRepository)
    private readonly repository: IEnderecoRepository,
  ) {}

  async execute({ id, dto }: IEnderecoCreateOrUpdateCommand): Promise<{ id: string | number }> {
    const data = {
      cep: dto.cep,
      logradouro: dto.logradouro,
      numero: dto.numero,
      bairro: dto.bairro,
      complemento: dto.complemento,
      pontoReferencia: dto.pontoReferencia,
      cidade: { id: dto.cidade.id },
    };

    if (id) {
      const exists = await this.repository.exists(id);

      if (exists) {
        await this.repository.updateFromDomain(id, data);
        return { id };
      }
    }

    return this.repository.createFromDomain(data);
  }
}
