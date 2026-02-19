import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createDisponibilidadeRepository } from "./persistence/typeorm/disponibilidade.repository";

export const DisponibilidadeAuthzRegistrySetup = createAuthzRegistryProvider(
  "disponibilidade",
  (ds) => createDisponibilidadeRepository(ds),
);
