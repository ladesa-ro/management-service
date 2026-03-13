import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createDisciplinaRepository } from "./persistence/typeorm/disciplina.repository";

export const DisciplinaAuthzRegistrySetup = createAuthzRegistryProvider("disciplina", (ds) =>
  createDisciplinaRepository(ds),
);
