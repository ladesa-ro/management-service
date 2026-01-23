import "@typespec/http";
import "@typespec/json-schema";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;
using JsonSchema;

namespace Ladesa.ManagementService;

/**
 * Obtêm o conteúdo de um Arquivo.
 */
@tag("arquivos")
@route("/arquivos/{id}")
@get
op ArquivoGetFile(
  @path id: string,
  @query(#{ explode: true }) `acesso.recurso.id`: string,
  @query(#{ explode: true }) `acesso.recurso.nome`: string,

  /**
   * Acesso via recurso: nome.
   */
  @query(#{ explode: true }) nomeRecurso: string,

  /**
   * Acesso via recurso: id.
   */
  @query(#{ explode: true }) idRecurso: string,
): {
  @header contentType: "application/octet-stream";
  @body body: bytes;
} | ForbiddenResponse | NotFoundResponse;
