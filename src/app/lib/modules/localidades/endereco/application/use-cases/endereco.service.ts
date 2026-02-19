import { Inject, Injectable } from "@nestjs/common";
import type {
  EnderecoFindOneInputDto,
  EnderecoFindOneOutputDto,
  EnderecoInputDto,
} from "@/modules/localidades/endereco/application/dtos";
import {
  ENDERECO_REPOSITORY_PORT,
  type IEnderecoRepositoryPort,
  type IEnderecoUseCasePort,
} from "@/modules/localidades/endereco/application/ports";
import type { AccessContext } from "@/modules/@core/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";

@Injectable()
export class EnderecoService implements IEnderecoUseCasePort {
  constructor(
    @Inject(ENDERECO_REPOSITORY_PORT)
    private readonly enderecoRepository: IEnderecoRepositoryPort,
  ) {}

  async internalFindOneById(id: string): Promise<EnderecoFindOneOutputDto | null> {
    return this.enderecoRepository.findOneById(id);
  }

  async internalFindOneByIdStrict(id: string): Promise<EnderecoFindOneOutputDto> {
    const endereco = await this.enderecoRepository.findOneById(id);

    if (!endereco) {
      throw new ResourceNotFoundError("Endereco", id);
    }

    return endereco;
  }

  async internalEnderecoCreateOrUpdate(
    id: string | null,
    dto: EnderecoInputDto,
  ): Promise<{ id: string | number }> {
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
      const exists = await this.enderecoRepository.exists(id);

      if (exists) {
        await this.enderecoRepository.updateFromDomain(id, data);
        return { id };
      }
    }

    return this.enderecoRepository.createFromDomain(data);
  }

  async findById(
    accessContext: AccessContext | null,
    dto: EnderecoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EnderecoFindOneOutputDto | null> {
    return this.enderecoRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: EnderecoFindOneInputDto,
  ): Promise<EnderecoFindOneOutputDto> {
    const endereco = await this.enderecoRepository.findById(accessContext, dto);

    if (!endereco) {
      throw new ResourceNotFoundError("Endereco", dto.id);
    }

    return endereco;
  }
}
