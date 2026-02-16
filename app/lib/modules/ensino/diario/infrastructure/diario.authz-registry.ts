import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createDiarioRepository } from "./persistence/typeorm/diario.repository";

export const DiarioAuthzRegistrySetup = createAuthzRegistryProvider("diario", (ds) =>
  createDiarioRepository(ds),
);
