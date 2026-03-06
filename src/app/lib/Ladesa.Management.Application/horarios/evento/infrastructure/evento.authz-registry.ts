import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createEventoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/horarios/evento/evento.repository";

export const EventoAuthzRegistrySetup = createAuthzRegistryProvider("evento", (ds) =>
  createEventoRepository(ds),
);
