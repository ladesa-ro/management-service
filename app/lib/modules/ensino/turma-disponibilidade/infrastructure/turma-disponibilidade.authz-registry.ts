import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const TurmaDisponibilidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "turma_disponibilidade",
  (db) => db.turmaDisponibilidadeRepository,
);
