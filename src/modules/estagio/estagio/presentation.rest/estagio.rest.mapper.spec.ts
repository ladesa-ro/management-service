import { describe, expect, it } from "vitest";
import { estagioPaginationSpec } from "../domain/queries";
import type { EstagioListInputRestDto } from "./estagio.rest.dto";
import * as EstagioRestMapper from "./estagio.rest.mapper";

describe("Estagio REST Mapper - Query Filters", () => {
  it("should map student matricula filter alias and full path", () => {
    const fromAlias = EstagioRestMapper.listInputDtoToListQuery.map({
      "filter.estagiario.matricula": ["2024102020023"],
    } as EstagioListInputRestDto);
    expect((fromAlias as any)["filter.estagiario.perfil.usuario.matricula"]).toEqual([
      "2024102020023",
    ]);

    const fromFullPath = EstagioRestMapper.listInputDtoToListQuery.map({
      "filter.estagiario.perfil.usuario.matricula": ["2024102020023"],
    } as EstagioListInputRestDto);
    expect((fromFullPath as any)["filter.estagiario.perfil.usuario.matricula"]).toEqual([
      "2024102020023",
    ]);
  });

  it("should map student name filter alias and full path", () => {
    const fromAlias = EstagioRestMapper.listInputDtoToListQuery.map({
      "filter.estagiario.nome": ["Arthur"],
    } as EstagioListInputRestDto);
    expect((fromAlias as any)["filter.estagiario.perfil.usuario.nome"]).toEqual(["Arthur"]);

    const fromFullPath = EstagioRestMapper.listInputDtoToListQuery.map({
      "filter.estagiario.perfil.usuario.nome": ["Arthur"],
    } as EstagioListInputRestDto);
    expect((fromFullPath as any)["filter.estagiario.perfil.usuario.nome"]).toEqual(["Arthur"]);
  });

  it("should map company filters: cnpj, razaoSocial, nomeFantasia", () => {
    const query = EstagioRestMapper.listInputDtoToListQuery.map({
      "filter.empresa.cnpj": ["10817343000288"],
      "filter.empresa.razaoSocial": ["Instituto Federal"],
      "filter.empresa.nomeFantasia": ["IFRO"],
    } as EstagioListInputRestDto);

    expect((query as any)["filter.empresa.cnpj"]).toEqual(["10817343000288"]);
    expect((query as any)["filter.empresa.razaoSocial"]).toEqual(["Instituto Federal"]);
    expect((query as any)["filter.empresa.nomeFantasia"]).toEqual(["IFRO"]);
  });

  it("should map supervisor, orientador, dates, and aditivo filters", () => {
    const query = EstagioRestMapper.listInputDtoToListQuery.map({
      "filter.nomeSupervisor": ["Jefferson"],
      "filter.emailSupervisor": ["jefferson@ifro.edu.br"],
      "filter.usuarioOrientador.matricula": ["2291377"],
      "filter.usuarioOrientador.id": ["orientador-id"],
      "filter.usuarioOrientador.nome": ["Emi Silva"],
      "filter.dataInicio": ["2026-04-20"],
      "filter.dataFim": ["2026-12-20"],
      "filter.aditivo": ["true"],
    } as EstagioListInputRestDto);

    expect((query as any)["filter.nomeSupervisor"]).toEqual(["Jefferson"]);
    expect((query as any)["filter.emailSupervisor"]).toEqual(["jefferson@ifro.edu.br"]);
    expect((query as any)["filter.usuarioOrientador.matricula"]).toEqual(["2291377"]);
    expect((query as any)["filter.usuarioOrientador.id"]).toEqual(["orientador-id"]);
    expect((query as any)["filter.usuarioOrientador.nome"]).toEqual(["Emi Silva"]);
    expect((query as any)["filter.dataInicio"]).toEqual(["2026-04-20"]);
    expect((query as any)["filter.dataFim"]).toEqual(["2026-12-20"]);
    expect((query as any)["filter.aditivo"]).toEqual(["true"]);
  });

  it("should map direct status filter and filter.status", () => {
    const fromDirect = EstagioRestMapper.listInputDtoToListQuery.map({
      status: ["DISPONIVEL"],
    } as EstagioListInputRestDto);
    expect((fromDirect as any)["filter.status"]).toEqual(["DISPONIVEL"]);
    expect(fromDirect.filterStatus).toEqual(["DISPONIVEL"]);

    const fromPrefixed = EstagioRestMapper.listInputDtoToListQuery.map({
      "filter.status": ["EM_ANDAMENTO"],
    } as EstagioListInputRestDto);
    expect((fromPrefixed as any)["filter.status"]).toEqual(["EM_ANDAMENTO"]);
    expect(fromPrefixed.filterStatus).toEqual(["EM_ANDAMENTO"]);
  });

  it("should map disponivel=true to null estagiario and DISPONIVEL status", () => {
    const query = EstagioRestMapper.listInputDtoToListQuery.map({
      disponivel: true,
    } as EstagioListInputRestDto);
    expect((query as any)["filter.estagiario.id"]).toEqual("$null");
    expect((query as any)["filter.status"]).toEqual(["DISPONIVEL"]);
    expect(query.filterStatus).toEqual(["DISPONIVEL"]);
  });

  it("should map cursoId and filter.curso.id to CursoReferencia.id", () => {
    const fromCursoId = EstagioRestMapper.listInputDtoToListQuery.map({
      cursoId: ["curso-uuid-1"],
    } as EstagioListInputRestDto);
    expect((fromCursoId as any)["filter.CursoReferencia.id"]).toEqual(["curso-uuid-1"]);

    const fromPrefixed = EstagioRestMapper.listInputDtoToListQuery.map({
      "filter.curso.id": ["curso-uuid-2"],
    } as EstagioListInputRestDto);
    expect((fromPrefixed as any)["filter.CursoReferencia.id"]).toEqual(["curso-uuid-2"]);
  });

  it("should have all expected filterable and searchable columns in estagioPaginationSpec", () => {
    expect(estagioPaginationSpec.filterableColumns).toHaveProperty(
      "estagiario.perfil.usuario.matricula",
    );
    expect(estagioPaginationSpec.filterableColumns).toHaveProperty(
      "estagiario.perfil.usuario.nome",
    );
    expect(estagioPaginationSpec.filterableColumns).toHaveProperty("empresa.cnpj");
    expect(estagioPaginationSpec.filterableColumns).toHaveProperty("empresa.razaoSocial");
    expect(estagioPaginationSpec.filterableColumns).toHaveProperty("empresa.nomeFantasia");
    expect(estagioPaginationSpec.filterableColumns).toHaveProperty("nomeSupervisor");
    expect(estagioPaginationSpec.filterableColumns).toHaveProperty("usuarioOrientador.nome");
    expect(estagioPaginationSpec.filterableColumns).toHaveProperty("dataInicio");
    expect(estagioPaginationSpec.filterableColumns).toHaveProperty("dataFim");
    expect(estagioPaginationSpec.filterableColumns).toHaveProperty("aditivo");

    expect(estagioPaginationSpec.searchableColumns).toContain("nomeSupervisor");
    expect(estagioPaginationSpec.searchableColumns).toContain("empresa.nomeFantasia");
    expect(estagioPaginationSpec.searchableColumns).toContain("estagiario.perfil.usuario.nome");
    expect(estagioPaginationSpec.searchableColumns).toContain(
      "estagiario.perfil.usuario.matricula",
    );
  });
});
