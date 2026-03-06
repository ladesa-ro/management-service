import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createAmbienteRepository } from "./persistence/typeorm/ambiente.repository";

export const AmbienteAuthzRegistrySetup = createAuthzRegistryProvider("ambiente", (ds) =>
  createAmbienteRepository(ds),
);
