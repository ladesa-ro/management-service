import type { IImagem } from "@/modules/@base/armazenamento/imagem/domain/imagem.types";
import { BaseDatedEntity } from "@/modules/@shared";
import type { IAmbiente } from "@/modules/ambientes/ambiente/domain/ambiente.types";
import type { ICurso } from "@/modules/ensino/curso";
import type { ITurma, ITurmaCreate, ITurmaUpdate } from "./turma.types";

/**
 * Entidade de Domínio: Turma
 * Implementa a tipagem ITurma e adiciona regras de negócio
 */
export class Turma extends BaseDatedEntity implements ITurma {
  periodo!: string;
  ambientePadraoAula!: IAmbiente | null;
  curso!: ICurso;
  imagemCapa!: IImagem | null;

  protected static get entityName(): string {
    return "Turma";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Turma.createValidation();
    rules.required(this.periodo, "periodo");
    rules.minLength(this.periodo, "periodo", 1);
    Turma.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Turma
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: ITurmaCreate): Turma {
    const instance = new Turma();
    instance.periodo = dados.periodo;
    instance.ambientePadraoAula = null;
    instance.imagemCapa = null;

    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Turma {
    const instance = new Turma();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da turma
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: ITurmaUpdate): void {
    if (dados.periodo !== undefined) {
      this.periodo = dados.periodo;
    }

    this.touchUpdated();
    this.validar();
  }

  // ========================================
  // Métodos específicos do domínio Turma
  // ========================================

  /**
   * Verifica se tem ambiente padrão de aula
   */
  temAmbientePadraoAula(): boolean {
    return this.ambientePadraoAula !== null;
  }

  /**
   * Verifica se tem imagem de capa
   */
  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }
}
