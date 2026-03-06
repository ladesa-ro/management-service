import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createDiarioRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ensino/diario/diario.repository";

export const DiarioAuthzRegistrySetup = createAuthzRegistryProvider("diario", (ds) =>
  createDiarioRepository(ds),
);
