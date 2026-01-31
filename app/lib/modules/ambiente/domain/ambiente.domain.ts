import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { IBloco } from "@/modules/bloco";
import type { IAmbiente, IAmbienteCreate, IAmbienteUpdate } from "./ambiente.types";

/**
 * Entidade de Domínio: Ambiente
 * Implementa a tipagem IAmbiente e adiciona regras de negócio
 */
export class Ambiente extends BaseEntity implements IAmbiente {
  id!: IdUuid;
  nome!: string;
  descricao!: string | null;
  codigo!: string;
  capacidade!: number | null;
  tipo!: string | null;
  bloco!: IBloco;
  imagemCapa!: { id: string } | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Ambiente";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Ambiente
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IAmbienteCreate): Ambiente {
    const { result, rules } = this.createValidation();

    const instance = new Ambiente();
    instance.nome = rules.required(dados.nome, "nome");
    instance.nome = rules.minLength(instance.nome, "nome", 1);

    instance.codigo = rules.required(dados.codigo, "codigo");
    instance.codigo = rules.minLength(instance.codigo, "codigo", 1);

    this.throwIfInvalid(result);

    instance.descricao = rules.optional(dados.descricao);
    instance.capacidade = dados.capacidade ?? null;
    instance.tipo = rules.optional(dados.tipo);
    instance.imagemCapa = null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IAmbiente): Ambiente {
    const instance = new Ambiente();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do ambiente
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IAmbienteUpdate): void {
    const { result, rules } = Ambiente.createValidation();

    if (dados.nome !== undefined) {
      this.nome = rules.required(dados.nome, "nome");
      this.nome = rules.minLength(this.nome, "nome", 1);
    }

    if (dados.codigo !== undefined) {
      this.codigo = rules.required(dados.codigo, "codigo");
      this.codigo = rules.minLength(this.codigo, "codigo", 1);
    }

    if (dados.descricao !== undefined) {
      this.descricao = rules.optional(dados.descricao);
    }

    if (dados.capacidade !== undefined) {
      this.capacidade = dados.capacidade;
    }

    if (dados.tipo !== undefined) {
      this.tipo = rules.optional(dados.tipo);
    }

    Ambiente.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }

  // ========================================
  // Métodos específicos do domínio Ambiente
  // ========================================

  /**
   * Verifica se o ambiente tem imagem de capa
   */
  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }

  /**
   * Verifica se o ambiente tem capacidade definida
   */
  temCapacidade(): boolean {
    return this.capacidade !== null && this.capacidade > 0;
  }
}
