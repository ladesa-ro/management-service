import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const TurmaDisponibilidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "turma_disponibilidade",
  (db) => db.turmaDisponibilidadeRepository,
);
