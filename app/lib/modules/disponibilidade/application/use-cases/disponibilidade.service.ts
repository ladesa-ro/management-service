import { Inject, Injectable } from "@nestjs/common";
import { pick } from "lodash";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  DisponibilidadeCreateInput,
  DisponibilidadeFindOneInput,
  DisponibilidadeFindOneOutput,
  DisponibilidadeListInput,
  DisponibilidadeListOutput,
  DisponibilidadeUpdateInput,
} from "@/modules/disponibilidade/application/dtos";
import {
  DISPONIBILIDADE_REPOSITORY_PORT,
  type IDisponibilidadeRepositoryPort,
  type IDisponibilidadeUseCasePort,
} from "@/modules/disponibilidade/application/ports";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

@Injectable()
export class DisponibilidadeService implements IDisponibilidadeUseCasePort {
  constructor(
    @Inject(DISPONIBILIDADE_REPOSITORY_PORT)
    private readonly disponibilidadeRepository: IDisponibilidadeRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: DisponibilidadeListInput | null = null,
  ): Promise<DisponibilidadeListOutput> {
    return this.disponibilidadeRepository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInput,
  ): Promise<DisponibilidadeFindOneOutput | null> {
    return this.disponibilidadeRepository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInput,
  ): Promise<DisponibilidadeFindOneOutput> {
    const disponibilidade = await this.disponibilidadeRepository.findById(accessContext, dto);

    if (!disponibilidade) {
      throw new ResourceNotFoundError("Disponibilidade", dto.id);
    }

    return disponibilidade;
  }

  async create(
    accessContext: AccessContext,
    dto: DisponibilidadeCreateInput,
  ): Promise<DisponibilidadeFindOneOutput> {
    const dtoDisponibilidade = pick(dto, ["dataInicio", "dataFim"]);

    const disponibilidade = this.disponibilidadeRepository.create();
    this.disponibilidadeRepository.merge(disponibilidade, { ...dtoDisponibilidade });

    await this.disponibilidadeRepository.save(disponibilidade);

    return this.findByIdStrict(accessContext, { id: disponibilidade.id });
  }

  async update(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInput & DisponibilidadeUpdateInput,
  ): Promise<DisponibilidadeFindOneOutput> {
    const disponibilidade = await this.findByIdStrict(accessContext, { id: dto.id });

    const dtoDisponibilidade = pick(dto, ["dataInicio", "dataFim"]);
    const entity = this.disponibilidadeRepository.create();
    this.disponibilidadeRepository.merge(entity, { id: disponibilidade.id, ...dtoDisponibilidade });

    await this.disponibilidadeRepository.save(entity);

    return this.findByIdStrict(accessContext, { id: dto.id });
  }

  async deleteOneById(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInput,
  ): Promise<boolean> {
    await this.findByIdStrict(accessContext, dto);
    await this.disponibilidadeRepository.softDeleteById(dto.id);
    return true;
  }

  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
  ): Promise<DisponibilidadeFindOneOutput> {
    return this.findByIdStrict(accessContext, { id });
  }
}
