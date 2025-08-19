import { Injectable, NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import { QbEfficientLoad } from "@/contracts";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import { AccessContext } from "@/shared/infrastructure/access-context";
import { DatabaseContextService } from "@/shared/infrastructure/integrations";

// ============================================================================

const aliasEndereco = "endereco";

// ============================================================================

@Injectable()
export class EnderecoService {
  constructor(private databaseContext: DatabaseContextService) {}

  get enderecoRepository() {
    return this.databaseContext.enderecoRepository;
  }

  async internalFindOneById(id: IDomain.Endereco["id"]) {
    const endereco = await this.enderecoRepository.findOne({
      where: {
        id: id,
      },
    });

    return endereco;
  }

  async internalFindOneByIdStrict(id: IDomain.Endereco["id"]) {
    const endereco = await this.internalFindOneById(id);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }

  async internalEnderecoCreateOrUpdate(id: IDomain.Endereco["id"] | null, domain: IDomain.EnderecoInput) {
    const endereco = this.enderecoRepository.create();

    if (id) {
      const exists = await this.enderecoRepository.exists({ where: { id } });

      if (exists) {
        endereco.id = id;
      }
    }

    const enderecoInputDto = <IDomain.EnderecoInput>{
      ...pick(domain, ["cep", "logradouro", "numero", "bairro", "complemento", "pontoReferencia"]),

      cidade: {
        id: domain.cidade.id,
      },
    };

    this.enderecoRepository.merge(endereco, enderecoInputDto);

    await this.enderecoRepository.save(endereco);

    return endereco;
  }

  async findById(accessContext: AccessContext, domain: IDomain.EnderecoFindOneInput, selection?: string[] | boolean): Promise<IDomain.EnderecoFindOneOutput | null> {
    const qb = this.enderecoRepository.createQueryBuilder(aliasEndereco);

    // =========================================================

    await accessContext.applyFilter("endereco:find", qb, aliasEndereco, null);

    // =========================================================

    qb.andWhere(`${aliasEndereco}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("EnderecoFindOneOutput", qb, aliasEndereco, selection);

    // =========================================================

    const endereco = await qb.getOne();

    // =========================================================

    return endereco;
  }

  async findByIdStrict(requestContext: AccessContext, domain: IDomain.EnderecoFindOneInput) {
    const endereco = await this.findById(requestContext, domain);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }
}
