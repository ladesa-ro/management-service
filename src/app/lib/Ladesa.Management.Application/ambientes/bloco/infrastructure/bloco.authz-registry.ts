import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createBlocoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ambientes/bloco/bloco.repository";

export const BlocoAuthzRegistrySetup = createAuthzRegistryProvider("bloco", (ds) =>
  createBlocoRepository(ds),
);
