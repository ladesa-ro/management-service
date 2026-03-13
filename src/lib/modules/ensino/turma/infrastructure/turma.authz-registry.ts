import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createTurmaRepository } from "./persistence/typeorm/turma.repository";

export const TurmaAuthzRegistrySetup = createAuthzRegistryProvider("turma", (ds) =>
  createTurmaRepository(ds),
);
