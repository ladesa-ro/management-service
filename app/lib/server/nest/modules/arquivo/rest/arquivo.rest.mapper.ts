import { ArquivoGetFileInputDto } from "@/modules/arquivo";
import { ArquivoFindOneInputRestDto, ArquivoGetFileQueryInputRestDto } from "./arquivo.rest.dto";

export class ArquivoRestMapper {
  static toGetFileInput(
    params: ArquivoFindOneInputRestDto,
    query: ArquivoGetFileQueryInputRestDto,
  ): ArquivoGetFileInputDto {
    const input = new ArquivoGetFileInputDto();
    input.id = params.id;
    input.acesso = {
      id: query["acesso.recurso.id"],
      nome: query["acesso.recurso.nome"],
    };
    return input;
  }
}
