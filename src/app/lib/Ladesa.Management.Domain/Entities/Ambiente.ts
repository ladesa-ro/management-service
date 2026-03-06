import type { IdUuid, IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { IBloco } from "@/Ladesa.Management.Application/ambientes/bloco";
import type { AmbienteCreateDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteCreateDto";
import type { AmbienteUpdateDto } from "@/Ladesa.Management.Domain/Dtos/AmbienteUpdateDto";

/**
 * Tipagem da entidade Ambiente
 * Define a estrutura de dados sem comportamento
 */
export interface IAmbiente extends IEntityBase {
  /** Nome do ambiente */
  nome: string;

  /** Descrição do ambiente (opcional) */
  descricao: string | null;

  /** Código identificador do ambiente */
  codigo: string;

  /** Capacidade de pessoas do ambiente (opcional) */
  capacidade: number | null;

  /** Tipo do ambiente (sala, laboratório, etc.) */
  tipo: string | null;

  /** Bloco ao qual o ambiente pertence */
  bloco: IBloco;

  /** Imagem de capa do ambiente (opcional) */
  imagemCapa: { id: IdUuid } | null;
}

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

  /**
   * Cria uma nova instância válida de Ambiente
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: AmbienteCreateDto): Ambiente {
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

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Ambiente {
    const instance = new Ambiente();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = Ambiente.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.codigo, "codigo");
    rules.minLength(this.codigo, "codigo", 1);
    Ambiente.throwIfInvalid(result);
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do ambiente
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: AmbienteUpdateDto): void {
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
