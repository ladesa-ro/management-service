import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { PerfilCreateDto } from "@/Ladesa.Management.Domain/Dtos/PerfilCreateDto";
import type { PerfilUpdateDto } from "@/Ladesa.Management.Domain/Dtos/PerfilUpdateDto";

/**
 * Entidade de Domínio: Perfil
 * Implementa a tipagem IPerfil e adiciona regras de negócio
 */
export class Perfil extends BaseDatedEntity {
  private constructor(
    public ativo: boolean,
    public cargo: string,
    public campusId: IdUuid,
    public usuarioId: IdUuid,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Perfil";
  }

  static criar(dados: PerfilCreateDto): Perfil {
    const instance = new Perfil(true, dados.cargo, dados.campus.id, dados.usuario.id);
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Perfil): Perfil {
    const instance = new Perfil(data.ativo, data.cargo, data.campusId, data.usuarioId);
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    const { result, rules } = Perfil.createValidation();
    rules.required(this.cargo, "cargo");
    rules.minLength(this.cargo, "cargo", 1);
    Perfil.throwIfInvalid(result);
  }

  override isAtivo(): boolean {
    return this.ativo && this.dateDeleted === null;
  }

  override podeSerEditado(): boolean {
    return this.dateDeleted === null;
  }

  override podeSerDeletado(): boolean {
    return this.dateDeleted === null;
  }

  temCargo(): boolean {
    return this.cargo !== null && this.cargo.trim().length > 0;
  }

  ativar(): void {
    this.ativo = true;
    this.touchUpdated();
  }

  desativar(): void {
    this.ativo = false;
    this.touchUpdated();
  }

  atualizar(dados: PerfilUpdateDto): void {
    if (dados.cargo !== undefined) {
      this.cargo = dados.cargo;
    }

    this.touchUpdated();
    this.validar();
  }
}
