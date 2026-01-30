import { Inject, Injectable } from "@nestjs/common";
import { pick } from "lodash";
import { ResourceNotFoundError } from "@/core/@shared";
import type {
  EnderecoFindOneInput,
  EnderecoFindOneOutput,
  EnderecoInputDto,
} from "@/core/endereco/application/dtos";
import {
  ENDERECO_REPOSITORY_PORT,
  type IEnderecoRepositoryPort,
  type IEnderecoUseCasePort,
} from "@/core/endereco/application/ports";
import type { EnderecoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class EnderecoService implements IEnderecoUseCasePort {
  constructor(
    @Inject(ENDERECO_REPOSITORY_PORT)
    private readonly enderecoRepository: IEnderecoRepositoryPort,
  ) {}

  async internalFindOneById(id: string): Promise<EnderecoFindOneOutput | null> {
    return this.enderecoRepository.findOneById(id);
  }

  async internalFindOneByIdStrict(id: string): Promise<EnderecoFindOneOutput> {
    const endereco = await this.enderecoRepository.findOneById(id);

    if (!endereco) {
      throw new ResourceNotFoundError("Endereco", id);
    }

    return endereco;
  }

  async internalEnderecoCreateOrUpdate(id: string | null, dto: EnderecoInputDto): Promise<EnderecoEntity> {
    const endereco = this.enderecoRepository.create();

    if (id) {
      const exists = await this.enderecoRepository.exists(id);

      if (exists) {
        endereco.id = id;
      }
    }

    const enderecoInputDto: EnderecoInputDto = {
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
    accessContext: AccessContext | null,
    dto: EnderecoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<EnderecoFindOneOutput | null> {
    return this.enderecoRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: EnderecoFindOneInput,
  ): Promise<EnderecoFindOneOutput> {
    const endereco = await this.enderecoRepository.findById(accessContext, dto);

    if (!endereco) {
      throw new ResourceNotFoundError("Endereco", dto.id);
    }

    return endereco;
  }
}
