import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createDiarioRepository } from "./persistence/typeorm/diario.repository";

export const DiarioAuthzRegistrySetup = createAuthzRegistryProvider("diario", (ds) =>
  createDiarioRepository(ds),
);
