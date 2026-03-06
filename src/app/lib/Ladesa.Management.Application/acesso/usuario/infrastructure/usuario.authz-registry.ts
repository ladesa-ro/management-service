import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createUsuarioRepository } from "./persistence/typeorm/usuario.repository";

export const UsuarioAuthzRegistrySetup = createAuthzRegistryProvider("usuario", (ds) =>
  createUsuarioRepository(ds),
);
