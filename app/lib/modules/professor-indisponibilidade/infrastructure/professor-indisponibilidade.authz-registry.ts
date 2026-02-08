import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const ProfessorIndisponibilidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "professor_disponibilidade",
  (db) => db.professorIndisponibilidadeRepository,
  { alias: "professor_indisponibilidade" },
);
