import { Inject, Injectable } from "@nestjs/common";
import { get, pick } from "lodash";
import { v4 } from "uuid";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/core/@shared";
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
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly enderecoService: EnderecoService,
  ) {}

  // Generic method names
  async findAll(
    accessContext: AccessContext,
    dto: CampusListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<CampusListOutput> {
    return this.campusRepository.findAll(accessContext, dto, selection);
  }

  async findById(
    accessContext: AccessContext,
    dto: CampusFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput | null> {
    return this.campusRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
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

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CampusFindOneOutput | null> {
    return this.campusRepository.findByIdSimple(accessContext, id, selection);
  }

  async findByIdSimpleStrict(
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

  async create(accessContext: AccessContext, dto: CampusCreateInput): Promise<CampusFindOneOutput> {
    await this.authorizationService.ensurePermission("campus:create", { dto });

    const dtoCampus = pick(dto, ["nomeFantasia", "razaoSocial", "apelido", "cnpj"]);

    const campus = this.campusRepository.create();

    this.campusRepository.merge(campus, {
      ...dtoCampus,
    });

    this.campusRepository.merge(campus, {
      id: v4(),
    });

    const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(null, dto.endereco);

    this.campusRepository.merge(campus, {
      endereco: {
        id: endereco.id,
      },
    });

    await this.campusRepository.save(campus);

    return this.findByIdStrict(accessContext, { id: campus.id });
  }

  async update(
    accessContext: AccessContext,
    dto: CampusFindOneInput & CampusUpdateInput,
  ): Promise<CampusFindOneOutput> {
    const currentCampus = await this.findByIdStrict(accessContext, { id: dto.id });

    await this.authorizationService.ensurePermission("campus:update", { dto }, dto.id);

    const dtoCampus = pick(dto, ["nomeFantasia", "razaoSocial", "apelido", "cnpj"]);

    const campus = this.campusRepository.create();

    this.campusRepository.merge(campus, {
      ...dtoCampus,
    });

    this.campusRepository.merge(campus, { id: currentCampus.id });

    const dtoEndereco = get(dto, "endereco");

    if (dtoEndereco) {
      const endereco = await this.enderecoService.internalEnderecoCreateOrUpdate(
        currentCampus.endereco.id,
        dtoEndereco as EnderecoInputDto,
      );

      this.campusRepository.merge(campus, {
        endereco: {
          id: endereco.id,
        },
      });
    }

    await this.campusRepository.save(campus);

    return this.findByIdStrict(accessContext, { id: campus.id });
  }

  async deleteOneById(accessContext: AccessContext, dto: CampusFindOneInput): Promise<boolean> {
    await this.authorizationService.ensurePermission("campus:delete", { dto }, dto.id);

    const campus = await this.findByIdStrict(accessContext, dto);

    if (campus) {
      await this.campusRepository.softDeleteById(campus.id);
    }

    return true;
  }
}
