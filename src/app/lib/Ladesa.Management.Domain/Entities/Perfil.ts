import type { IEntityBase } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { IUsuario } from "@/Ladesa.Management.Application/acesso/usuario";
import type { ICampus } from "@/Ladesa.Management.Application/ambientes/campus";
import type { PerfilCreateDto } from "@/Ladesa.Management.Domain/Dtos/PerfilCreateDto";
import type { PerfilUpdateDto } from "@/Ladesa.Management.Domain/Dtos/PerfilUpdateDto";

/**
 * Interface que define a estrutura de dados de Perfil
 * Tipagem pura sem implementação de regras
 */
export interface IPerfil extends IEntityBase {
  ativo: boolean;
  cargo: string;
  campus: ICampus;
  usuario: IUsuario;
}

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

  /**
   * Cria uma nova instância válida de Perfil
   * @throws EntityValidationError se os dados forem inválidos
   */
  static criar(dados: PerfilCreateDto): Perfil {
    const instance = new Perfil();
    instance.cargo = dados.cargo;
    instance.ativo = true;

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
  static fromData(dados: Record<string, any>): Perfil {
    const instance = new Perfil();
    Object.assign(instance, dados);
    return instance;
  }

  validar(): void {
    const { result, rules } = Perfil.createValidation();
    rules.required(this.cargo, "cargo");
    rules.minLength(this.cargo, "cargo", 1);
    Perfil.throwIfInvalid(result);
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
  atualizar(dados: PerfilUpdateDto): void {
    if (dados.cargo !== undefined) {
      this.cargo = dados.cargo;
    }

    this.touchUpdated();
    this.validar();
  }
}
