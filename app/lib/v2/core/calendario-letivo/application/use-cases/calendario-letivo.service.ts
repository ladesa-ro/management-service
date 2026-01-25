import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
  CalendarioLetivoUpdateInputDto,
} from "@/v2/adapters/in/http/calendario-letivo/dto";
import type { CalendarioLetivoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { OfertaFormacaoService } from "@/v2/core/oferta-formacao/application/use-cases/oferta-formacao.service";
import type { ICalendarioLetivoRepositoryPort, ICalendarioLetivoUseCasePort } from "../ports";

@Injectable()
export class CalendarioLetivoService implements ICalendarioLetivoUseCasePort {
  constructor(
    @Inject("ICalendarioLetivoRepositoryPort")
    private calendarioLetivoRepository: ICalendarioLetivoRepositoryPort,
    private campusService: CampusService,
    private ofertaFormacaoService: OfertaFormacaoService,
  ) {}

  async calendarioLetivoFindAll(
    accessContext: AccessContext,
    dto: CalendarioLetivoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoListOutputDto> {
    return this.calendarioLetivoRepository.findAll(accessContext, dto, selection);
  }

  async caledarioLetivoFindById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto | null> {
    return this.calendarioLetivoRepository.findById(accessContext, dto, selection);
  }

  async calendarioLetivoFindByIdStrict(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    const calendarioLetivo = await this.calendarioLetivoRepository.findById(
      accessContext,
      dto,
      selection,
    );

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  async calendarioLetivoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<CalendarioLetivoFindOneOutputDto | null> {
    return this.calendarioLetivoRepository.findByIdSimple(accessContext, id, selection);
  }

  async calendarioLetivoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    const calendarioLetivo = await this.calendarioLetivoRepository.findByIdSimple(
      accessContext,
      id,
      selection,
    );

    if (!calendarioLetivo) {
      throw new NotFoundException();
    }

    return calendarioLetivo;
  }

  async calendarioLetivoCreate(
    accessContext: AccessContext,
    dto: CalendarioLetivoCreateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    await accessContext.ensurePermission("calendario_letivo:create", { dto } as any);

    const dtoCalendarioLetivo = pick(dto, ["nome", "ano"]);

    const calendarioLetivo = this.calendarioLetivoRepository.create();

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    const campus = await this.campusService.campusFindByIdSimpleStrict(
      accessContext,
      dto.campus.id,
    );

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      campus: {
        id: campus.id,
      },
    });

    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        ofertaFormacao: {
          id: ofertaFormacao.id,
        },
      });
    }

    await this.calendarioLetivoRepository.save(calendarioLetivo);

    return this.calendarioLetivoFindByIdStrict(accessContext, { id: calendarioLetivo.id });
  }

  async calendarioLetivoUpdate(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto & CalendarioLetivoUpdateInputDto,
  ): Promise<CalendarioLetivoFindOneOutputDto> {
    const currentCalendarioLetivo = await this.calendarioLetivoFindByIdStrict(accessContext, {
      id: dto.id,
    });

    await accessContext.ensurePermission("calendario_letivo:update", { dto }, dto.id);

    const dtoCalendarioLetivo = pick(dto, ["nome", "ano"]);

    const calendarioLetivo = {
      id: currentCalendarioLetivo.id,
    } as CalendarioLetivoEntity;

    this.calendarioLetivoRepository.merge(calendarioLetivo, {
      ...dtoCalendarioLetivo,
    });

    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(
        accessContext,
        dto.campus.id,
      );

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        campus: {
          id: campus.id,
        },
      });
    }

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao =
        dto.ofertaFormacao &&
        (await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
          accessContext,
          dto.ofertaFormacao.id,
        ));

      this.calendarioLetivoRepository.merge(calendarioLetivo, {
        ofertaFormacao: ofertaFormacao && {
          id: ofertaFormacao.id,
        },
      });
    }

    await this.calendarioLetivoRepository.save(calendarioLetivo);

    return this.calendarioLetivoFindByIdStrict(accessContext, { id: calendarioLetivo.id });
  }

  async calendarioLetivoDeleteOneById(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("calendario_letivo:delete", { dto }, dto.id);

    const calendarioLetivo = await this.calendarioLetivoFindByIdStrict(accessContext, dto);

    if (calendarioLetivo) {
      await this.calendarioLetivoRepository.softDeleteById(calendarioLetivo.id);
    }

    return true;
  }
}
