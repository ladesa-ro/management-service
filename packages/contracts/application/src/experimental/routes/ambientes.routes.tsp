import "@typespec/http";
import "@ladesa-ro/management-service.domain.contracts";

using TypeSpec.Http;
using Ladesa.ManagementService.Domain.Contracts;

namespace Ladesa.ManagementService.Application.Contracts;

namespace Generics {
  namespace Errors {
    @error
    model NotFoundError {
      code: "NOT_FOUND";
      message: string;
    }

    model NotFoundErrorResponse {
      @statusCode statusCode: 404;
      @body body: NotFoundError;
    }

    alias CommonErrorsResponses = NotFoundErrorResponse;
  }

  model SearchQueries {
    /** Página de consulta. */
    @query page?: integer | null;

    /** Limite da quantidade de resultados por página. */
    @query limit?: integer | null;

    /** Busca textual. */
    @query search?: string | null;

    /** Ordenação dos registros. */
    @query(#{ name: "sortBy", explode: true }) sortBy?: string[] | null;
  }
}

@route("/ambientes")
interface AmbientesController {
  /** Ambientes: listagem. */
  @get list(
    ...Generics.SearchQueries,

    /** Busca textual. */
    @query(#{ name: "Filtro de bloco.id", explode: true })
    `filter.bloco.id`?: string[] | null,

    /** Busca textual. */
    @query(#{ name: "Filtro de bloco.campus.id", explode: true })
    `filter.bloco.campus.id`?: string[] | null,
  ): AmbienteListOutput;

  /** Ambientes: encontrar por ID. */
  @get findById(@path id: AmbienteFindOneInput.id): AmbienteFindOneOutput;

  /** Ambientes: cadastrar registro. */
  @post create(@body body: AmbienteCreateInput): {
    @statusCode statusCode: 201;
    @body body: AmbienteFindOneOutput;
  } | Generics.Errors.CommonErrorsResponses;

  /** Ambientes: atualizar registro. */
  @patch update(
    @path id: AmbienteFindOneInput.id,
    @body body: AmbienteUpdateInput,
  ): AmbienteFindOneOutput;

  /** Ambientes: deletar registro. */
  @delete delete(@path body: AmbienteFindOneInput.id): AmbienteFindOneOutput;
}
