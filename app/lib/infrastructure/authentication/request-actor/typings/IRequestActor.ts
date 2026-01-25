import type { UsuarioFindOneOutput } from "@/v2/core/usuario/application/dtos";

export type IRequestActor = null | Pick<UsuarioFindOneOutput, "id" | "nome" | "matriculaSiape" | "email" | "isSuperUser">;
