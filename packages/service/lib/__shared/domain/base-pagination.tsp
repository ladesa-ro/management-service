import "@typespec/json-schema";

namespace Ladesa.ManagementService.Generics.Pagination;

namespace Input {
  model Filters {
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

  @example("dateCreated:ASC")
  @pattern("^[\\D\\.]+:(ASC|DESC)$")
  scalar RawSortConstraint extends string;

  alias SortConstraint<SortableKey extends string> = string[];

  /**
   * Ordenação.
   */
  alias SortConstraints<SortableKeys extends string> = SortConstraint<SortableKeys>[];

  model View {
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

    // /**
    //  * Ordenação.
    //  */
    // sortBy?: SortConstraint<SortableKeys>[];

    // /**
    //  * Filtros.
    //  */
    // filters?: [string, string][];
  }
}

namespace Output {
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
    sortBy: string[];

    @doc("Filtros.")
    filter: string[];
  }

  model View<Target> {
    @doc("Metadados da busca.")
    meta: Meta;

    @doc("Resultados da busca atual.")
    data: Target[];

    // @doc("Links da busca.")
    // links: Links;
  }

  // model Links {
  //   first: string | null;
  //   previous: string | null;
  //   current: string | null;
  //   next: string | null;
  //   last: string | null;
  // }
}
