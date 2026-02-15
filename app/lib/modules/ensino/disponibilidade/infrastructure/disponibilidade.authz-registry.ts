import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const DisponibilidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "disponibilidade",
  (db) => db.disponibilidadeRepository,
);
