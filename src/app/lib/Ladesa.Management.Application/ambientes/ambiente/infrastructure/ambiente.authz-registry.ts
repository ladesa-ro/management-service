import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createAmbienteRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/AmbienteRepository";

export const AmbienteAuthzRegistrySetup = createAuthzRegistryProvider("ambiente", (ds) =>
  createAmbienteRepository(ds),
);
