import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  EmpresaCreateInputDto,
  EmpresaFindOneInputDto,
  EmpresaFindOneOutputDto,
  EmpresaListInputDto,
  EmpresaListOutputDto,
  EmpresaUpdateInputDto,
} from "@/modules/estagio/empresa/application/dtos";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa.domain";
import type { IEmpresaRepository } from "@/modules/estagio/empresa/domain/repositories";
import { Endereco } from "@/modules/localidades/endereco/domain/endereco.domain";
import { createEnderecoRepository } from "@/modules/localidades/endereco/infrastructure/persistence/typeorm/endereco.repository";
import { createEmpresaRepository, EmpresaMapper } from "./persistence";

@Injectable()
export class EmpresaTypeOrmRepositoryAdapter implements IEmpresaRepository {
  constructor(@Inject(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource) {}

  private get repository() {
    return createEmpresaRepository(this.dataSource);
  }

  private get enderecoRepository() {
    return createEnderecoRepository(this.dataSource);
  }

  async findAll(
    accessContext: AccessContext,
    dto: EmpresaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<EmpresaListOutputDto> {
    const page = dto?.page || 1;
    const limit = dto?.limit || 10;
    const skip = (page - 1) * limit;

    const query = this.repository
      .createQueryBuilder("empresa")
      .where("empresa.dateDeleted IS NULL");

    if (dto?.search) {
      query.andWhere(
        "(empresa.razaoSocial ILIKE :search OR empresa.nomeFantasia ILIKE :search OR empresa.cnpj ILIKE :search OR empresa.email ILIKE :search)",
        {
          search: `%${dto.search}%`,
        },
      );
    }

    if (dto?.filterCnpj && Array.isArray(dto.filterCnpj) && dto.filterCnpj.length > 0) {
      const validCnpjs = dto.filterCnpj.filter((cnpj) => cnpj && cnpj.trim());
      if (validCnpjs.length > 0) {
        query.andWhere("empresa.cnpj IN (:...cnpjs)", {
          cnpjs: validCnpjs,
        });
      }
    }

    if (
      dto?.filterNomeFantasia &&
      Array.isArray(dto.filterNomeFantasia) &&
      dto.filterNomeFantasia.length > 0
    ) {
      const validNomes = dto.filterNomeFantasia.filter((nome) => nome && nome.trim());
      if (validNomes.length > 0) {
        query.andWhere("empresa.nomeFantasia IN (:...nomes)", {
          nomes: validNomes,
        });
      }
    }

    if (
      dto?.filterIdEnderecoFk &&
      Array.isArray(dto.filterIdEnderecoFk) &&
      dto.filterIdEnderecoFk.length > 0
    ) {
      const validIdEnderecos = dto.filterIdEnderecoFk.filter((id) => id && id.trim());
      if (validIdEnderecos.length > 0) {
        query.andWhere("empresa.idEnderecoFk IN (:...idEnderecos)", {
          idEnderecos: validIdEnderecos,
        });
      }
    }

    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    return {
      data: data.map((entity) => EmpresaMapper.toOutputDto(entity)),
      total,
      page,
      limit,
    };
  }

  async findById(
    accessContext: AccessContext | null,
    dto: EmpresaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EmpresaFindOneOutputDto | null> {
    const entity = await this.repository.findOne({
      where: { id: dto.id, dateDeleted: null as any },
    });

    if (!entity) {
      return null;
    }

    return EmpresaMapper.toOutputDto(entity);
  }

  async create(
    accessContext: AccessContext,
    dto: EmpresaCreateInputDto,
  ): Promise<EmpresaFindOneOutputDto> {
    const endereco = await this.enderecoRepository.findOne({
      where: { id: dto.idEnderecoFk, dateDeleted: null as any },
    });

    ensureExists(endereco, Endereco.entityName, dto.idEnderecoFk);

    const empresa = Empresa.criar(dto);

    const entity = EmpresaMapper.toPersistence(empresa);
    const saved = await this.repository.save(entity);

    return EmpresaMapper.toOutputDto(saved);
  }

  async update(
    accessContext: AccessContext,
    id: string,
    dto: EmpresaUpdateInputDto,
  ): Promise<EmpresaFindOneOutputDto> {
    const entity = await this.repository.findOne({
      where: { id, dateDeleted: null as any },
    });

    ensureExists(entity, Empresa.entityName, id);

    const empresa = EmpresaMapper.toDomain(entity);

    if (dto.idEnderecoFk) {
      const endereco = await this.enderecoRepository.findOne({
        where: { id: dto.idEnderecoFk, dateDeleted: null as any },
      });

      ensureExists(endereco, Endereco.entityName, dto.idEnderecoFk);
    }

    empresa.atualizar(dto);

    const updated = EmpresaMapper.toPersistence(empresa);
    const saved = await this.repository.save(updated);

    return EmpresaMapper.toOutputDto(saved);
  }

  async delete(accessContext: AccessContext, id: string): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id, dateDeleted: null as any },
    });

    ensureExists(entity, Empresa.entityName, id);

    entity.dateDeleted = new Date();
    await this.repository.save(entity);
  }
}
