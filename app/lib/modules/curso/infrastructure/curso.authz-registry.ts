import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const CursoAuthzRegistrySetup = createAuthzRegistryProvider(
  "curso",
  (db) => db.cursoRepository,
);
