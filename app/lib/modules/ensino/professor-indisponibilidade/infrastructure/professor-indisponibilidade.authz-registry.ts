import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const ProfessorIndisponibilidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "professor_disponibilidade",
  (db) => db.professorIndisponibilidadeRepository,
  { alias: "professor_indisponibilidade" },
);
