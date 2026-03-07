import { ArquivoGetFileInputDto } from "@/Ladesa.Management.Application/armazenamento/arquivo";
import {
  ArquivoFindOneInputRestDto,
  ArquivoGetFileQueryInputRestDto,
} from "@/Ladesa.Management.Server.Api/Apis/Rest/Dtos/ArquivoRestDto";

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
