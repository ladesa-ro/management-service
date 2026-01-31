import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { IAmbiente } from "@/modules/ambiente/domain/ambiente.types";
import type { ICalendarioLetivo } from "@/modules/calendario-letivo";
import type { IDisciplina } from "@/modules/disciplina/domain/disciplina.types";
import type { IImagem } from "@/modules/imagem/domain/imagem.types";
import type { ITurma } from "@/modules/turma/domain/turma.types";
import type { IDiario, IDiarioCreate, IDiarioUpdate } from "./diario.types";

/**
 * Entidade de Domínio: Diario
 * Implementa a tipagem IDiario e adiciona regras de negócio
 */
export class Diario extends BaseEntity implements IDiario {
  id!: IdUuid;
  ativo!: boolean;
  calendarioLetivo!: ICalendarioLetivo;
  turma!: ITurma;
  disciplina!: IDisciplina;
  ambientePadrao!: IAmbiente | null;
  imagemCapa!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Diario";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Diario
   */
  static criar(dados: IDiarioCreate): Diario {
    const instance = new Diario();
    instance.ativo = dados.ativo ?? true;
    instance.ambientePadrao = null;
    instance.imagemCapa = null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IDiario): Diario {
    const instance = new Diario();
    Object.assign(instance, dados);
    return instance;
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do diário
   */
  atualizar(dados: IDiarioUpdate): void {
    if (dados.ativo !== undefined) {
      this.ativo = dados.ativo;
    }

    this.dateUpdated = new Date().toISOString();
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
    this.dateUpdated = new Date().toISOString();
  }

  /**
   * Desativa o diário
   */
  desativar(): void {
    this.ativo = false;
    this.dateUpdated = new Date().toISOString();
  }
}
