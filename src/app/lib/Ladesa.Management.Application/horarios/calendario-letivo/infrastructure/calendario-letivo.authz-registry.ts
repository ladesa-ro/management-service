import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createCalendarioLetivoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateCalendarioLetivoRepository";

export const CalendarioLetivoAuthzRegistrySetup = createAuthzRegistryProvider(
  "calendario_letivo",
  (ds) => createCalendarioLetivoRepository(ds),
);
