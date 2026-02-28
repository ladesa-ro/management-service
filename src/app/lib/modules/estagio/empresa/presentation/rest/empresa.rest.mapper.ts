import {
  EmpresaCreateInputRestDto,
  EmpresaFindOneInputRestDto,
  EmpresaFindOneOutputRestDto,
  EmpresaListInputRestDto,
  EmpresaListOutputRestDto,
  EmpresaUpdateInputRestDto,
} from "./empresa.rest.dto";
import type {
  EmpresaCreateInputDto,
  EmpresaFindOneInputDto,
  EmpresaFindOneOutputDto,
  EmpresaListInputDto,
  EmpresaListOutputDto,
  EmpresaUpdateInputDto,
} from "@/modules/estagio/empresa/application/dtos";

/**
 * Mapeador de DTOs REST para aplicação
 */
export class EmpresaRestMapper {
  static toCreateInput(dto: EmpresaCreateInputRestDto): EmpresaCreateInputDto {
    return {
      razaoSocial: dto.razaoSocial,
      nomeFantasia: dto.nomeFantasia,
      cnpj: dto.cnpj,
      telefone: dto.telefone,
      email: dto.email,
      idEnderecoFk: dto.idEnderecoFk,
    };
  }

  static toUpdateInput(dto: EmpresaUpdateInputRestDto): EmpresaUpdateInputDto {
    return {
      razaoSocial: dto.razaoSocial,
      nomeFantasia: dto.nomeFantasia,
      cnpj: dto.cnpj,
      telefone: dto.telefone,
      email: dto.email,
      idEnderecoFk: dto.idEnderecoFk,
    };
  }

  static toFindOneInput(dto: EmpresaFindOneInputRestDto): EmpresaFindOneInputDto {
    return {
      id: dto.id,
    };
  }

  static toListInput(dto: EmpresaListInputRestDto): EmpresaListInputDto {
    const normalizeCnpj = (value: string | string[] | undefined): string[] | undefined => {
      if (!value) return undefined;
      const arr = Array.isArray(value) ? value : [value];
      const filtered = arr.filter((c) => c && c.trim());
      return filtered.length > 0 ? filtered : undefined;
    };

    const normalizeIdEndereco = (value: string | string[] | undefined): string[] | undefined => {
      if (!value) return undefined;
      const arr = Array.isArray(value) ? value : [value];
      const filtered = arr.filter((id) => id && id.trim());
      return filtered.length > 0 ? filtered : undefined;
    };

    return {
      page: dto.page,
      limit: dto.limit,
      search: dto.search,
      filterCnpj: normalizeCnpj(dto["filter.cnpj"]),
      filterIdEnderecoFk: normalizeIdEndereco(dto["filter.idEnderecoFk"]),
    };
  }

  static toFindOneOutputDto(
    data: EmpresaFindOneOutputDto,
  ): EmpresaFindOneOutputRestDto {
    return {
      id: data.id,
      razaoSocial: data.razaoSocial,
      nomeFantasia: data.nomeFantasia,
      cnpj: data.cnpj,
      telefone: data.telefone,
      email: data.email,
      idEnderecoFk: data.idEnderecoFk,
      ativo: data.ativo,
      dateCreated: data.dateCreated,
      dateUpdated: data.dateUpdated,
    };
  }

  static toListOutputDto(data: EmpresaListOutputDto): EmpresaListOutputRestDto {
    return {
      data: data.data.map((item) => this.toFindOneOutputDto(item)),
      total: data.total,
      page: data.page,
      limit: data.limit,
    };
  }
}
