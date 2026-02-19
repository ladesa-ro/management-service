import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createDiaCalendarioRepository } from "./persistence/typeorm/dia-calendario.repository";

export const DiaCalendarioAuthzRegistrySetup = createAuthzRegistryProvider("dia_calendario", (ds) =>
  createDiaCalendarioRepository(ds),
);
