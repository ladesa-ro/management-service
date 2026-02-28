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
    return {
      page: dto.page,
      limit: dto.limit,
      search: dto.search,
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
