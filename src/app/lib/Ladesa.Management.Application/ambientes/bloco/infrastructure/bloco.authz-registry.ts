import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createBlocoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/BlocoRepository";

export const BlocoAuthzRegistrySetup = createAuthzRegistryProvider("bloco", (ds) =>
  createBlocoRepository(ds),
);
