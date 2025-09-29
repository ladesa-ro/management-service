import { pick } from "lodash";
import { DataSource, Repository } from "typeorm";
import {
  CampusCreateInputDto,
  CampusFindOneByIdOutputDto,
  CampusListInputDto,
  CampusListOutputDto,
  CampusUpdateOneByIdInputDto,
  ICampusRepositoryPort
} from "@/features/campus/application";
import { CampusListSettings } from "@/features/campus/application/queries/campus-list.settings";
import { Campus } from "@/features/campus/domain";
import { CampusDatabaseEntity } from "@/features/campus/infrastructure";
import { EnderecoRepositoryAdapter, type IEnderecoRepositoryPort } from "@/features/endereco";
import { EfficientLoadAndSelect } from "@/infrastructure/persistence/typeorm/utils";
import { type IFilterRuleGroup, ListSettings } from "@/shared";
import {
  baseEntityListRepositoryProvider
} from "@/shared/base-entity/infrastructure/typeorm/base-entity-list.repository.provider";

export class CampusRepositoryAdapter implements ICampusRepositoryPort {
  private campusTypeormRepository: Repository<CampusDatabaseEntity>;
  private enderecoRepositoryPort: IEnderecoRepositoryPort;

  constructor(dataSource: DataSource) {
    this.campusTypeormRepository = dataSource.getRepository(CampusDatabaseEntity);
    this.enderecoRepositoryPort = new EnderecoRepositoryAdapter(dataSource);
  }

  public async findOneById(id: Campus["id"], selection?: string[]): Promise<CampusFindOneByIdOutputDto | null> {
    const query = this.campusTypeormRepository.createQueryBuilder("campus");
    EfficientLoadAndSelect(query, selection);
    query.andWhere("campus.id = :id", {id});
    return query.getOne();
  }

  public async create(inputDto: CampusCreateInputDto) {
    const campus = this.campusTypeormRepository.create();

    this.campusTypeormRepository.merge(campus, pick(inputDto, ["nomeFantasia", "razaoSocial", "apelido", "cnpj"]));

    const endereco = await this.enderecoRepositoryPort.create(inputDto.endereco);

    this.campusTypeormRepository.merge(campus, {
      endereco: {
        id: endereco.id,
      },
    });

    await this.campusTypeormRepository.save(campus);

    return {
      id: campus.id,
    };
  }

  public async updateOneById(inputDto: CampusUpdateOneByIdInputDto) {
    const campus = await this.campusTypeormRepository.findOne({
      where: {
        id: inputDto.targetEntity.id,
      },
      select: {
        id: true,
        endereco: {
          id: true,
        },
      },
      relations: ["endereco"],
    });

    if (!campus) {
      throw new Error("campus not found");
    }

    this.campusTypeormRepository.merge(campus, pick(inputDto.data, ["nomeFantasia", "razaoSocial", "apelido", "cnpj"]));

    if ("endereco" in inputDto.data && inputDto.data.endereco) {
      const endereco = await this.enderecoRepositoryPort.updateOneById({
        targetEntity: {id: campus.endereco.id},
        data: inputDto.data.endereco,
      });

      this.campusTypeormRepository.merge(campus, {
        endereco: {
          id: endereco.id,
        },
      });
    }

    await this.campusTypeormRepository.save(campus);

    return {
      id: campus.id,
    };
  }

  async deleteOneById(id: Campus["id"]): Promise<{ id: Campus["id"] }> {
    const campus = await this.campusTypeormRepository.findOne({
      where: {id: id},
      select: ["id"],
    });

    if (!campus) {
      throw new Error("campus not found");
    }

    await this.campusTypeormRepository.delete(campus.id);

    return {
      id: campus.id,
    };
  }

  public async list(allowedFilters: boolean | IFilterRuleGroup, listInputDto: CampusListInputDto, selection?: string[]): Promise<CampusListOutputDto> {
    const listSettings: ListSettings = CampusListSettings;
    const baseRepositoryList = baseEntityListRepositoryProvider(listSettings);
    const query = this.campusTypeormRepository.createQueryBuilder("campus");
    return baseRepositoryList(query, allowedFilters, listInputDto, selection);
  }
}
