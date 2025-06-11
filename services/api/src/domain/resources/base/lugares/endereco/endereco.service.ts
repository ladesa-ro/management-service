import { QbEfficientLoad } from "@/application/standards";
import { ensureValidResult, makeValidatorForEntity } from "@/application/standards/especificacao/business-logic/Validation/ajv-validate";
import { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/infrastructure/integrations";
import { Injectable, NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import type * as IDomainContracts from "~domain.contracts";

// ============================================================================

const aliasEndereco = "endereco";

// ============================================================================

@Injectable()
export class EnderecoService {
  constructor(private databaseContext: DatabaseContextService) {}

  //

  get enderecoRepository() {
    return this.databaseContext.enderecoRepository;
  }

  //

  async internalFindOneById(id: IDomainContracts.Endereco["id"]) {
    const endereco = await this.enderecoRepository.findOne({
      where: {
        id: id,
      },
    });

    return endereco;
  }

  async internalFindOneByIdStrict(id: IDomainContracts.Endereco["id"]) {
    const endereco = await this.internalFindOneById(id);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }

  async internalEnderecoCreateOrUpdate(id: IDomainContracts.Endereco["id"] | null, payload: IDomainContracts.EnderecoInput) {
    const enderecoInputValidator = await makeValidatorForEntity<IDomainContracts.EnderecoInput>(IDomainContracts.Tokens.EnderecoInputView);

    const result = await enderecoInputValidator(payload);

    const dto = ensureValidResult(result);

    const endereco = this.enderecoRepository.create();

    if (id) {
      const exists = await this.enderecoRepository.exists({ where: { id } });

      if (exists) {
        endereco.id = id;
      }
    }

    const enderecoInputDto = {
      ...pick(dto, ["cep", "logradouro", "numero", "bairro", "complemento", "pontoReferencia"]),

      cidade: {
        id: dto.cidade.id,
      },
    } as IDomainContracts.EnderecoInput;

    this.enderecoRepository.merge(endereco, enderecoInputDto);

    await this.enderecoRepository.save(endereco);

    return endereco;
  }

  //

  async findById(accessContext: AccessContext, dto: IDomainContracts.EnderecoFindOneInputView, selection?: string[] | boolean): Promise<IDomainContracts.EnderecoFindOneResultView | null> {
    const qb = this.enderecoRepository.createQueryBuilder(aliasEndereco);

    // =========================================================

    await accessContext.applyFilter("endereco:find", qb, aliasEndereco, null);

    // =========================================================

    qb.andWhere(`${aliasEndereco}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(IDomainContracts.Tokens.EnderecoFindOneResultView, qb, aliasEndereco, selection);

    // =========================================================

    const endereco = await qb.getOne();

    // =========================================================

    return endereco;
  }

  async findByIdStrict(requestContext: AccessContext, dto: IDomainContracts.EnderecoFindOneInputView) {
    const endereco = await this.findById(requestContext, dto);

    if (!endereco) {
      throw new NotFoundException();
    }

    return endereco;
  }
}
