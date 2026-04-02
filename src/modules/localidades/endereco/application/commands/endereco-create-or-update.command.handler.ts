import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import {
  type IEnderecoCreateOrUpdateCommand,
  IEnderecoCreateOrUpdateCommandHandler,
} from "@/modules/localidades/endereco/domain/commands/endereco-create-or-update.command.handler.interface";
import { Endereco } from "../../domain/endereco";
import { IEnderecoRepository } from "../../domain/repositories";

@Impl()
export class EnderecoCreateOrUpdateCommandHandlerImpl
  implements IEnderecoCreateOrUpdateCommandHandler
{
  constructor(
    @Dep(IEnderecoRepository)
    private readonly repository: IEnderecoRepository,
  ) {}

  async execute(
    _accessContext: IAccessContext | null,
    { id, dto }: IEnderecoCreateOrUpdateCommand,
  ): Promise<{ id: string | number }> {
    if (id) {
      const current = await this.repository.loadById(id);

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
