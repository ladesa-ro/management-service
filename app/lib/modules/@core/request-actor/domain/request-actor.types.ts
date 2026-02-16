import type { UsuarioFindOneOutputDto } from "@/modules/@acesso/usuario/application/dtos";

/**
 * Representa o ator (usuário) que está fazendo a requisição.
 * Pode ser null se o usuário não estiver autenticado.
 */
export type IRequestActor = null | Pick<
  UsuarioFindOneOutputDto,
  "id" | "nome" | "matriculaSiape" | "email" | "isSuperUser"
>;
