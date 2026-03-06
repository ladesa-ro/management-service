import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createAulaRepository } from "./persistence/typeorm/aula.repository";

export const AulaAuthzRegistrySetup = createAuthzRegistryProvider("aula", (ds) =>
  createAulaRepository(ds),
);
