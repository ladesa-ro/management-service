import { UsuarioInputRef } from "@/modules/acesso/usuario";
import { CampusInputRef } from "@/modules/ambientes/campus";

export class PerfilSetVinculosCommand {
  cargos!: string[];
  campus!: CampusInputRef;
  usuario!: UsuarioInputRef;
}
