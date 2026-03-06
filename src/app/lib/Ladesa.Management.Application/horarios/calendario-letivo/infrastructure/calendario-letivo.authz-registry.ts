import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createCalendarioLetivoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/horarios/calendario-letivo/calendario-letivo.repository";

export const CalendarioLetivoAuthzRegistrySetup = createAuthzRegistryProvider(
  "calendario_letivo",
  (ds) => createCalendarioLetivoRepository(ds),
);
