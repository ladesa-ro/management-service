import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createDisponibilidadeRepository } from "./persistence/typeorm/disponibilidade.repository";

export const DisponibilidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "disponibilidade",
  (ds) => createDisponibilidadeRepository(ds),
);
