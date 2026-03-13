import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createProfessorIndisponibilidadeRepository } from "./persistence/typeorm/professor-indisponibilidade.repository";

export const ProfessorIndisponibilidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "professor_disponibilidade",
  (ds) => createProfessorIndisponibilidadeRepository(ds),
  { alias: "professor_indisponibilidade" },
);
