import { DataSource } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  EmpresaCreateCommand,
  EmpresaUpdateCommand,
} from "@/modules/estagio/empresa/domain/commands";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa";
import type {
  EmpresaFindOneQuery,
  EmpresaFindOneQueryResult,
  EmpresaListQuery,
  EmpresaListQueryResult,
} from "@/modules/estagio/empresa/domain/queries";
import type { IEmpresaRepository } from "@/modules/estagio/empresa/domain/repositories";
import { Endereco } from "@/modules/localidades/endereco/domain/endereco";
import { createEnderecoRepository } from "@/modules/localidades/endereco/infrastructure.database/typeorm/endereco.typeorm.repository";
import { createEmpresaRepository, EmpresaMapper } from "./typeorm";

@DeclareImplementation()
export class EmpresaTypeOrmRepositoryAdapter implements IEmpresaRepository {
  constructor(@DeclareDependency(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource) {}

  private get repository() {
    return createEmpresaRepository(this.dataSource);
  }

  private get enderecoRepository() {
    return createEnderecoRepository(this.dataSource);
  }

  async findAll(
    accessContext: AccessContext | null,
    dto: EmpresaListQuery | null = null,
    selection?: string[] | boolean | null,
  ): Promise<EmpresaListQueryResult> {
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

    const filterCnpj = dto?.["filter.cnpj"];
    if (filterCnpj) {
      const arr = Array.isArray(filterCnpj) ? filterCnpj : [filterCnpj];
      const validCnpjs = arr.filter((cnpj) => typeof cnpj === "string" && cnpj.trim());
      if (validCnpjs.length > 0) {
        query.andWhere("empresa.cnpj IN (:...cnpjs)", {
          cnpjs: validCnpjs,
        });
      }
    }

    const filterNomeFantasia = dto?.["filter.nomeFantasia"];
    if (filterNomeFantasia) {
      const arr = Array.isArray(filterNomeFantasia) ? filterNomeFantasia : [filterNomeFantasia];
      const validNomes = arr.filter((nome) => typeof nome === "string" && nome.trim());
      if (validNomes.length > 0) {
        query.andWhere("empresa.nomeFantasia IN (:...nomes)", {
          nomes: validNomes,
        });
      }
    }

    const filterIdEnderecoFk = dto?.["filter.idEnderecoFk"];
    if (filterIdEnderecoFk) {
      const arr = Array.isArray(filterIdEnderecoFk) ? filterIdEnderecoFk : [filterIdEnderecoFk];
      const validIdEnderecos = arr.filter((id) => typeof id === "string" && id.trim());
      if (validIdEnderecos.length > 0) {
        query.andWhere("empresa.idEnderecoFk IN (:...idEnderecos)", {
          idEnderecos: validIdEnderecos,
        });
      }
    }

    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    return {
      meta: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        itemsPerPage: limit,
        totalItems: total,
        sortBy: [],
        filter: {},
        search: dto?.search ?? "",
      },
      data: data.map((entity) => EmpresaMapper.toOutputDto(entity)),
    };
  }

  async findById(
    accessContext: AccessContext | null,
    dto: EmpresaFindOneQuery,
    selection?: string[] | boolean | null,
  ): Promise<EmpresaFindOneQueryResult | null> {
    const entity = await this.repository.findOne({
      where: { id: dto.id, dateDeleted: null as any },
    });

    if (!entity) {
      return null;
    }

    return EmpresaMapper.toOutputDto(entity);
  }

  async create(
    accessContext: AccessContext | null,
    dto: EmpresaCreateCommand,
  ): Promise<EmpresaFindOneQueryResult> {
    const endereco = await this.enderecoRepository.findOne({
      where: { id: dto.idEnderecoFk, dateDeleted: null as any },
    });

    ensureExists(endereco, Endereco.entityName, dto.idEnderecoFk);

    const empresa = Empresa.create(dto);

    const entity = EmpresaMapper.toPersistence(empresa);
    const saved = await this.repository.save(entity);

    return EmpresaMapper.toOutputDto(saved);
  }

  async update(
    accessContext: AccessContext | null,
    id: string,
    dto: EmpresaUpdateCommand,
  ): Promise<EmpresaFindOneQueryResult> {
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

    empresa.update(dto);

    const updated = EmpresaMapper.toPersistence(empresa);
    const saved = await this.repository.save(updated);

    return EmpresaMapper.toOutputDto(saved);
  }

  async delete(accessContext: AccessContext | null, id: string): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id, dateDeleted: null as any },
    });

    ensureExists(entity, Empresa.entityName, id);

    entity.dateDeleted = new Date();
    await this.repository.save(entity);
  }
}
