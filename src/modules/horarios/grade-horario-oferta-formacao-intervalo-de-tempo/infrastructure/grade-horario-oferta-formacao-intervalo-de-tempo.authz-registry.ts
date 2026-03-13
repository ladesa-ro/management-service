import { createAuthzRegistryProvider } from "@/modules/@seguranca/contexto-acesso";
import { createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository } from "./persistence/typeorm/grade-horario-oferta-formacao-intervalo-de-tempo.repository";

export const GradeHorarioOfertaFormacaoIntervaloDeTempoAuthzRegistrySetup =
  createAuthzRegistryProvider("grade_horario_oferta_formacao_intervalo_de_tempo", (ds) =>
    createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository(ds),
  );
