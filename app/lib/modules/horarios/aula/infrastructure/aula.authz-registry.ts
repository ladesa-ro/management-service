import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createAulaRepository } from "./persistence/typeorm/aula.repository";

export const AulaAuthzRegistrySetup = createAuthzRegistryProvider("aula", (ds) =>
  createAulaRepository(ds),
);
