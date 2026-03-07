import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { BaseCrudService, type PersistInput } from "@/Ladesa.Management.Application/@shared";
import { CampusService } from "@/Ladesa.Management.Application/ambientes/campus";
import { OfertaFormacaoService } from "@/Ladesa.Management.Application/ensino/oferta-formacao";
import { CalendarioLetivo } from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import {
  ICalendarioLetivoRepository,
  type ICalendarioLetivoUseCasePort,
} from "@/Ladesa.Management.Application/horarios/calendario-letivo/application/ports";
import { type CalendarioLetivoCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoCreateInputDto";
import { type CalendarioLetivoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoFindOneInputDto";
import { type CalendarioLetivoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoFindOneOutputDto";
import { type CalendarioLetivoListInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoListInputDto";
import { type CalendarioLetivoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoListOutputDto";
import { type CalendarioLetivoUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/CalendarioLetivoUpdateInputDto";

@Injectable()
export class CalendarioLetivoService
  extends BaseCrudService<
    CalendarioLetivo,
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
    @Inject(ICalendarioLetivoRepository)
    protected readonly repository: ICalendarioLetivoRepository,
    private readonly campusService: CampusService,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: CalendarioLetivoCreateInputDto,
  ): Promise<Partial<PersistInput<CalendarioLetivo>>> {
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
    return { ...domain };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: CalendarioLetivoFindOneInputDto & CalendarioLetivoUpdateInputDto,
    current: CalendarioLetivoFindOneOutputDto,
  ): Promise<Partial<PersistInput<CalendarioLetivo>>> {
    const domain = CalendarioLetivo.fromData({
      ...current,
      campusId: current.campus.id,
      ofertaFormacaoId: current.ofertaFormacao?.id ?? null,
    } as unknown as CalendarioLetivo);
    domain.atualizar({ nome: dto.nome, ano: dto.ano });
    const result: Partial<PersistInput<CalendarioLetivo>> = { nome: domain.nome, ano: domain.ano };

    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusService.findByIdSimpleStrict(accessContext, dto.campus.id);
      result.campusId = campus.id;
    }

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      if (dto.ofertaFormacao) {
        const ofertaFormacao = await this.ofertaFormacaoService.findByIdSimpleStrict(
          accessContext,
          dto.ofertaFormacao.id,
        );
        result.ofertaFormacaoId = ofertaFormacao.id;
      } else {
        result.ofertaFormacaoId = null;
      }
    }

    return result;
  }
}
