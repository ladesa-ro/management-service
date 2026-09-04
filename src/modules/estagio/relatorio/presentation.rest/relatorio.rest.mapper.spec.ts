import { describe, expect, it } from "vitest";
import { relatorioPaginationSpec } from "../domain/queries";
import type { RelatorioListInputRestDto } from "./relatorio.rest.dto";
import * as RelatorioRestMapper from "./relatorio.rest.mapper";

describe("Relatorio REST Mapper - Query Filters", () => {
  it("should map estagio.id and status filters", () => {
    const query = RelatorioRestMapper.listInputDtoToListQuery.map({
      "filter.estagio.id": ["estagio-1"],
      "filter.status": ["EM_ANDAMENTO"],
    } as RelatorioListInputRestDto);

    expect(query["filter.estagio.id"]).toEqual(["estagio-1"]);
    expect((query as any)["filter.estagio.status"]).toEqual(["EM_ANDAMENTO"]);
  });

  it("should map student matricula, nome, and empresa aliases", () => {
    const fromAlias = RelatorioRestMapper.listInputDtoToListQuery.map({
      "filter.matricula": ["2024102020023"],
      "filter.nome": ["Arthur"],
      "filter.empresa.id": ["empresa-1"],
      "filter.estagiario.id": ["estagiario-1"],
    } as RelatorioListInputRestDto);

    expect((fromAlias as any)["filter.estagio.estagiario.perfil.usuario.matricula"]).toEqual([
      "2024102020023",
    ]);
    expect((fromAlias as any)["filter.estagio.estagiario.perfil.usuario.nome"]).toEqual(["Arthur"]);
    expect((fromAlias as any)["filter.estagio.empresa.id"]).toEqual(["empresa-1"]);
    expect((fromAlias as any)["filter.estagio.estagiario.id"]).toEqual(["estagiario-1"]);

    const fromFullPath = RelatorioRestMapper.listInputDtoToListQuery.map({
      "filter.estagio.estagiario.perfil.usuario.matricula": ["2024102020023"],
      "filter.estagio.estagiario.perfil.usuario.nome": ["Arthur"],
      "filter.estagio.empresa.id": ["empresa-2"],
      "filter.estagio.estagiario.id": ["estagiario-2"],
    } as RelatorioListInputRestDto);

    expect((fromFullPath as any)["filter.estagio.estagiario.perfil.usuario.matricula"]).toEqual([
      "2024102020023",
    ]);
    expect((fromFullPath as any)["filter.estagio.estagiario.perfil.usuario.nome"]).toEqual([
      "Arthur",
    ]);
    expect((fromFullPath as any)["filter.estagio.empresa.id"]).toEqual(["empresa-2"]);
    expect((fromFullPath as any)["filter.estagio.estagiario.id"]).toEqual(["estagiario-2"]);
  });

  it("should have all expected filterable and searchable columns in relatorioPaginationSpec", () => {
    expect(relatorioPaginationSpec.filterableColumns).toHaveProperty("estagio.id");
    expect(relatorioPaginationSpec.filterableColumns).toHaveProperty("estagio.empresa.id");
    expect(relatorioPaginationSpec.filterableColumns).toHaveProperty("estagio.status");
    expect(relatorioPaginationSpec.filterableColumns).toHaveProperty("estagio.estagiario.id");
    expect(relatorioPaginationSpec.filterableColumns).toHaveProperty(
      "estagio.estagiario.perfil.usuario.matricula",
    );
    expect(relatorioPaginationSpec.filterableColumns).toHaveProperty(
      "estagio.estagiario.perfil.usuario.nome",
    );
    expect(relatorioPaginationSpec.searchableColumns).toContain(
      "estagio.estagiario.perfil.usuario.nome",
    );
    expect(relatorioPaginationSpec.searchableColumns).toContain(
      "estagio.estagiario.perfil.usuario.matricula",
    );
  });
});
