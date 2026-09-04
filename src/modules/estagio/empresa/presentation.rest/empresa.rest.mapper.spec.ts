import { describe, expect, it } from "vitest";
import { empresaPaginationSpec } from "../domain/queries";
import type { EmpresaListInputRestDto } from "./empresa.rest.dto";
import * as EmpresaRestMapper from "./empresa.rest.mapper";

describe("Empresa REST Mapper - Query Filters", () => {
  it("should map razaoSocial, email, and telefone filters", () => {
    const query = EmpresaRestMapper.listInputDtoToListQuery.map({
      "filter.razaoSocial": ["Tech LTDA"],
      "filter.email": ["contato@tech.com"],
      "filter.telefone": ["69999999999"],
    } as EmpresaListInputRestDto);

    expect(query["filter.razaoSocial"]).toEqual(["Tech LTDA"]);
    expect(query["filter.email"]).toEqual(["contato@tech.com"]);
    expect(query["filter.telefone"]).toEqual(["69999999999"]);
  });

  it("should map cidade and estado filters with aliases", () => {
    const fromAlias = EmpresaRestMapper.listInputDtoToListQuery.map({
      "filter.cidade.id": ["cidade-1"],
      "filter.cidade.nome": ["Ji-Paraná"],
      "filter.estado.id": ["estado-1"],
      "filter.estado.sigla": ["RO"],
    } as EmpresaListInputRestDto);

    expect(fromAlias["filter.endereco.cidade.id"]).toEqual(["cidade-1"]);
    expect(fromAlias["filter.endereco.cidade.nome"]).toEqual(["Ji-Paraná"]);
    expect(fromAlias["filter.endereco.cidade.estado.id"]).toEqual(["estado-1"]);
    expect(fromAlias["filter.endereco.cidade.estado.sigla"]).toEqual(["RO"]);

    const fromFullPath = EmpresaRestMapper.listInputDtoToListQuery.map({
      "filter.endereco.cidade.id": ["cidade-2"],
      "filter.endereco.cidade.nome": ["Porto Velho"],
      "filter.endereco.cidade.estado.id": ["estado-2"],
      "filter.endereco.cidade.estado.sigla": ["SP"],
    } as EmpresaListInputRestDto);

    expect(fromFullPath["filter.endereco.cidade.id"]).toEqual(["cidade-2"]);
    expect(fromFullPath["filter.endereco.cidade.nome"]).toEqual(["Porto Velho"]);
    expect(fromFullPath["filter.endereco.cidade.estado.id"]).toEqual(["estado-2"]);
    expect(fromFullPath["filter.endereco.cidade.estado.sigla"]).toEqual(["SP"]);
  });

  it("should have all expected filterable and searchable columns in empresaPaginationSpec", () => {
    expect(empresaPaginationSpec.filterableColumns).toHaveProperty("razaoSocial");
    expect(empresaPaginationSpec.filterableColumns).toHaveProperty("email");
    expect(empresaPaginationSpec.filterableColumns).toHaveProperty("telefone");
    expect(empresaPaginationSpec.filterableColumns).toHaveProperty("endereco.cidade.id");
    expect(empresaPaginationSpec.filterableColumns).toHaveProperty("endereco.cidade.nome");
    expect(empresaPaginationSpec.filterableColumns).toHaveProperty("endereco.cidade.estado.id");
    expect(empresaPaginationSpec.filterableColumns).toHaveProperty("endereco.cidade.estado.sigla");

    expect(empresaPaginationSpec.searchableColumns).toContain("telefone");
    expect(empresaPaginationSpec.searchableColumns).toContain("endereco.cidade.nome");
    expect(empresaPaginationSpec.searchableColumns).toContain("endereco.cidade.estado.sigla");
  });
});
