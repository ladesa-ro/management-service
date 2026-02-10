import { BaseDatedEntity } from "@/modules/@shared";
import type { IImagem } from "@/modules/imagem/domain/imagem.types";
import type { IDisciplina, IDisciplinaCreate, IDisciplinaUpdate } from "./disciplina.types";

/**
 * Entidade de Domínio: Disciplina
 * Implementa a tipagem IDisciplina e adiciona regras de negócio
 */
export class Disciplina extends BaseDatedEntity implements IDisciplina {
  nome!: string;
  nomeAbreviado!: string;
  cargaHoraria!: number;
  imagemCapa!: IImagem | null;

  protected static get entityName(): string {
    return "Disciplina";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Disciplina.createValidation();
    rules.required(this.nome, "nome");
    rules.minLength(this.nome, "nome", 1);
    rules.required(this.nomeAbreviado, "nomeAbreviado");
    rules.minLength(this.nomeAbreviado, "nomeAbreviado", 1);
    rules.requiredNumber(this.cargaHoraria, "cargaHoraria");
    rules.min(this.cargaHoraria, "cargaHoraria", 1);
    Disciplina.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Disciplina
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IDisciplinaCreate): Disciplina {
    const instance = new Disciplina();
    instance.nome = dados.nome?.trim() ?? "";
    instance.nomeAbreviado = dados.nomeAbreviado?.trim() ?? "";
    instance.cargaHoraria = dados.cargaHoraria ?? 0;
    instance.imagemCapa = null;
    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Disciplina {
    const instance = new Disciplina();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da disciplina
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IDisciplinaUpdate): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() ?? "";
    }

    if (dados.nomeAbreviado !== undefined) {
      this.nomeAbreviado = dados.nomeAbreviado?.trim() ?? "";
    }

    if (dados.cargaHoraria !== undefined) {
      this.cargaHoraria = dados.cargaHoraria ?? 0;
    }

    this.touchUpdated();
    this.validar();
  }

  // ========================================
  // Métodos específicos do domínio Disciplina
  // ========================================

  /**
   * Verifica se tem imagem de capa
   */
  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }

  /**
   * Verifica se a carga horária é válida
   */
  temCargaHorariaValida(): boolean {
    return this.cargaHoraria > 0;
  }
}
