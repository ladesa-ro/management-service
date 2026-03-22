import { UsuarioInputRef } from "@/modules/acesso/usuario";
import { CampusInputRef } from "@/modules/ambientes/campus";
import { PerfilFields } from "../perfil.fields";

export const PerfilSetVinculosCommandFields = {
  cargos: PerfilFields.cargos,
  campus: PerfilFields.campus,
  usuario: PerfilFields.usuario,
};

export class PerfilSetVinculosCommand {
  cargos!: string[];
  campus!: CampusInputRef;
  usuario!: UsuarioInputRef;
}
