import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const UsuarioAuthzRegistrySetup = createAuthzRegistryProvider(
  "usuario",
  (db) => db.usuarioRepository,
);
