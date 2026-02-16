import { createAuthzRegistryProvider } from "@/modules/@core/contexto-acesso";

export const GradeHorarioOfertaFormacaoIntervaloDeTempoAuthzRegistrySetup =
  createAuthzRegistryProvider(
    "grade_horario_oferta_formacao_intervalo_de_tempo",
    (db) => db.gradeHorarioOfertaFormacaoIntervaloDeTempoRepository,
  );
