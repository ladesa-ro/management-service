import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createEtapaRepository } from "./persistence/typeorm/etapa.repository";

export const EtapaAuthzRegistrySetup = createAuthzRegistryProvider("etapa", (ds) =>
  createEtapaRepository(ds),
);
