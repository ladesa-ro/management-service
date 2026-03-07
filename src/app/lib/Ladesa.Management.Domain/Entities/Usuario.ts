import type { IdUuid } from "@/Ladesa.Management.Application/@shared";
import { BaseDatedEntity } from "@/Ladesa.Management.Application/@shared";
import type { UsuarioCreateDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioCreateDto";
import type { UsuarioUpdateDto } from "@/Ladesa.Management.Domain/Dtos/UsuarioUpdateDto";

/**
 * Entidade de Domínio: Usuario
 * Implementa a tipagem IUsuario e adiciona regras de negócio
 */
export class Usuario extends BaseDatedEntity {
  private constructor(
    public nome: string | null,
    public matriculaSiape: string | null,
    public email: string | null,
    public isSuperUser: boolean,
    public imagemCapaId: IdUuid | null,
    public imagemPerfilId: IdUuid | null,
  ) {
    super();
  }

  protected static get entityName(): string {
    return "Usuario";
  }

  static criar(dados: UsuarioCreateDto): Usuario {
    const instance = new Usuario(
      dados.nome?.trim() || null,
      dados.matriculaSiape?.trim() || null,
      dados.email?.trim() || null,
      false,
      null,
      null,
    );
    instance.initDates();
    instance.validar();
    return instance;
  }

  static fromData(data: Usuario): Usuario {
    const instance = new Usuario(
      data.nome,
      data.matriculaSiape,
      data.email,
      data.isSuperUser,
      data.imagemCapaId,
      data.imagemPerfilId,
    );
    instance.id = data.id;
    instance.dateCreated = data.dateCreated;
    instance.dateUpdated = data.dateUpdated;
    instance.dateDeleted = data.dateDeleted;
    return instance;
  }

  validar(): void {
    // Campos são opcionais, sem validações obrigatórias
  }

  atualizar(dados: UsuarioUpdateDto): void {
    if (dados.nome !== undefined) {
      this.nome = dados.nome?.trim() || null;
    }

    if (dados.matriculaSiape !== undefined) {
      this.matriculaSiape = dados.matriculaSiape?.trim() || null;
    }

    if (dados.email !== undefined) {
      this.email = dados.email?.trim() || null;
    }

    this.touchUpdated();
    this.validar();
  }

  override podeSerDeletado(): boolean {
    return this.isAtivo() && !this.isSuperUser;
  }

  temNome(): boolean {
    return this.nome !== null && this.nome.trim().length > 0;
  }

  temEmail(): boolean {
    return this.email !== null && this.email.trim().length > 0;
  }

  temMatriculaSiape(): boolean {
    return this.matriculaSiape !== null && this.matriculaSiape.trim().length > 0;
  }

  temImagemCapa(): boolean {
    return this.imagemCapaId !== null;
  }

  temImagemPerfil(): boolean {
    return this.imagemPerfilId !== null;
  }
}
