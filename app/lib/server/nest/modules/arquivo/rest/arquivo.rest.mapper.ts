import { ArquivoGetFileInput } from "@/core/arquivo";
import { ArquivoFindOneInputDto, ArquivoGetFileQueryInputDto } from "./arquivo.rest.dto";

export class ArquivoRestMapper {
  static toGetFileInput(
    params: ArquivoFindOneInputDto,
    query: ArquivoGetFileQueryInputDto,
  ): ArquivoGetFileInput {
    const input = new ArquivoGetFileInput();
    input.id = params.id;
    input.acesso = {
      id: query["acesso.recurso.id"],
      nome: query["acesso.recurso.nome"],
    };
    return input;
  }
}
