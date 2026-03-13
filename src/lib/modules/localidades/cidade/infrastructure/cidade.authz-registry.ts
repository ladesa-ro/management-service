import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createCidadeRepository } from "./persistence/typeorm/cidade.repository";

export const CidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "cidade",
  (ds) => createCidadeRepository(ds),
  { actions: { find: true } },
);
