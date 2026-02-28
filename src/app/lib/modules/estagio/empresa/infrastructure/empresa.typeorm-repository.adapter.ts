import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import {
  APP_DATA_SOURCE_TOKEN,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import type {
  EmpresaCreateInputDto,
  EmpresaFindOneInputDto,
  EmpresaFindOneOutputDto,
  EmpresaListInputDto,
  EmpresaListOutputDto,
  EmpresaUpdateInputDto,
} from "@/modules/estagio/empresa/application/dtos";
import type { IEmpresaRepositoryPort } from "@/modules/estagio/empresa/application/ports";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa.domain";
import { createEnderecoRepository } from "@/modules/localidades/endereco/infrastructure/persistence/typeorm/endereco.repository";
import {
  EmpresaTypeormEntity,
  EmpresaMapper,
  createEmpresaRepository,
} from "./persistence";

@Injectable()
export class EmpresaTypeOrmRepositoryAdapter implements IEmpresaRepositoryPort {
  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource,
  ) {}

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

    const [data, total] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount();

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

    if (!endereco) {
      throw new ResourceNotFoundError("Endereco", dto.idEnderecoFk);
    }

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

    if (!entity) {
      throw new ResourceNotFoundError("Empresa", id);
    }

    const empresa = EmpresaMapper.toDomain(entity);

    if (dto.idEnderecoFk) {
      const endereco = await this.enderecoRepository.findOne({
        where: { id: dto.idEnderecoFk, dateDeleted: null as any },
      });

      if (!endereco) {
        throw new ResourceNotFoundError("Endereco", dto.idEnderecoFk);
      }
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

    if (!entity) {
      throw new ResourceNotFoundError("Empresa", id);
    }

    entity.dateDeleted = new Date();
    await this.repository.save(entity);
  }
}
