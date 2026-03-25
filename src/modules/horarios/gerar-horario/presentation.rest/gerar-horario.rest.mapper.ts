import type { IGerarHorario } from "../domain/gerar-horario.types";
import { GerarHorarioFindOneOutputRestDto } from "./gerar-horario.rest.dto";

export class GerarHorarioRestMapper {
  static toFindOneOutputDto(entity: IGerarHorario): GerarHorarioFindOneOutputRestDto {
    const dto = new GerarHorarioFindOneOutputRestDto();
    dto.id = entity.id;
    dto.status = entity.status;
    dto.duracao = entity.duracao;
    dto.dataInicio =
      entity.dataInicio instanceof Date
        ? entity.dataInicio.toISOString().split("T")[0]
        : String(entity.dataInicio);
    dto.dataTermino =
      entity.dataTermino instanceof Date
        ? entity.dataTermino.toISOString().split("T")[0]
        : entity.dataTermino
          ? String(entity.dataTermino)
          : null;
    dto.respostaGerador = entity.respostaGerador;
    dto.dateCreated =
      entity.dateCreated instanceof Date
        ? entity.dateCreated.toISOString()
        : String(entity.dateCreated);
    dto.ofertaFormacaoIds = entity.ofertaFormacaoIds ?? [];
    dto.calendarioLetivoIds = entity.calendarioLetivoIds ?? [];
    return dto;
  }
}
