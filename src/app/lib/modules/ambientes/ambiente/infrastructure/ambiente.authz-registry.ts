import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createAmbienteRepository } from "./persistence/typeorm/ambiente.repository";

export const AmbienteAuthzRegistrySetup = createAuthzRegistryProvider("ambiente", (ds) =>
  createAmbienteRepository(ds),
);
