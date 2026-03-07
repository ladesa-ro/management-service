import { createAuthzRegistryProvider } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateGradeHorarioOfertaFormacaoIntervaloDeTempoRepository";

export const GradeHorarioOfertaFormacaoIntervaloDeTempoAuthzRegistrySetup =
  createAuthzRegistryProvider("grade_horario_oferta_formacao_intervalo_de_tempo", (ds) =>
    createGradeHorarioOfertaFormacaoIntervaloDeTempoRepository(ds),
  );
