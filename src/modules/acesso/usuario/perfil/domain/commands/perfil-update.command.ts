import { PerfilFields } from "../perfil.fields";

export const PerfilUpdateCommandFields = {
  ativo: PerfilFields.ativo,
  cargo: PerfilFields.cargo,
  cargaMaximaSemanal: PerfilFields.cargaMaximaSemanal,
};

export class PerfilUpdateCommand {
  ativo?: boolean;
  cargo?: string;
  cargaMaximaSemanal?: number | null;
}
