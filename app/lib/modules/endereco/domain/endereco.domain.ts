import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { ICidade } from "@/modules/cidade";
import type { IEndereco, IEnderecoCreate, IEnderecoUpdate } from "./endereco.types";

/**
 * Entidade de Domínio: Endereco
 * Implementa a tipagem IEndereco e adiciona regras de negócio
 */
export class Endereco extends BaseEntity implements IEndereco {
  id!: IdUuid;
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  complemento!: string | null;
  pontoReferencia!: string | null;
  cidade!: ICidade;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Endereco";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Endereco
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IEnderecoCreate): Endereco {
    const { result, rules } = this.createValidation();

    const instance = new Endereco();
    instance.cep = rules.required(dados.cep, "cep");
    instance.logradouro = rules.required(dados.logradouro, "logradouro");
    instance.numero = rules.requiredNumber(dados.numero, "numero");
    instance.bairro = rules.required(dados.bairro, "bairro");

    this.throwIfInvalid(result);

    instance.complemento = rules.optional(dados.complemento);
    instance.pontoReferencia = rules.optional(dados.pontoReferencia);
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IEndereco): Endereco {
    const instance = new Endereco();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do endereço
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IEnderecoUpdate): void {
    const { result, rules } = Endereco.createValidation();

    if (dados.cep !== undefined) {
      this.cep = rules.required(dados.cep, "cep");
    }

    if (dados.logradouro !== undefined) {
      this.logradouro = rules.required(dados.logradouro, "logradouro");
    }

    if (dados.numero !== undefined) {
      this.numero = rules.requiredNumber(dados.numero, "numero");
    }

    if (dados.bairro !== undefined) {
      this.bairro = rules.required(dados.bairro, "bairro");
    }

    if (dados.complemento !== undefined) {
      this.complemento = rules.optional(dados.complemento);
    }

    if (dados.pontoReferencia !== undefined) {
      this.pontoReferencia = rules.optional(dados.pontoReferencia);
    }

    Endereco.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }

  // ========================================
  // Métodos específicos do domínio
  // ========================================

  getEnderecoFormatado(): string {
    const partes = [
      this.logradouro,
      this.numero.toString(),
      this.complemento,
      this.bairro,
      this.cidade?.nome,
      this.cidade?.estado?.sigla,
      this.cep,
    ].filter(Boolean);

    return partes.join(", ");
  }

  isCepValido(): boolean {
    const cepLimpo = this.cep.replace(/\D/g, "");
    return /^\d{8}$/.test(cepLimpo);
  }
}
