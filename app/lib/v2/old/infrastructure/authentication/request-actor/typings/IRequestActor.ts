import type { UsuarioFindOneOutput } from "@/core/usuario/application/dtos";

export type IRequestActor = null | Pick<
  UsuarioFindOneOutput,
  "id" | "nome" | "matriculaSiape" | "email" | "isSuperUser"
>;
