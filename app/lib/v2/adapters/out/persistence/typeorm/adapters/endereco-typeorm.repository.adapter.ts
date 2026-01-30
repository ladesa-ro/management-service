import { Injectable } from "@nestjs/common";
import type { DeepPartial } from "typeorm";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { EnderecoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { IEnderecoRepositoryPort } from "@/v2/core/endereco/application/ports";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import { QbEfficientLoad } from "@/v2/old/shared";
import type {
  EnderecoFindOneInputDto,
  EnderecoFindOneOutputDto,
  EnderecoInputDto,
} from "@/v2/server/modules/endereco/http/dto";

const aliasEndereco = "endereco";

/**
 * Adapter TypeORM que implementa o port de repositório de Endereco
 * Encapsula toda a lógica de acesso a dados usando TypeORM
 */
@Injectable()
export class EnderecoTypeOrmRepositoryAdapter implements IEnderecoRepositoryPort {
  constructor(private databaseContext: DatabaseContextService) {}

  private get enderecoRepository() {
    return this.databaseContext.enderecoRepository;
  }

  async findOneById(id: string): Promise<EnderecoFindOneOutputDto | null> {
    const endereco = await this.enderecoRepository.findOne({
      where: {
        id: id,
      },
    });

    return endereco as EnderecoFindOneOutputDto | null;
  }

  async findById(
    accessContext: AccessContext,
    dto: EnderecoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EnderecoFindOneOutputDto | null> {
    const qb = this.enderecoRepository.createQueryBuilder(aliasEndereco);

    await accessContext.applyFilter("endereco:find", qb, aliasEndereco, null);

    qb.andWhere(`${aliasEndereco}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("EnderecoFindOneOutput", qb, aliasEndereco, selection);

    const endereco = await qb.getOne();

    return endereco as EnderecoFindOneOutputDto | null;
  }

  async exists(id: string): Promise<boolean> {
    return this.enderecoRepository.exists({ where: { id } });
  }

  async save(endereco: DeepPartial<EnderecoEntity>): Promise<EnderecoEntity> {
    return this.enderecoRepository.save(endereco);
  }

  create(): EnderecoEntity {
    return this.enderecoRepository.create();
  }

  merge(endereco: EnderecoEntity, data: EnderecoInputDto): void {
    this.enderecoRepository.merge(endereco, data);
  }
}
