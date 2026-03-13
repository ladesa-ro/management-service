import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createCursoRepository } from "./persistence/typeorm/curso.repository";

export const CursoAuthzRegistrySetup = createAuthzRegistryProvider("curso", (ds) =>
  createCursoRepository(ds),
);
