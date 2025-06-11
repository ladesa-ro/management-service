using TypeSpec.JsonSchema;

using Ladesa.Domain.v4.Schemas;
using Ladesa.Domain.v4.Generics.Entities;

@baseUri("ladesa://domain/v4/generics/pagination")
namespace Ladesa.Domain.v4.Generics.Pagination;

/**
 * Configuração de ordenação de uma propriedade.
 */
#deprecated ""
model PaginationSortByView {
  /**
   * Propriedade ordenada.
   */
  @pattern("^[\\D\\.]+$")
  property: string;

  /**
   * Modo de ordenação.
   */
  @pattern("^(ASC|DESC)$")
  mode: string;
}

/**
 * Configuração de filtro por restrições de uma propriedade.
 */
#deprecated ""
model PaginationFilterView {
  /**
   * Propriedade filtrada.
   */
  property: string;

  /**
   * Restrições de filtragem.
   */
  restrictions: Array<string>;
}

model GenericFilter {
  @pattern("^(true|false)$")
  bool: string;

  @pattern("^$null:.+$")
  null: string;

  @pattern("^$not:.+$")
  not: string;

  @pattern("^$eq:.+$")
  eq: string;

  @pattern("^$gt:.+$")
  gt: string;

  @pattern("^$gte:.+$")
  gte: string;

  @pattern("^$lt:.+$")
  lt: string;

  @pattern("^$lte:.+$")
  lte: string;
}

namespace Input {
  @pattern("^[\\D\\.]+:(ASC|DESC)$")
  scalar sort_by_constraint extends string;

  model InputBaseView {
    /**
     * Página de consulta.
     */
    @minValue(1)
    page?: integer | null = 1;

    /**
     * Limite da quantidade de resultados por página.
     */
    @minValue(1)
    limit?: integer | null;

    /**
     * Busca textual.
     */
    search?: string | null;
  }

  #deprecated ""
  model InputView {
    ...InputBaseView;

    /**
     * Ordenação.
     */
    sortBy?: PaginationSortByView[];

    /**
     * Filtros.
     */
    filter?: PaginationFilterView[];
  }

  model GenericSearchInputView {
    ...InputBaseView;

    /**
     * Ordenação.
     */
    sortBy?: string[];

    // /**
    //  * Filtros.
    //  */
    // filter: string[][];
  }
}

namespace Result {
  /**
   * Metadados dos resultados de busca.
   */
  model Meta {
    @doc("Quantidade de itens por página.")
    itemsPerPage: integer;

    @doc("Total de itens.")
    totalItems: integer;

    @doc("Página atual.")
    currentPage: integer;

    @doc("Quantidade total de páginas.")
    totalPages: integer;

    @doc("Termo textual da busca.")
    search: string;

    @doc("Ordenação.")
    sortBy: PaginationSortByView[];

    @doc("Filtros.")
    filter: PaginationFilterView[];
  }

  model Links {
    first: string | null;
    previous: string | null;
    current: string | null;
    next: string | null;
    last: string | null;
  }

  model View<Target> {
    @doc("Metadados da busca.")
    meta: Meta;

    @doc("Resultados da busca atual.")
    data: Target[];

    @doc("Links da busca.")
    links: Links;
  }
}
