import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createEventoRepository } from "./persistence/typeorm/evento.repository";

export const EventoAuthzRegistrySetup = createAuthzRegistryProvider("evento", (ds) =>
  createEventoRepository(ds),
);
