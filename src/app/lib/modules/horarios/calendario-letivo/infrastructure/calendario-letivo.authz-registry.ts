import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createCalendarioLetivoRepository } from "./persistence/typeorm/calendario-letivo.repository";

export const CalendarioLetivoAuthzRegistrySetup = createAuthzRegistryProvider(
  "calendario_letivo",
  (ds) => createCalendarioLetivoRepository(ds),
);
