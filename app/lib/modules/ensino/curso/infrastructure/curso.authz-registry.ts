import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const CursoAuthzRegistrySetup = createAuthzRegistryProvider(
  "curso",
  (db) => db.cursoRepository,
);
