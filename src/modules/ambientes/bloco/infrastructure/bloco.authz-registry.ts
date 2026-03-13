import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createBlocoRepository } from "./persistence/typeorm/bloco.repository";

export const BlocoAuthzRegistrySetup = createAuthzRegistryProvider("bloco", (ds) =>
  createBlocoRepository(ds),
);
