import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createAulaRepository } from "./persistence/typeorm/aula.repository";

export const AulaAuthzRegistrySetup = createAuthzRegistryProvider("aula", (ds) =>
  createAulaRepository(ds),
);
