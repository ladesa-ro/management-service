import { Inject, Injectable } from "@nestjs/common";
import { has, pick } from "lodash";
import { v4 } from "uuid";
import { ResourceNotFoundError } from "@/core/@shared";
import {
  CalendarioLetivoCreateInput,
  CalendarioLetivoFindOneInput,
  CalendarioLetivoFindOneOutput,
  CalendarioLetivoListInput,
  CalendarioLetivoListOutput,
  CalendarioLetivoUpdateInput,
} from "@/core/calendario-letivo/application/dtos";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  type ICalendarioLetivoRepositoryPort,
  type ICalendarioLetivoUseCasePort,
} from "@/core/calendario-letivo/application/ports";
import { CampusService } from "@/core/campus";
import { OfertaFormacaoService } from "@/core/oferta-formacao";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";

/**
 * Service centralizado para o modulo CalendarioLetivo.
 * Implementa todos os use cases definidos em ICalendarioLetivoUseCasePort.
 */
@Injectable()
export class CalendarioLetivoService implements ICalendarioLetivoUseCasePort {
  constructor(
    @Inject(CALENDARIO_LETIVO_REPOSITORY_PORT)
    private readonly calendarioLetivoRepository: ICalendarioLetivoRepositoryPort,
    private readonly campusService: CampusService,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
  ) {}

  // Generic method names
  async findAll(
    accessContext: AccessContext,
    dto: CalendarioLetivoListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutput> {
    return this.calendarioLetivoRepository.findAll(accessContext, dto, selection);
  }

  async findById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput | null> {
    return this.calendarioLetivoRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput> {
    const calendarioLetivo = await this.calendarioLetivoRepository.findById(
      accessContext,
      dto,
      selection,
    );

    if (!calendarioLetivo) {
      throw new ResourceNotFoundError("CalendarioLetivo", dto.id);
    }

    return calendarioLetivo;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput | null> {
    return this.calendarioLetivoRepository.findByIdSimple(accessContext, id, selection);
  }

  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput> {
    const calendarioLetivo = await this.calendarioLetivoRepository.findByIdSimple(
      accessContext,
      id,
      selection,
    );

    if (!calendarioLetivo) {
      throw new ResourceNotFoundError("CalendarioLetivo", id);
    }

    return calendarioLetivo;
  }

  // Legacy method aliases for compatibility
  async calendarioLetivoFindAll(
    accessContext: AccessContext,
    dto: CalendarioLetivoListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutput> {
    return this.findAll(accessContext, dto, selection);
  }

  async calendarioLetivoFindById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput | null> {
    return this.findById(accessContext, dto, selection);
  }

  async calendarioLetivoFindByIdStrict(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async calendarioLetivoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async calendarioLetivoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async calendarioLetivoCreate(
    accessContext: AccessContext,
    dto: CalendarioLetivoCreateInput,
  ): Promise<CalendarioLetivoFindOneOutput> {
    await accessContext.ensurePermission("calendario_letivo:create", { dto } as any);

    const dtoCalendarioLetivo = pick(dto, ["nome", "ano"]);

    const calendarioLetivo = this.calendarioLetivoRepository.create();

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      id: v4(),
    });

    const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      campus: { id: campus.id },
    });

    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );
      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        ofertaFormacao: { id: ofertaFormacao.id },
      });
    }

    await this.calendarioLetivoRepository.save(calendarioLetivo);

    return this.findByIdStrict(accessContext, { id: calendarioLetivo.id });
  }

  async calendarioLetivoUpdate(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInput & CalendarioLetivoUpdateInput,
  ): Promise<CalendarioLetivoFindOneOutput> {
    const currentCalendarioLetivo = await this.findByIdStrict(accessContext, {
      id: dto.id,
    });

    await accessContext.ensurePermission("calendario_letivo:update", { dto }, dto.id);

    const dtoCalendarioLetivo = pick(dto, ["nome", "ano"]);

    const calendarioLetivo = this.calendarioLetivoRepository.create();

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    this.calendarioLetivoRepository.merge(calendarioLetivo, { id: currentCalendarioLetivo.id });

    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        campus: { id: campus.id },
      });
    }

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      if (dto.ofertaFormacao) {
        const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
          accessContext,
          dto.ofertaFormacao.id,
        );
        this.calendarioLetivoRepository.merge(calendarioLetivo, {
          ofertaFormacao: { id: ofertaFormacao.id },
        });
      } else {
        this.calendarioLetivoRepository.merge(calendarioLetivo, {
          ofertaFormacao: null as any,
        });
      }
    }

    await this.calendarioLetivoRepository.save(calendarioLetivo);

    return this.findByIdStrict(accessContext, { id: calendarioLetivo.id });
  }

  async calendarioLetivoDeleteOneById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInput,
  ): Promise<boolean> {
    await accessContext.ensurePermission("calendario_letivo:delete", { dto }, dto.id);

    const calendarioLetivo = await this.findByIdStrict(accessContext, dto);

    if (calendarioLetivo) {
      await this.calendarioLetivoRepository.softDeleteById(calendarioLetivo.id);
    }

    return true;
  }
}
