import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { IAmbiente } from "@/Ladesa.Management.Application/ambientes/ambiente/domain/ambiente.types";
import type { IImagem } from "@/Ladesa.Management.Application/armazenamento/imagem/domain/imagem.types";
import type { IDisciplina } from "@/Ladesa.Management.Application/ensino/disciplina/domain/disciplina.types";
import type { ITurma } from "@/Ladesa.Management.Application/ensino/turma/domain/turma.types";
import type { ICalendarioLetivo } from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import type { IDiario, IDiarioCreate, IDiarioUpdate } from "./diario.types";

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

  validar(): void {
    // Sem validações de campos escalares
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
    instance.initDates();
    instance.validar();
    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Diario {
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
