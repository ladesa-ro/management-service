import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createEstadoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateEstadoRepository";

export const EstadoAuthzRegistrySetup = createAuthzRegistryProvider(
  "estado",
  (ds) => createEstadoRepository(ds),
  { actions: { find: true } },
);
