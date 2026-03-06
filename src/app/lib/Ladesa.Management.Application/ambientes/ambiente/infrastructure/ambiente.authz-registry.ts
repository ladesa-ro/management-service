import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createAmbienteRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ambientes/ambiente/ambiente.repository";

export const AmbienteAuthzRegistrySetup = createAuthzRegistryProvider("ambiente", (ds) =>
  createAmbienteRepository(ds),
);
