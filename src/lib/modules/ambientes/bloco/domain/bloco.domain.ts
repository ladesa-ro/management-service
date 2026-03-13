import { BaseDatedEntity } from "@/modules/@shared";
import type { ICampus } from "@/modules/ambientes/campus";
import type { IBloco, IBlocoCreate, IBlocoUpdate } from "./bloco.types";

/**
 * Entidade de Domínio: Bloco
 * Implementa a tipagem IBloco e adiciona regras de negócio
 */
export class Bloco extends BaseDatedEntity implements IBloco {
  nome!: string;
  codigo!: string;
  campus!: ICampus;
  imagemCapa!: { id: string } | null;

  protected static get entityName(): string {
    return "Bloco";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Bloco.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.codigo, "codigo");
    rules.minLength(this.codigo, "codigo", 1);
    Bloco.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Bloco
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IBlocoCreate): Bloco {
    const instance = new Bloco();
    instance.nome = dados.nome?.trim() ?? "";
    instance.codigo = dados.codigo?.trim() ?? "";
    instance.imagemCapa = null;
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Bloco {
    const instance = new Bloco();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do bloco
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IBlocoUpdate): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }

    if (dados.codigo !== undefined) {
      this.codigo = dados.codigo?.trim() ?? "";
    }

    this.touchUpdated();
    this.validar();
  }

  // ========================================
  // Métodos específicos do domínio Bloco
  // ========================================

  /**
   * Verifica se o bloco tem imagem de capa
   */
  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }
}
