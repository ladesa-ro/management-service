import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createEtapaRepository } from "./persistence/typeorm/etapa.repository";

export const EtapaAuthzRegistrySetup = createAuthzRegistryProvider("etapa", (ds) =>
  createEtapaRepository(ds),
);
