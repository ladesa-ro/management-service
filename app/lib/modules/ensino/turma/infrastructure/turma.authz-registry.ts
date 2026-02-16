import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createTurmaRepository } from "./persistence/typeorm/turma.repository";

export const TurmaAuthzRegistrySetup = createAuthzRegistryProvider("turma", (ds) =>
  createTurmaRepository(ds),
);
