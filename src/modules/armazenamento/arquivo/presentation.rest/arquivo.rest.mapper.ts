import { ArquivoGetFileQuery } from "@/modules/armazenamento/arquivo";
import { createMapper } from "@/shared/mapping";
import type {
  ArquivoFindOneInputRestDto,
  ArquivoGetFileQueryInputRestDto,
} from "./arquivo.rest.dto";

// ============================================================================
// Externa → Interna (Input: Presentation → Core)
// ============================================================================

export const toGetFileInput = createMapper<
  { params: ArquivoFindOneInputRestDto; query: ArquivoGetFileQueryInputRestDto },
  ArquivoGetFileQuery
>(({ params, query }) => {
  const input = new ArquivoGetFileQuery();
  input.id = params.id;
  input.acesso = {
    id: query["acesso.recurso.id"],
    nome: query["acesso.recurso.nome"],
  };
  return input;
});
