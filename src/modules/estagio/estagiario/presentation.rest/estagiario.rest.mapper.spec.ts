import { describe, expect, it } from "vitest";
import { estagiarioPaginationSpec } from "../domain/queries";
import type { EstagiarioListInputRestDto } from "./estagiario.rest.dto";
import * as EstagiarioRestMapper from "./estagiario.rest.mapper";

describe("Estagiario REST Mapper - Query Filters", () => {
  it("should map student matricula filter alias and full path", () => {
    const fromAlias = EstagiarioRestMapper.listInputDtoToListQuery.map({
      "filter.matricula": ["2024102020023"],
    } as EstagiarioListInputRestDto);
    expect(fromAlias["filter.perfil.usuario.matricula"]).toEqual(["2024102020023"]);

    const fromFullPath = EstagiarioRestMapper.listInputDtoToListQuery.map({
      "filter.perfil.usuario.matricula": ["2024102020023"],
    } as EstagiarioListInputRestDto);
    expect(fromFullPath["filter.perfil.usuario.matricula"]).toEqual(["2024102020023"]);
  });

  it("should map student name filter alias and full path", () => {
    const fromAlias = EstagiarioRestMapper.listInputDtoToListQuery.map({
      "filter.nome": ["João"],
    } as EstagiarioListInputRestDto);
    expect(fromAlias["filter.perfil.usuario.nome"]).toEqual(["João"]);

    const fromFullPath = EstagiarioRestMapper.listInputDtoToListQuery.map({
      "filter.perfil.usuario.nome": ["João"],
    } as EstagiarioListInputRestDto);
    expect(fromFullPath["filter.perfil.usuario.nome"]).toEqual(["João"]);
  });

  it("should map student email and campus filter aliases", () => {
    const query = EstagiarioRestMapper.listInputDtoToListQuery.map({
      "filter.email": ["joao@test.com"],
      "filter.campus.id": ["campus-123"],
    } as EstagiarioListInputRestDto);

    expect(query["filter.perfil.usuario.email"]).toEqual(["joao@test.com"]);
    expect(query["filter.perfil.campus.id"]).toEqual(["campus-123"]);
  });

  it("should map course name, periodo, emailInstitucional, and telefone", () => {
    const query = EstagiarioRestMapper.listInputDtoToListQuery.map({
      "filter.curso.nome": ["Informática"],
      "filter.periodo": ["2026.1"],
      "filter.emailInstitucional": ["aluno@ifro.edu.br"],
      "filter.telefone": ["69999999999"],
    } as EstagiarioListInputRestDto);

    expect(query["filter.curso.nome"]).toEqual(["Informática"]);
    expect(query["filter.periodo"]).toEqual(["2026.1"]);
    expect(query["filter.emailInstitucional"]).toEqual(["aluno@ifro.edu.br"]);
    expect(query["filter.telefone"]).toEqual(["69999999999"]);
  });

  it("should have all expected filterable and searchable columns in estagiarioPaginationSpec", () => {
    expect(estagiarioPaginationSpec.filterableColumns).toHaveProperty("perfil.usuario.matricula");
    expect(estagiarioPaginationSpec.filterableColumns).toHaveProperty("perfil.usuario.nome");
    expect(estagiarioPaginationSpec.filterableColumns).toHaveProperty("perfil.usuario.email");
    expect(estagiarioPaginationSpec.filterableColumns).toHaveProperty("perfil.campus.id");
    expect(estagiarioPaginationSpec.filterableColumns).toHaveProperty("curso.nome");
    expect(estagiarioPaginationSpec.filterableColumns).toHaveProperty("emailInstitucional");
    expect(estagiarioPaginationSpec.filterableColumns).toHaveProperty("telefone");
    expect(estagiarioPaginationSpec.searchableColumns).toContain("perfil.usuario.nome");
    expect(estagiarioPaginationSpec.searchableColumns).toContain("perfil.usuario.matricula");
  });
});
