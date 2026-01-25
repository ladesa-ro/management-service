import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeUpdateInputDto,
} from "@/v2/adapters/in/http/disponibilidade/dto";
import type { DisponibilidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { IDisponibilidadeRepositoryPort, IDisponibilidadeUseCasePort } from "../ports";

@Injectable()
export class DisponibilidadeService implements IDisponibilidadeUseCasePort {
  constructor(
    @Inject("IDisponibilidadeRepositoryPort")
    private disponibilidadeRepository: IDisponibilidadeRepositoryPort,
  ) {}

  async disponibilidadeFindAll(
    accessContext: AccessContext,
    dto: DisponibilidadeListInputDto | null = null,
    selection?: string[],
  ): Promise<DisponibilidadeListOutputDto> {
    return this.disponibilidadeRepository.findAll(accessContext, dto, selection);
  }

  async disponibilidadeFindById(
    accessContext: AccessContext | null,
    dto: DisponibilidadeFindOneInputDto,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto | null> {
    return this.disponibilidadeRepository.findById(accessContext, dto, selection);
  }

  async disponibilidadeFindByIdStrict(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto> {
    const disponibilidade = await this.disponibilidadeRepository.findById(
      accessContext,
      dto,
      selection,
    );

    if (!disponibilidade) {
      throw new NotFoundException();
    }

    return disponibilidade;
  }

  async disponibilidadeFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto | null> {
    return this.disponibilidadeRepository.findByIdSimple(accessContext, id, selection);
  }

  async disponibilidadeFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<DisponibilidadeFindOneOutputDto> {
    const disponibilidade = await this.disponibilidadeRepository.findByIdSimple(
      accessContext,
      id,
      selection,
    );

    if (!disponibilidade) {
      throw new NotFoundException();
    }

    return disponibilidade;
  }

  async disponibilidadeCreate(
    accessContext: AccessContext,
    dto: DisponibilidadeCreateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    await accessContext.ensurePermission("disponibilidade:create", { dto } as any);

    const dtoDisponibilidade = pick(dto, ["dataInicio", "dataFim"]);

    const disponibilidade = this.disponibilidadeRepository.create();

    this.disponibilidadeRepository.merge(disponibilidade, {
      ...dtoDisponibilidade,
    });

    await this.disponibilidadeRepository.save(disponibilidade);

    return this.disponibilidadeFindByIdStrict(accessContext, { id: disponibilidade.id });
  }

  async disponibilidadeUpdate(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto & DisponibilidadeUpdateInputDto,
  ): Promise<DisponibilidadeFindOneOutputDto> {
    const currentDisponibilidade = await this.disponibilidadeFindByIdStrict(accessContext, {
      id: dto.id,
    });

    await accessContext.ensurePermission("disponibilidade:update", { dto }, dto.id);

    const dtoDisponibilidade = pick(dto, ["dataInicio", "dataFim"]);

    const disponibilidade = <DisponibilidadeEntity>{
      id: currentDisponibilidade.id,
    };

    this.disponibilidadeRepository.merge(disponibilidade, {
      ...dtoDisponibilidade,
    });

    await this.disponibilidadeRepository.save(disponibilidade);

    return this.disponibilidadeFindByIdStrict(accessContext, { id: disponibilidade.id });
  }

  async disponibilidadeDeleteOneById(
    accessContext: AccessContext,
    dto: DisponibilidadeFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("disponibilidade:delete", { dto }, dto.id);

    const disponibilidade = await this.disponibilidadeFindByIdStrict(accessContext, dto);

    if (disponibilidade) {
      await this.disponibilidadeRepository.softDeleteById(disponibilidade.id);
    }

    return true;
  }
}
