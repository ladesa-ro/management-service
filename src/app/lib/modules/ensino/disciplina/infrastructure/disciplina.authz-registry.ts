import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createDisciplinaRepository } from "./persistence/typeorm/disciplina.repository";

export const DisciplinaAuthzRegistrySetup = createAuthzRegistryProvider("disciplina", (ds) =>
  createDisciplinaRepository(ds),
);
