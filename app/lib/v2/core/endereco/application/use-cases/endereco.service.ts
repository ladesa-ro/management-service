import { Injectable, NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/infrastructure/integrations";
import { QbEfficientLoad } from "@/shared";
import type { EnderecoFindOneInputDto, EnderecoFindOneOutputDto, EnderecoInputDto, } from "../dto";

// ============================================================================

const aliasEndereco = "endereco";

// ============================================================================

@Injectable()
export class EnderecoService {
  constructor(private databaseContext: DatabaseContextService) {}

  get enderecoRepository() {
    return this.databaseContext.enderecoRepository;
  }

  async internalFindOneById(id: string): Promise<EnderecoFindOneOutputDto | null> {
    const endereco = await this.enderecoRepository.findOne({
      where: {
        id: id,
      },
    });

    return endereco as EnderecoFindOneOutputDto | null;
  }

  async internalFindOneByIdStrict(id: string): Promise<EnderecoFindOneOutputDto> {
    const endereco = await this.internalFindOneById(id);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }

  async internalEnderecoCreateOrUpdate(id: string | null, dto: EnderecoInputDto) {
    const endereco = this.enderecoRepository.create();

    if (id) {
      const exists = await this.enderecoRepository.exists({ where: { id } });

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

  async findById(accessContext: AccessContext, dto: EnderecoFindOneInputDto, selection?: string[] | boolean): Promise<EnderecoFindOneOutputDto | null> {
    const qb = this.enderecoRepository.createQueryBuilder(aliasEndereco);

    // =========================================================

    await accessContext.applyFilter("endereco:find", qb, aliasEndereco, null);

    // =========================================================

    qb.andWhere(`${aliasEndereco}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("EnderecoFindOneOutput", qb, aliasEndereco, selection);

    // =========================================================

    const endereco = await qb.getOne();

    // =========================================================

    return endereco as EnderecoFindOneOutputDto | null;
  }

  async findByIdStrict(requestContext: AccessContext, dto: EnderecoFindOneInputDto): Promise<EnderecoFindOneOutputDto> {
    const endereco = await this.findById(requestContext, dto);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }
}
