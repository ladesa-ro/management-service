import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createEventoRepository } from "./persistence/typeorm/evento.repository";

export const EventoAuthzRegistrySetup = createAuthzRegistryProvider("evento", (ds) =>
  createEventoRepository(ds),
);
