import { createEntityDomainMapper } from "@/infrastructure.database/typeorm/helpers/entity-domain-mapper";
import type { IUsuario } from "@/modules/acesso/usuario/domain/usuario";

export const usuarioEntityDomainMapper = createEntityDomainMapper<
  IUsuario,
  Record<string, unknown>
>({
  fields: [
    "id",
    "nome",
    "matricula",
    "email",
    "isSuperUser",
    { field: "imagemCapa", type: "relation" },
    { field: "imagemPerfil", type: "relation" },
    { field: "dateCreated", type: "date" },
    { field: "dateUpdated", type: "date" },
    { field: "dateDeleted", type: "date" },
  ],
});
