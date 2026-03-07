import { PerfilFindOneOutputDto } from "./PerfilFindOneOutputDto";
import { UsuarioFindOneOutputDto } from "./UsuarioFindOneOutputDto";

export class AuthWhoAmIOutputDto {
  usuario!: UsuarioFindOneOutputDto | null;
  perfisAtivos!: PerfilFindOneOutputDto[];
}
