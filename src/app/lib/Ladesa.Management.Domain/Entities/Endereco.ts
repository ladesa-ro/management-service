import type { IdNumeric } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { EnderecoCreateDto } from "@/Ladesa.Management.Domain/Dtos/EnderecoCreateDto";
import type { EnderecoUpdateDto } from "@/Ladesa.Management.Domain/Dtos/EnderecoUpdateDto";

/**
 * Entidade de Domínio: Endereco
 * Implementa a tipagem IEndereco e adiciona regras de negócio
 */
export class Endereco extends BaseDatedEntity {
  private constructor(
    public cep: string,
    public logradouro: string,
    public numero: number,
    public bairro: string,
    public complemento: string | null,
    public pontoReferencia: string | null,
    public cidadeId: IdNumeric,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Endereco";
  }

  static criar(dados: EnderecoCreateDto): Endereco {
    const instance = new Endereco(
      dados.cep?.trim() ?? "",
      dados.logradouro?.trim() ?? "",
      dados.numero ?? 0,
      dados.bairro?.trim() ?? "",
      dados.complemento?.trim() || null,
      dados.pontoReferencia?.trim() || null,
      dados.cidade.id,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Endereco): Endereco {
    const instance = new Endereco(
      data.cep,
      data.logradouro,
      data.numero,
      data.bairro,
      data.complemento,
      data.pontoReferencia,
      data.cidadeId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

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

  atualizar(dados: EnderecoUpdateDto): void {
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

  getEnderecoFormatado(): string {
    const partes = [
      this.logradouro,
      this.numero.toString(),
      this.complemento,
      this.bairro,
      this.cep,
    ].filter(Boolean);

    return partes.join(", ");
  }

  isCepValido(): boolean {
    const cepLimpo = this.cep.replace(/\D/g, "");
    return /^\d{8}$/.test(cepLimpo);
  }
}
