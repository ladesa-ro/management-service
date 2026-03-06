import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createEventoRepository } from "./persistence/typeorm/evento.repository";

export const EventoAuthzRegistrySetup = createAuthzRegistryProvider("evento", (ds) =>
  createEventoRepository(ds),
);
