import { ArquivoGetFileQuery } from "@/modules/armazenamento/arquivo";
import { ArquivoFindOneInputRestDto, ArquivoGetFileQueryInputRestDto } from "./arquivo.rest.dto";

export class ArquivoRestMapper {
  static toGetFileInput(
    params: ArquivoFindOneInputRestDto,
    query: ArquivoGetFileQueryInputRestDto,
  ): ArquivoGetFileQuery {
    const input = new ArquivoGetFileQuery();
    input.id = params.id;
    input.acesso = {
      id: query["acesso.recurso.id"],
      nome: query["acesso.recurso.nome"],
    };
    return input;
  }
}
