import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createEstadoRepository } from "./persistence/typeorm/estado.repository";

export const EstadoAuthzRegistrySetup = createAuthzRegistryProvider(
  "estado",
  (ds) => createEstadoRepository(ds),
  { actions: { find: true } },
);
