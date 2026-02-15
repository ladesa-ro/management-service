import { BaseDatedEntity } from "@/modules/@shared";
import type { ICidade } from "@/modules/base/localidades/cidade";
import type { IEndereco, IEnderecoCreate, IEnderecoUpdate } from "./endereco.types";

/**
 * Entidade de Domínio: Endereco
 * Implementa a tipagem IEndereco e adiciona regras de negócio
 */
export class Endereco extends BaseDatedEntity implements IEndereco {
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  complemento!: string | null;
  pontoReferencia!: string | null;
  cidade!: ICidade;

  protected static get entityName(): string {
    return "Endereco";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Endereco.createValidation();
    rules.required(this.cep, "cep");
    rules.required(this.logradouro, "logradouro");
    rules.minLength(this.logradouro, "logradouro", 1);
    rules.requiredNumber(this.numero, "numero");
    rules.required(this.bairro, "bairro");
    rules.minLength(this.bairro, "bairro", 1);
    Endereco.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Endereco
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IEnderecoCreate): Endereco {
    const instance = new Endereco();
    instance.cep = dados.cep?.trim() ?? "";
    instance.logradouro = dados.logradouro?.trim() ?? "";
    instance.numero = dados.numero ?? 0;
    instance.bairro = dados.bairro?.trim() ?? "";
    instance.complemento = dados.complemento?.trim() || null;
    instance.pontoReferencia = dados.pontoReferencia?.trim() || null;
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Endereco {
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
    if (dados.cep !== undefined) {
      this.cep = dados.cep?.trim() ?? "";
    }

    if (dados.logradouro !== undefined) {
      this.logradouro = dados.logradouro?.trim() ?? "";
    }

    if (dados.numero !== undefined) {
      this.numero = dados.numero ?? 0;
    }

    if (dados.bairro !== undefined) {
      this.bairro = dados.bairro?.trim() ?? "";
    }

    if (dados.complemento !== undefined) {
      this.complemento = dados.complemento?.trim() || null;
    }

    if (dados.pontoReferencia !== undefined) {
      this.pontoReferencia = dados.pontoReferencia?.trim() || null;
    }

    this.touchUpdated();
    this.validar();
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
