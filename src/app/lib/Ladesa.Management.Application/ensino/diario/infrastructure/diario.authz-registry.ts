import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createDiarioRepository } from "./persistence/typeorm/diario.repository";

export const DiarioAuthzRegistrySetup = createAuthzRegistryProvider("diario", (ds) =>
  createDiarioRepository(ds),
);
