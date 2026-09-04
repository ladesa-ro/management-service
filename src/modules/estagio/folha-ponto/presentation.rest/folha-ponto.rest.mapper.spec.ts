import { describe, expect, it } from "vitest";
import { folhaPontoPaginationSpec } from "../domain/queries";
import type { FolhaPontoListInputRestDto } from "./folha-ponto.rest.dto";
import * as FolhaPontoRestMapper from "./folha-ponto.rest.mapper";

describe("FolhaPonto REST Mapper - Query Filters", () => {
  it("should map data and status filters", () => {
    const query = FolhaPontoRestMapper.listInputDtoToListQuery.map({
      "filter.status": ["DEFERIDO"],
      "filter.data": ["2026-05-10"],
    } as FolhaPontoListInputRestDto);

    expect(query["filter.status"]).toEqual(["DEFERIDO"]);
    expect(query["filter.data"]).toEqual(["2026-05-10"]);
  });

  it("should map student matricula, nome, and empresa aliases", () => {
    const fromAlias = FolhaPontoRestMapper.listInputDtoToListQuery.map({
      "filter.matricula": ["2024102020023"],
      "filter.nome": ["Arthur"],
      "filter.empresa.id": ["empresa-1"],
      "filter.estagiario.id": ["estagiario-1"],
    } as FolhaPontoListInputRestDto);

    expect((fromAlias as any)["filter.estagio.estagiario.perfil.usuario.matricula"]).toEqual([
      "2024102020023",
    ]);
    expect((fromAlias as any)["filter.estagio.estagiario.perfil.usuario.nome"]).toEqual(["Arthur"]);
    expect((fromAlias as any)["filter.estagio.empresa.id"]).toEqual(["empresa-1"]);
    expect((fromAlias as any)["filter.estagio.estagiario.id"]).toEqual(["estagiario-1"]);

    const fromFullPath = FolhaPontoRestMapper.listInputDtoToListQuery.map({
      "filter.estagio.estagiario.perfil.usuario.matricula": ["2024102020023"],
      "filter.estagio.estagiario.perfil.usuario.nome": ["Arthur"],
      "filter.estagio.empresa.id": ["empresa-2"],
      "filter.estagio.estagiario.id": ["estagiario-2"],
    } as FolhaPontoListInputRestDto);

    expect((fromFullPath as any)["filter.estagio.estagiario.perfil.usuario.matricula"]).toEqual([
      "2024102020023",
    ]);
    expect((fromFullPath as any)["filter.estagio.estagiario.perfil.usuario.nome"]).toEqual([
      "Arthur",
    ]);
    expect((fromFullPath as any)["filter.estagio.empresa.id"]).toEqual(["empresa-2"]);
    expect((fromFullPath as any)["filter.estagio.estagiario.id"]).toEqual(["estagiario-2"]);
  });

  it("should have all expected filterable and searchable columns in folhaPontoPaginationSpec", () => {
    expect(folhaPontoPaginationSpec.filterableColumns).toHaveProperty("data");
    expect(folhaPontoPaginationSpec.filterableColumns).toHaveProperty("estagio.empresa.id");
    expect(folhaPontoPaginationSpec.filterableColumns).toHaveProperty("estagio.estagiario.id");
    expect(folhaPontoPaginationSpec.filterableColumns).toHaveProperty(
      "estagio.estagiario.perfil.usuario.matricula",
    );
    expect(folhaPontoPaginationSpec.filterableColumns).toHaveProperty(
      "estagio.estagiario.perfil.usuario.nome",
    );
    expect(folhaPontoPaginationSpec.searchableColumns).toContain(
      "estagio.estagiario.perfil.usuario.nome",
    );
    expect(folhaPontoPaginationSpec.searchableColumns).toContain(
      "estagio.estagiario.perfil.usuario.matricula",
    );
  });
});
