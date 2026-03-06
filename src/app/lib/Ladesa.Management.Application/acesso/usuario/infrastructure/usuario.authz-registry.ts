import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createUsuarioRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/acesso/usuario/usuario.repository";

export const UsuarioAuthzRegistrySetup = createAuthzRegistryProvider("usuario", (ds) =>
  createUsuarioRepository(ds),
);
