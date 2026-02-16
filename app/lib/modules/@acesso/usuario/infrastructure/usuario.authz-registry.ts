import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const UsuarioAuthzRegistrySetup = createAuthzRegistryProvider(
  "usuario",
  (db) => db.usuarioRepository,
);
