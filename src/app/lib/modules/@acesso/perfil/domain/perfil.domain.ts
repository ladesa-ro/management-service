import type { IUsuario } from "@/modules/@acesso/usuario";
import { BaseDatedEntity } from "@/modules/@shared";
import type { ICampus } from "@/modules/ambientes/campus";
import type { IPerfil, IPerfilCreate, IPerfilUpdate } from "./perfil.types";

/**
 * Entidade de Domínio: Perfil
 * Implementa a tipagem IPerfil e adiciona regras de negócio
 */
export class Perfil extends BaseDatedEntity implements IPerfil {
  ativo!: boolean;
  cargo!: string;
  campus!: ICampus;
  usuario!: IUsuario;

  protected static get entityName(): string {
    return "Perfil";
  }

  // ========================================
  // Validação
  // ========================================

  validar(): void {
    const { result, rules } = Perfil.createValidation();
    rules.required(this.cargo, "cargo");
    rules.minLength(this.cargo, "cargo", 1);
    Perfil.throwIfInvalid(result);
  }

  // ========================================
  // Factory Methods
  // ========================================

  /**
   * Cria uma nova instância válida de Perfil
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: IPerfilCreate): Perfil {
    const instance = new Perfil();
    instance.cargo = dados.cargo;
    instance.ativo = true;

    instance.initDates();
    instance.validar();

    return instance;
  }

  /**
   * Reconstrói uma instância a partir de dados existentes (ex: do banco)
   */
  static fromData(dados: Record<string, any>): Perfil {
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
    this.touchUpdated();
  }

  /**
   * Desativa o perfil
   */
  desativar(): void {
    this.ativo = false;
    this.touchUpdated();
  }

  // ========================================
  // Métodos de Domínio
  // ========================================

  /**
   * Atualiza os dados do perfil
   * @throws EntityValidationError se os dados forem inválidos
   */
  atualizar(dados: IPerfilUpdate): void {
    if (dados.cargo !== undefined) {
      this.cargo = dados.cargo;
    }

    this.touchUpdated();
    this.validar();
  }
}
