import { BaseEntity, type IdUuid, type ScalarDateTimeString } from "@/modules/@shared";
import type { ICampus } from "@/modules/campus";
import type { IUsuario } from "@/modules/usuario";
import type { IPerfil, IPerfilCreate, IPerfilUpdate } from "./perfil.types";

/**
 * Entidade de Domínio: Perfil
 * Implementa a tipagem IPerfil e adiciona regras de negócio
 */
export class Perfil extends BaseEntity implements IPerfil {
  id!: IdUuid;
  ativo!: boolean;
  cargo!: string;
  campus!: ICampus;
  usuario!: IUsuario;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  protected static get entityName(): string {
    return "Perfil";
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Perfil
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IPerfilCreate): Perfil {
    const { result, rules } = this.createValidation();

    const instance = new Perfil();
    instance.cargo = rules.required(dados.cargo, "cargo");
    instance.cargo = rules.minLength(instance.cargo, "cargo", 1);

    this.throwIfInvalid(result);

    instance.ativo = true;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: IPerfil): Perfil {
    const instance = new Perfil();
    Object.assign(instance, dados);
    return instance;
  }

  /**
   * Valida se o perfil está ativo (override: considera campo 'ativo' além de dateDeleted)
   */
  override isAtivo(): boolean {
    return this.ativo && this.dateDeleted === null;
  }

  /**
   * Valida se pode ser editado (override: não depende de isAtivo)
   */
  override podeSerEditado(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Valida se pode ser deletado (override: não depende de isAtivo)
   */
  override podeSerDeletado(): boolean {
    return this.dateDeleted === null;
  }

  /**
   * Verifica se tem cargo definido
   */
  temCargo(): boolean {
    return this.cargo !== null && this.cargo.trim().length > 0;
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Ativa o perfil
   */
  ativar(): void {
    this.ativo = true;
    this.dateUpdated = new Date().toISOString();
  }

  /**
   * Desativa o perfil
   */
  desativar(): void {
    this.ativo = false;
    this.dateUpdated = new Date().toISOString();
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do perfil
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IPerfilUpdate): void {
    const { result, rules } = Perfil.createValidation();

    if (dados.cargo !== undefined) {
      this.cargo = rules.required(dados.cargo, "cargo");
      this.cargo = rules.minLength(this.cargo, "cargo", 1);
    }

    Perfil.throwIfInvalid(result);

    this.dateUpdated = new Date().toISOString();
  }
}
