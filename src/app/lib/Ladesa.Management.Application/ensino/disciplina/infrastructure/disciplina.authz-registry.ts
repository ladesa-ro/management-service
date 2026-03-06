import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createDisciplinaRepository } from "./persistence/typeorm/disciplina.repository";

export const DisciplinaAuthzRegistrySetup = createAuthzRegistryProvider("disciplina", (ds) =>
  createDisciplinaRepository(ds),
);
