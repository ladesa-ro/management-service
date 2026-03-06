import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ICurso } from "@/Ladesa.Management.Application/ensino/curso";
import type { TurmaCreateDto } from "@/Ladesa.Management.Domain/Dtos/TurmaCreateDto";
import type { TurmaUpdateDto } from "@/Ladesa.Management.Domain/Dtos/TurmaUpdateDto";
import type { IAmbiente } from "@/Ladesa.Management.Domain/Entities/Ambiente";
import type { IImagem } from "@/Ladesa.Management.Domain/Entities/Imagem";

/**
 * Interface que define a estrutura de dados de Turma
 * Tipagem pura sem implementação de regras
 */
export interface ITurma extends IEntityBase {
  periodo: string;
  ambientePadraoAula: IAmbiente | null;
  curso: ICurso;
  imagemCapa: IImagem | null;
}

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

  /**
   * Cria uma nova instância válida de Turma
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: TurmaCreateDto): Turma {
    const instance = new Turma();
    instance.periodo = dados.periodo;
    instance.ambientePadraoAula = null;
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
  static fromData(dados: Record<string, any>): Turma {
    const instance = new Turma();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = Turma.createValidation();
    rules.required(this.periodo, "periodo");
    rules.minLength(this.periodo, "periodo", 1);
    Turma.throwIfInvalid(result);
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados da turma
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: TurmaUpdateDto): void {
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
