import type { UsuarioFindOneOutput } from "@/modules/usuario/application/dtos";

/**
 * Representa o ator (usuário) que está fazendo a requisição.
 * Pode ser null se o usuário não estiver autenticado.
 */
export type IRequestActor = null | Pick<
  UsuarioFindOneOutput,
  "id" | "nome" | "matriculaSiape" | "email" | "isSuperUser"
>;
