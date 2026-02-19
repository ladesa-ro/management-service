import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createBlocoRepository } from "./persistence/typeorm/bloco.repository";

export const BlocoAuthzRegistrySetup = createAuthzRegistryProvider("bloco", (ds) =>
  createBlocoRepository(ds),
);
