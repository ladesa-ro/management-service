import { BaseDatedEntity } from "@/modules/@shared";
import type { IBloco } from "@/modules/bloco";
import type { IAmbiente, IAmbienteCreate, IAmbienteUpdate } from "./ambiente.types";

/**
 * Entidade de Domínio: Ambiente
 * Implementa a tipagem IAmbiente e adiciona regras de negócio
 */
export class Ambiente extends BaseDatedEntity implements IAmbiente {
  nome!: string;
  descricao!: string | null;
  codigo!: string;
  capacidade!: number | null;
  tipo!: string | null;
  bloco!: IBloco;
  imagemCapa!: { id: string } | null;

  protected static get entityName(): string {
    return "Ambiente";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Ambiente.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.codigo, "codigo");
    rules.minLength(this.codigo, "codigo", 1);
    Ambiente.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Ambiente
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IAmbienteCreate): Ambiente {
    const instance = new Ambiente();
    instance.nome = dados.nome?.trim() ?? "";
    instance.codigo = dados.codigo?.trim() ?? "";
    instance.descricao = dados.descricao?.trim() || null;
    instance.capacidade = dados.capacidade ?? null;
    instance.tipo = dados.tipo?.trim() || null;
    instance.imagemCapa = null;
    instance.initDates();
    instance.validar();

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
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }

    if (dados.codigo !== undefined) {
      this.codigo = dados.codigo?.trim() ?? "";
    }

    if (dados.descricao !== undefined) {
      this.descricao = dados.descricao?.trim() || null;
    }

    if (dados.capacidade !== undefined) {
      this.capacidade = dados.capacidade;
    }

    if (dados.tipo !== undefined) {
      this.tipo = dados.tipo?.trim() || null;
    }

    this.touchUpdated();
    this.validar();
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
