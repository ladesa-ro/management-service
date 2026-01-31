import type { UsuarioFindOneOutput } from "@/modules/usuario/application/dtos";

export type IRequestActor = null | Pick<
  UsuarioFindOneOutput,
  "id" | "nome" | "matriculaSiape" | "email" | "isSuperUser"
>;
