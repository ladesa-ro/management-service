import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa";
import type { EmpresaFindOneQueryResult } from "@/modules/estagio/empresa/domain/queries";
import { EmpresaTypeormEntity } from "./empresa.typeorm.entity";

/**
 * Mapeador de dados entre domínio e TypeORM
 */
export class EmpresaMapper {
  /**
   * Converte entidade TypeORM para domínio
   */
  static toDomain(entity: EmpresaTypeormEntity): Empresa {
    const empresa = Empresa.load({
      id: entity.id,
      razaoSocial: entity.razaoSocial,
      nomeFantasia: entity.nomeFantasia,
      cnpj: entity.cnpj,
      telefone: entity.telefone,
      email: entity.email,
      idEnderecoFk: entity.idEnderecoFk,
      dateCreated: entity.dateCreated.toISOString(),
      dateUpdated: entity.dateUpdated.toISOString(),
      dateDeleted: entity.dateDeleted ? entity.dateDeleted.toISOString() : null,
    });
    return empresa;
  }

  /**
   * Converte domínio para TypeORM
   */
  static toPersistence(empresa: Empresa): EmpresaTypeormEntity {
    const entity = new EmpresaTypeormEntity();
    entity.id = empresa.id || generateUuidV7();
    entity.razaoSocial = empresa.razaoSocial;
    entity.nomeFantasia = empresa.nomeFantasia;
    entity.cnpj = empresa.cnpj;
    entity.telefone = empresa.telefone;
    entity.email = empresa.email;
    entity.idEnderecoFk = empresa.idEnderecoFk;
    entity.endereco = { id: empresa.idEnderecoFk } as any;
    entity.dateCreated = new Date(empresa.dateCreated);
    entity.dateUpdated = new Date(empresa.dateUpdated);
    entity.dateDeleted = empresa.dateDeleted ? new Date(empresa.dateDeleted) : null;
    return entity;
  }

  /**
   * Converte TypeORM para DTO output
   */
  static toOutputDto(entity: EmpresaTypeormEntity): EmpresaFindOneQueryResult {
    return {
      id: entity.id,
      razaoSocial: entity.razaoSocial,
      nomeFantasia: entity.nomeFantasia,
      cnpj: entity.cnpj,
      telefone: entity.telefone,
      email: entity.email,
      idEnderecoFk: entity.idEnderecoFk,
      ativo: !entity.dateDeleted,
      dateCreated: entity.dateCreated.toISOString(),
      dateUpdated: entity.dateUpdated.toISOString(),
    };
  }

  /**
   * Converte domínio para DTO output
   */
  static domainToOutputDto(empresa: Empresa): EmpresaFindOneQueryResult {
    return {
      id: empresa.id!,
      razaoSocial: empresa.razaoSocial,
      nomeFantasia: empresa.nomeFantasia,
      cnpj: empresa.cnpj,
      telefone: empresa.telefone,
      email: empresa.email,
      idEnderecoFk: empresa.idEnderecoFk,
      ativo: empresa.ativo,
      dateCreated: empresa.dateCreated,
      dateUpdated: empresa.dateUpdated,
    };
  }
}
