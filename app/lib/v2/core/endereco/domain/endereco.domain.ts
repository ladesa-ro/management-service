import type { ICidade } from "@/core/cidade";
import type { IEndereco } from "./endereco.types";

/**
 * Entidade de Domínio: Endereco
 * Implementa a tipagem IEndereco e adiciona regras de negócio
 */
export class Endereco implements IEndereco {
  id!: string;
  cep!: string;
  logradouro!: string;
  numero!: number;
  bairro!: string;
  complemento!: string | null;
  pontoReferencia!: string | null;
  cidade!: ICidade;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IEndereco): Endereco {
    const instance = new Endereco();
    Object.assign(instance, dados);
    return instance;
  }

  /**
   * Valida se o endereço está ativo (não deletado)
   */
  isAtivo(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Retorna o endereço formatado
   */
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

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Valida se o CEP tem formato válido (apenas números, 8 dígitos)
   */
  isCepValido(): boolean {
    const cepLimpo = this.cep.replace(/\D/g, "");
    return /^\d{8}$/.test(cepLimpo);
  }
}
