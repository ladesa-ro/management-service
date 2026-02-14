import { createAuthzRegistryProvider } from "@/modules/@core/access-context";

export const CampusAuthzRegistrySetup = createAuthzRegistryProvider(
  "campus",
  (db) => db.campusRepository,
);
