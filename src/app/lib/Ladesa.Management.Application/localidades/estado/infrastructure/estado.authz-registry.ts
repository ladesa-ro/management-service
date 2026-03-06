import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createEstadoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/localidades/estado/estado.repository";

export const EstadoAuthzRegistrySetup = createAuthzRegistryProvider(
  "estado",
  (ds) => createEstadoRepository(ds),
  { actions: { find: true } },
);
