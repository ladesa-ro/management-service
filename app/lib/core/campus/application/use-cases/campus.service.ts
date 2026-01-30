import { Inject, Injectable } from "@nestjs/common";
import { get, pick } from "lodash";
import { v4 } from "uuid";
import { ResourceNotFoundError } from "@/core/@shared";
import {
  CampusCreateInput,
  CampusFindOneInput,
  CampusFindOneOutput,
  CampusListInput,
  CampusListOutput,
  CampusUpdateInput,
} from "@/core/campus/application/dtos";
import {
  CAMPUS_REPOSITORY_PORT,
  type ICampusRepositoryPort,
  type ICampusUseCasePort,
} from "@/core/campus/application/ports";
import { type EnderecoInputDto, EnderecoService } from "@/core/endereco";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { CampusEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

/**
 * Service centralizado para o módulo Campus.
 * Implementa todos os use cases definidos em ICampusUseCasePort.
 *
 * Por enquanto, toda a lógica fica aqui. Futuramente, pode ser
 * desmembrado em use cases individuais se necessário.
 */
@Injectable()
export class CampusService implements ICampusUseCasePort {
  constructor(
    @Inject(CAMPUS_REPOSITORY_PORT)
    private readonly campusRepository: ICampusRepositoryPort,
    private readonly enderecoService: EnderecoService,
    private readonly databaseContext: DatabaseContextService,
  ) {}

  async campusFindAll(
    accessContext: AccessContext,
    dto: CampusListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<CampusListOutput> {
    return this.campusRepository.findAll(accessContext, dto, selection);
  }

  async campusFindById(
    accessContext: AccessContext,
    dto: CampusFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput | null> {
    return this.campusRepository.findById(accessContext, dto, selection);
  }

  async campusFindByIdStrict(
    accessContext: AccessContext,
    dto: CampusFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput> {
    const campus = await this.campusRepository.findById(accessContext, dto, selection);

    if (!campus) {
      throw new ResourceNotFoundError("Campus", dto.id);
    }

    return campus;
  }

  async campusFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput | null> {
    return this.campusRepository.findByIdSimple(accessContext, id, selection);
  }

  async campusFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput> {
    const campus = await this.campusRepository.findByIdSimple(accessContext, id, selection);

    if (!campus) {
      throw new ResourceNotFoundError("Campus", id);
    }

    return campus;
  }

  async campusCreate(
    accessContext: AccessContext,
    dto: CampusCreateInput,
  ): Promise<CampusFindOneOutput> {
    await accessContext.ensurePermission("campus:create", { dto } as any);

    const campus = await this.databaseContext.transaction(
      async ({ databaseContext: { campusRepository } }) => {
        const dtoCampus = pick(dto, ["nomeFantasia", "razaoSocial", "apelido", "cnpj"]);

        const campus = campusRepository.create();

        campusRepository.merge(campus, {
          ...dtoCampus,
        });

        campusRepository.merge(campus, {
          id: v4(),
        });

        const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(
          null,
          dto.endereco,
        );

        campusRepository.merge(campus, {
          endereco: {
            id: endereco.id,
          },
        });

        await campusRepository.save(campus);

        return campus;
      },
    );

    return this.campusFindByIdStrict(accessContext, { id: campus.id });
  }

  async campusUpdate(
    accessContext: AccessContext,
    dto: CampusFindOneInput & CampusUpdateInput,
  ): Promise<CampusFindOneOutput> {
    const currentCampus = await this.campusFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission("campus:update", { dto }, dto.id);

    const campus = await this.databaseContext.transaction(
      async ({ databaseContext: { campusRepository } }) => {
        const dtoCampus = pick(dto, ["nomeFantasia", "razaoSocial", "apelido", "cnpj"]);

        const campus = {
          id: currentCampus.id,
        } as CampusEntity;

        campusRepository.merge(campus, {
          ...dtoCampus,
        });

        campusRepository.merge(campus, { id: currentCampus.id });

        const dtoEndereco = get(dto, "endereco");

        if (dtoEndereco) {
          const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(
            currentCampus.endereco.id,
            dtoEndereco as EnderecoInputDto,
          );

          campusRepository.merge(campus, {
            endereco: {
              id: endereco.id,
            },
          });
        }

        await campusRepository.save(campus);

        return campus;
      },
    );

    return this.campusFindByIdStrict(accessContext, { id: campus.id });
  }

  async campusDeleteOneById(
    accessContext: AccessContext,
    dto: CampusFindOneInput,
  ): Promise<boolean> {
    await accessContext.ensurePermission("campus:delete", { dto }, dto.id);

    const campus = await this.campusFindByIdStrict(accessContext, dto);

    if (campus) {
      await this.campusRepository.softDeleteById(campus.id);
    }

    return true;
  }
}
