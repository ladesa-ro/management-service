import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { ICalendarioLetivo } from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import type { DiarioCreateDto } from "@/Ladesa.Management.Domain/Dtos/DiarioCreateDto";
import type { DiarioUpdateDto } from "@/Ladesa.Management.Domain/Dtos/DiarioUpdateDto";
import type { IAmbiente } from "@/Ladesa.Management.Domain/Entities/Ambiente";
import type { IDisciplina } from "@/Ladesa.Management.Domain/Entities/Disciplina";
import type { IImagem } from "@/Ladesa.Management.Domain/Entities/Imagem";
import type { ITurma } from "@/Ladesa.Management.Domain/Entities/Turma";

export interface IDiario extends IEntityBase {
  ativo: boolean;
  calendarioLetivo: ICalendarioLetivo;
  turma: ITurma;
  disciplina: IDisciplina;
  ambientePadrao: IAmbiente | null;
  imagemCapa: IImagem | null;
}

/**
 * Entidade de Domínio: Diario
 * Implementa a tipagem IDiario e adiciona regras de negócio
 */
export class Diario extends BaseDatedEntity implements IDiario {
  ativo!: boolean;
  calendarioLetivo!: ICalendarioLetivo;
  turma!: ITurma;
  disciplina!: IDisciplina;
  ambientePadrao!: IAmbiente | null;
  imagemCapa!: IImagem | null;

  protected static get entityName(): string {
    return "Diario";
  }

  // ========================================
  // Validação
  // ========================================

  /**
   * Cria uma nova instância válida de Diario
   */
  static criar(dados: DiarioCreateDto): Diario {
    const instance = new Diario();
    instance.ativo = dados.ativo ?? true;
    instance.ambientePadrao = null;
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
  static fromData(dados: Record<string, any>): Diario {
    const instance = new Diario();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    // Sem validações de campos escalares
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do diário
   */
  atualizar(dados: DiarioUpdateDto): void {
    if (dados.ativo !== undefined) {
      this.ativo = dados.ativo;
    }

    this.touchUpdated();
    this.validar();
  }

  /**
   * Verifica se o diário está ativo (override: considera campo 'ativo' além de dateDeleted)
   */
  override isAtivo(): boolean {
    return this.ativo && this.dateDeleted === null;
  }

  /**
   * Ativa o diário
   */
  ativar(): void {
    this.ativo = true;
    this.touchUpdated();
  }

  /**
   * Desativa o diário
   */
  desativar(): void {
    this.ativo = false;
    this.touchUpdated();
  }
}
