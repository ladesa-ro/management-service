import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createCidadeRepository } from "./persistence/typeorm/cidade.repository";

export const CidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "cidade",
  (ds) => createCidadeRepository(ds),
  { actions: { find: true } },
);
