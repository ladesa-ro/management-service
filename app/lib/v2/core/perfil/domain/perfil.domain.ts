import { Campus } from "../../campus/domain/campus.domain";
import { Usuario } from "../../usuario/domain/usuario.domain";

export class Perfil {
  id!: string;
  ativo!: boolean;
  cargo!: string;
  campus!: Campus;
  usuario!: Usuario;
  dateCreated!: Date;
  dateUpdated!: Date;
  dateDeleted!: Date | null;
}
