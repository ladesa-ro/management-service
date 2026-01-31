import { BaseEntity, type ScalarDateTimeString } from "@/core/@shared";
import type { IEndereco } from "@/core/endereco";
import type { ICampus, ICampusCreate } from "./campus.types";

/**
 * Entidade de Domínio: Campus
 * Implementa a tipagem ICampus e adiciona regras de negócio
 */
export class Campus extends BaseEntity implements ICampus {
  id!: string;
  nomeFantasia!: string;
  razaoSocial!: string;
  apelido!: string;
  cnpj!: string;
  endereco!: IEndereco;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Cria uma nova instância válida de Campus
   * @throws Error se os dados forem inválidos
   */
  static criar(dados: ICampusCreate): Campus {
    const instance = new Campus();

    if (!dados.nomeFantasia || dados.nomeFantasia.trim().length === 0) {
      throw new Error("Nome fantasia é obrigatório");
    }

    if (!dados.razaoSocial || dados.razaoSocial.trim().length === 0) {
      throw new Error("Razão social é obrigatória");
    }

    instance.nomeFantasia = dados.nomeFantasia.trim();
    instance.razaoSocial = dados.razaoSocial.trim();
    instance.apelido = dados.apelido?.trim() || "";
    instance.cnpj = dados.cnpj;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: ICampus): Campus {
    const instance = new Campus();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos específicos do domínio Campus
  // ========================================

  /**
   * Valida se o CNPJ tem formato válido (apenas números, 14 dígitos)
   */
  isCnpjValido(): boolean {
    const cnpjLimpo = this.cnpj.replace(/\D/g, "");
    return /^\d{14}$/.test(cnpjLimpo);
  }
}
