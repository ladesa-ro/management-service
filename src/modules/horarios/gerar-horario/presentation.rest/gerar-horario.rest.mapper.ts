import type { GerarHorario } from "../domain/gerar-horario";
import { GerarHorarioFindOneOutputRestDto } from "./gerar-horario.rest.dto";

export class GerarHorarioRestMapper {
  static toFindOneOutputDto(domain: GerarHorario): GerarHorarioFindOneOutputRestDto {
    const dto = new GerarHorarioFindOneOutputRestDto();
    dto.id = domain.id;
    dto.status = domain.status;
    dto.duracao = domain.duracao;
    dto.dataInicio = domain.dataInicio;
    dto.dataTermino = domain.dataTermino;
    dto.respostaGerador = domain.respostaGerador;
    dto.dateCreated = domain.dateCreated;
    dto.ofertaFormacaoIds = domain.ofertaFormacaoIds;
    dto.calendarioLetivoIds = domain.calendarioLetivoIds;
    return dto;
  }
}
