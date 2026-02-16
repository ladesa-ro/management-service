import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const CampusAuthzRegistrySetup = createAuthzRegistryProvider(
  "campus",
  (db) => db.campusRepository,
);
