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
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { CalendarioLetivoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
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
    private readonly databaseContext: DatabaseContextService,
  ) {}

  async calendarioLetivoFindAll(
    accessContext: AccessContext,
    dto: CalendarioLetivoListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutput> {
    return this.calendarioLetivoRepository.findAll(accessContext, dto, selection);
  }

  async calendarioLetivoFindById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput | null> {
    return this.calendarioLetivoRepository.findById(accessContext, dto, selection);
  }

  async calendarioLetivoFindByIdStrict(
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

  async calendarioLetivoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutput | null> {
    return this.calendarioLetivoRepository.findByIdSimple(accessContext, id, selection);
  }

  async calendarioLetivoFindByIdSimpleStrict(
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

  async calendarioLetivoCreate(
    accessContext: AccessContext,
    dto: CalendarioLetivoCreateInput,
  ): Promise<CalendarioLetivoFindOneOutput> {
    await accessContext.ensurePermission("calendario_letivo:create", { dto } as any);

    const calendarioLetivo = await this.databaseContext.transaction(
      async ({ databaseContext: { calendarioLetivoRepository } }) => {
        const dtoCalendarioLetivo = pick(dto, ["nome", "ano"]);

        const calendarioLetivo = calendarioLetivoRepository.create();

        calendarioLetivoRepository.merge(calendarioLetivo, {
          ...dtoCalendarioLetivo,
        });

        calendarioLetivoRepository.merge(calendarioLetivo, {
          id: v4(),
        });

        const campus = await this.campusService.campusFindByIdSimpleStrict(
          accessContext,
          dto.campus.id,
        );
        calendarioLetivoRepository.merge(calendarioLetivo, {
          campus: { id: campus.id },
        });

        if (dto.ofertaFormacao) {
          const ofertaFormacao =
            await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
              accessContext,
              dto.ofertaFormacao.id,
            );
          calendarioLetivoRepository.merge(calendarioLetivo, {
            ofertaFormacao: { id: ofertaFormacao.id },
          });
        }

        await calendarioLetivoRepository.save(calendarioLetivo);

        return calendarioLetivo;
      },
    );

    return this.calendarioLetivoFindByIdStrict(accessContext, { id: calendarioLetivo.id });
  }

  async calendarioLetivoUpdate(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInput & CalendarioLetivoUpdateInput,
  ): Promise<CalendarioLetivoFindOneOutput> {
    const currentCalendarioLetivo = await this.calendarioLetivoFindByIdStrict(accessContext, {
      id: dto.id,
    });

    await accessContext.ensurePermission("calendario_letivo:update", { dto }, dto.id);

    const calendarioLetivo = await this.databaseContext.transaction(
      async ({ databaseContext: { calendarioLetivoRepository } }) => {
        const dtoCalendarioLetivo = pick(dto, ["nome", "ano"]);

        const calendarioLetivo = {
          id: currentCalendarioLetivo.id,
        } as CalendarioLetivoEntity;

        calendarioLetivoRepository.merge(calendarioLetivo, {
          ...dtoCalendarioLetivo,
        });

        calendarioLetivoRepository.merge(calendarioLetivo, { id: currentCalendarioLetivo.id });

        if (has(dto, "campus") && dto.campus !== undefined) {
          const campus = await this.campusService.campusFindByIdSimpleStrict(
            accessContext,
            dto.campus.id,
          );
          calendarioLetivoRepository.merge(calendarioLetivo, {
            campus: { id: campus.id },
          });
        }

        if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
          if (dto.ofertaFormacao) {
            const ofertaFormacao =
              await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
                accessContext,
                dto.ofertaFormacao.id,
              );
            calendarioLetivoRepository.merge(calendarioLetivo, {
              ofertaFormacao: { id: ofertaFormacao.id },
            });
          } else {
            calendarioLetivoRepository.merge(calendarioLetivo, {
              ofertaFormacao: null as any,
            });
          }
        }

        await calendarioLetivoRepository.save(calendarioLetivo);

        return calendarioLetivo;
      },
    );

    return this.calendarioLetivoFindByIdStrict(accessContext, { id: calendarioLetivo.id });
  }

  async calendarioLetivoDeleteOneById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInput,
  ): Promise<boolean> {
    await accessContext.ensurePermission("calendario_letivo:delete", { dto }, dto.id);

    const calendarioLetivo = await this.calendarioLetivoFindByIdStrict(accessContext, dto);

    if (calendarioLetivo) {
      await this.calendarioLetivoRepository.softDeleteById(calendarioLetivo.id);
    }

    return true;
  }
}
