import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { CampusService } from "@/modules/ambientes/campus";
import { OfertaFormacaoService } from "@/modules/ensino/oferta-formacao";
import { CalendarioLetivo, type ICalendarioLetivo } from "@/modules/horarios/calendario-letivo";
import type {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
  CalendarioLetivoUpdateInputDto,
} from "@/modules/horarios/calendario-letivo/application/dtos";
import {
  CALENDARIO_LETIVO_REPOSITORY_PORT,
  type ICalendarioLetivoRepositoryPort,
  type ICalendarioLetivoUseCasePort,
} from "@/modules/horarios/calendario-letivo/application/ports";

@Injectable()
export class CalendarioLetivoService
  extends BaseCrudService<
    ICalendarioLetivo,
    CalendarioLetivoListInputDto,
    CalendarioLetivoListOutputDto,
    CalendarioLetivoFindOneInputDto,
    CalendarioLetivoFindOneOutputDto,
    CalendarioLetivoCreateInputDto,
    CalendarioLetivoUpdateInputDto
  >
  implements ICalendarioLetivoUseCasePort
{
  protected readonly resourceName = "CalendarioLetivo";
  protected readonly createAction = "calendario_letivo:create";
  protected readonly updateAction = "calendario_letivo:update";
  protected readonly deleteAction = "calendario_letivo:delete";

  constructor(
    @Inject(CALENDARIO_LETIVO_REPOSITORY_PORT)
    protected readonly repository: ICalendarioLetivoRepositoryPort,
    private readonly campusService: CampusService,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: CalendarioLetivoCreateInputDto,
  ): Promise<Partial<PersistInput<ICalendarioLetivo>>> {
    const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);

    let ofertaFormacaoRef: { id: string } | undefined;
    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );
      ofertaFormacaoRef = { id: ofertaFormacao.id };
    }

    const domain = CalendarioLetivo.criar({
      nome: dto.nome,
      ano: dto.ano,
      campus: { id: campus.id },
      ofertaFormacao: ofertaFormacaoRef,
    });
    return {
      ...domain,
      campus: { id: campus.id },
      ...(ofertaFormacaoRef ? { ofertaFormacao: ofertaFormacaoRef } : {}),
    };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto & CalendarioLetivoUpdateInputDto,
    current: CalendarioLetivoFindOneOutputDto,
  ): Promise<Partial<PersistInput<ICalendarioLetivo>>> {
    const domain = CalendarioLetivo.fromData(current);
    domain.atualizar({ nome: dto.nome, ano: dto.ano });
    const result: Partial<PersistInput<ICalendarioLetivo>> = { nome: domain.nome, ano: domain.ano };

    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
      result.campus = { id: campus.id };
    }

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      if (dto.ofertaFormacao) {
        const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
          accessContext,
          dto.ofertaFormacao.id,
        );
        result.ofertaFormacao = { id: ofertaFormacao.id };
      } else {
        result.ofertaFormacao = null;
      }
    }

    return result;
  }
}
