import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";
import { createHorarioGeradoRepository } from "./persistence/typeorm/horario-gerado.repository";

export const HorarioGeradoAuthzRegistrySetup = createAuthzRegistryProvider("horario_gerado", (ds) =>
  createHorarioGeradoRepository(ds),
);
