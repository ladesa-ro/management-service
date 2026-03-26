import { createMapper } from "@/shared/mapping";
import type { GerarHorario } from "../domain/gerar-horario";
import type { GerarHorarioFindOneOutputRestDto } from "./gerar-horario.rest.dto";

// ============================================================================
// Interna → Externa (Output: Core → Presentation)
// ============================================================================

export const toFindOneOutput = createMapper<GerarHorario, GerarHorarioFindOneOutputRestDto>(
  (output) => ({
    id: output.id,
    status: output.status,
    duracao: output.duracao,
    dataInicio: output.dataInicio,
    dataTermino: output.dataTermino,
    respostaGerador: output.respostaGerador,
    dateCreated: output.dateCreated,
    ofertaFormacaoIds: output.ofertaFormacaoIds,
    calendarioLetivoIds: output.calendarioLetivoIds,
  }),
);
