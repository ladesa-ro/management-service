import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import { AccessContext } from "@/infrastructure/access-context";
import type {
  EnderecoFindOneInputDto,
  EnderecoFindOneOutputDto,
  EnderecoInputDto,
} from "@/v2/adapters/in/http/endereco/dto";
import type { IEnderecoRepositoryPort } from "../ports";

@Injectable()
export class EnderecoService {
  constructor(
    @Inject("IEnderecoRepositoryPort")
    private enderecoRepository: IEnderecoRepositoryPort,
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
