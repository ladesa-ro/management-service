import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createUsuarioRepository } from "./persistence/typeorm/usuario.repository";

export const UsuarioAuthzRegistrySetup = createAuthzRegistryProvider("usuario", (ds) =>
  createUsuarioRepository(ds),
);
