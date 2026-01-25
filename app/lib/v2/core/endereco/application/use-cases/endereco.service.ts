import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import { AccessContext } from "@/infrastructure/access-context";
import type {
  EnderecoFindOneInputDto,
  EnderecoFindOneOutputDto,
  EnderecoInputDto,
} from "@/v2/adapters/in/http/endereco/dto";
import type { IEnderecoRepositoryPort, IEnderecoUseCasePort } from "../ports";

/**
 * Service centralizado para o módulo Endereco.
 * Implementa todos os use cases definidos em IEnderecoUseCasePort.
 *
 * Por enquanto, toda a lógica fica aqui. Futuramente, pode ser
 * desmembrado em use cases individuais se necessário.
 */
@Injectable()
export class EnderecoService implements IEnderecoUseCasePort {
  constructor(
    @Inject("IEnderecoRepositoryPort")
    private readonly enderecoRepository: IEnderecoRepositoryPort,
  ) {}

  async internalFindOneById(id: string): Promise<EnderecoFindOneOutputDto | null> {
    return this.enderecoRepository.findOneById(id);
  }

  async internalFindOneByIdStrict(id: string): Promise<EnderecoFindOneOutputDto> {
    const endereco = await this.enderecoRepository.findOneById(id);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }

  async internalEnderecoCreateOrUpdate(id: string | null, dto: EnderecoInputDto) {
    const endereco = this.enderecoRepository.create();

    if (id) {
      const exists = await this.enderecoRepository.exists(id);

      if (exists) {
        endereco.id = id;
      }
    }

    const enderecoInputDto = <EnderecoInputDto>{
      ...pick(dto, ["cep", "logradouro", "numero", "bairro", "complemento", "pontoReferencia"]),

      cidade: {
        id: dto.cidade.id,
      },
    };

    this.enderecoRepository.merge(endereco, enderecoInputDto);

    await this.enderecoRepository.save(endereco);

    return endereco;
  }

  async findById(
    accessContext: AccessContext,
    dto: EnderecoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EnderecoFindOneOutputDto | null> {
    return this.enderecoRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
    requestContext: AccessContext,
    dto: EnderecoFindOneInputDto,
  ): Promise<EnderecoFindOneOutputDto> {
    const endereco = await this.enderecoRepository.findById(requestContext, dto);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }
}
