import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
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
import { EnderecoEntity } from "@/modules/localidades/endereco/infrastructure.database/typeorm/endereco.typeorm.entity";
import type { AccessContext } from "@/server/access-context";
import { EmpresaMapper, EmpresaTypeormEntity } from "./typeorm";

@DeclareImplementation()
export class EmpresaTypeOrmRepositoryAdapter implements IEmpresaRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  private get repository() {
    return this.appTypeormConnection.getRepository(EmpresaTypeormEntity);
  }

  // cross-module: uses TypeORM directly for existence check (EnderecoEntity)
  private get enderecoRepository() {
    return this.appTypeormConnection.getRepository(EnderecoEntity);
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
      .leftJoinAndSelect("empresa.endereco", "endereco")
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

    const filterEnderecoId = dto?.["filter.endereco.id"];
    if (filterEnderecoId) {
      const arr = Array.isArray(filterEnderecoId) ? filterEnderecoId : [filterEnderecoId];
      const validIdEnderecos = arr.filter((id) => typeof id === "string" && id.trim());
      if (validIdEnderecos.length > 0) {
        query.andWhere("endereco.id IN (:...idEnderecos)", {
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
      relations: ["endereco"],
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
      where: { id: dto.endereco.id, dateDeleted: null as any },
    });

    ensureExists(endereco, Endereco.entityName, dto.endereco.id);

    const empresa = Empresa.create(dto);

    const entity = EmpresaMapper.toPersistence(empresa);
    const saved = await this.repository.save(entity);

    const result = await this.repository.findOne({
      where: { id: saved.id },
      relations: ["endereco"],
    });

    return EmpresaMapper.toOutputDto(result!);
  }

  async update(
    accessContext: AccessContext | null,
    id: string,
    dto: EmpresaUpdateCommand,
  ): Promise<EmpresaFindOneQueryResult> {
    const entity = await this.repository.findOne({
      where: { id, dateDeleted: null as any },
      relations: ["endereco"],
    });

    ensureExists(entity, Empresa.entityName, id);

    const empresa = EmpresaMapper.toDomain(entity);

    if (dto.endereco) {
      const endereco = await this.enderecoRepository.findOne({
        where: { id: dto.endereco.id, dateDeleted: null as any },
      });

      ensureExists(endereco, Endereco.entityName, dto.endereco.id);
    }

    empresa.update(dto);

    const updated = EmpresaMapper.toPersistence(empresa);
    const saved = await this.repository.save(updated);

    const result = await this.repository.findOne({
      where: { id: saved.id },
      relations: ["endereco"],
    });

    return EmpresaMapper.toOutputDto(result!);
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
