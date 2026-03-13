import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createTurmaDisponibilidadeRepository } from "./persistence/typeorm/turma-disponibilidade.repository";

export const TurmaDisponibilidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "turma_disponibilidade",
  (ds) => createTurmaDisponibilidadeRepository(ds),
);
