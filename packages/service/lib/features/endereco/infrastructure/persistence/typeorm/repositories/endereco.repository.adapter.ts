import { pick } from "lodash";
import { DataSource, Repository } from "typeorm";
import { CidadeDatabaseEntity } from "@/features/cidade";
import {
  Endereco,
  EnderecoCreateInputDto,
  EnderecoFindOneByIdOutputDto,
  EnderecoUpdateInputDto,
  type IEnderecoRepositoryPort
} from "@/features/endereco";
import { EnderecoDatabaseEntity } from "@/features/endereco/infrastructure";
import { EfficientLoadAndSelect } from "@/infrastructure/persistence/typeorm/utils";

export class EnderecoRepositoryAdapter implements IEnderecoRepositoryPort {
  private enderecoTypeOrmRepository: Repository<EnderecoDatabaseEntity>;
  private cidadeTypeOrmRepository: Repository<CidadeDatabaseEntity>;

  constructor(dataSource: DataSource) {
    this.enderecoTypeOrmRepository = dataSource.getRepository(EnderecoDatabaseEntity);
    this.cidadeTypeOrmRepository = dataSource.getRepository(CidadeDatabaseEntity);
  }

  public async findById(id: Endereco["id"], selection?: string[]): Promise<EnderecoFindOneByIdOutputDto | null> {
    const query = this.enderecoTypeOrmRepository.createQueryBuilder("endereco");
    EfficientLoadAndSelect(query, selection);
    query.andWhere("endereco.id = :id", {id});
    return query.getOne();
  }

  public async create(inputDto: EnderecoCreateInputDto) {
    const endereco = this.enderecoTypeOrmRepository.create();

    this.enderecoTypeOrmRepository.merge(endereco, pick(inputDto, ["cep", "logradouro", "numero", "bairro", "complemento", "pontoReferencia"]));

    const cidade = await this.cidadeTypeOrmRepository.findOne({where: {id: endereco.cidade.id}});

    if (!cidade) {
      throw new Error("endereco.cidade.id not found");
    }

    this.enderecoTypeOrmRepository.merge(endereco, {
      cidade: {
        id: cidade.id,
      },
    });

    await this.enderecoTypeOrmRepository.save(endereco);

    return {
      id: endereco.id,
    };
  }

  public async updateOneById(inputDto: EnderecoUpdateInputDto) {
    const endereco = await this.enderecoTypeOrmRepository.findOne({
      where: {
        id: inputDto.targetEntity.id,
      },
      select: ["id"],
    });

    if (!endereco) {
      throw new Error("endereco not found");
    }

    this.enderecoTypeOrmRepository.merge(endereco, pick(inputDto.data, ["cep", "logradouro", "numero", "bairro", "complemento", "pontoReferencia"]));

    if ("cidade" in inputDto.data && inputDto.data.cidade) {
      const cidade = await this.cidadeTypeOrmRepository.findOne({where: {id: inputDto.data.cidade.id}});

      if (!cidade) {
        throw new Error("endereco.cidade.id not found");
      }

      this.enderecoTypeOrmRepository.merge(endereco, {
        cidade: {
          id: cidade.id,
        },
      });
    }

    await this.enderecoTypeOrmRepository.save(endereco);

    return {
      id: endereco.id,
    };
  }

  async deleteOneById(id: Endereco["id"]): Promise<{ id: Endereco["id"] }> {
    const endereco = await this.enderecoTypeOrmRepository.findOne({
      where: {id: id},
      select: ["id"],
    });

    if (!endereco) {
      throw new Error("endereco not found");
    }

    await this.enderecoTypeOrmRepository.delete(endereco.id);

    return {
      id: endereco.id,
    };
  }
}
