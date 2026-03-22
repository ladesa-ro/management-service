import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  type IEnderecoCreateOrUpdateCommand,
  IEnderecoCreateOrUpdateCommandHandler,
} from "@/modules/localidades/endereco/domain/commands/endereco-create-or-update.command.handler.interface";
import type { AccessContext } from "@/server/access-context";
import { Endereco } from "../../domain/endereco";
import { IEnderecoRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EnderecoCreateOrUpdateCommandHandlerImpl
  implements IEnderecoCreateOrUpdateCommandHandler
{
  constructor(
    @DeclareDependency(IEnderecoRepository)
    private readonly repository: IEnderecoRepository,
  ) {}

  async execute(
    _accessContext: AccessContext | null,
    { id, dto }: IEnderecoCreateOrUpdateCommand,
  ): Promise<{ id: string | number }> {
    if (id) {
      const current = await this.repository.findOneById(id);

      if (current) {
        const domain = Endereco.load(current);
        domain.update({
          cep: dto.cep,
          logradouro: dto.logradouro,
          numero: dto.numero,
          bairro: dto.bairro,
          complemento: dto.complemento,
          pontoReferencia: dto.pontoReferencia,
        });
        await this.repository.update(id, { ...domain, cidade: { id: dto.cidade.id } });
        return { id };
      }
    }

    const domain = Endereco.create({
      cep: dto.cep,
      logradouro: dto.logradouro,
      numero: dto.numero,
      bairro: dto.bairro,
      complemento: dto.complemento,
      pontoReferencia: dto.pontoReferencia,
      cidade: { id: dto.cidade.id },
    });

    return this.repository.create({ ...domain, cidade: { id: dto.cidade.id } });
  }
}
