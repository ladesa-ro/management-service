import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const DisponibilidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "disponibilidade",
  (db) => db.disponibilidadeRepository,
);
