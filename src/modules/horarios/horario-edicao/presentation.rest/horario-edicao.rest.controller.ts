import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { AccessContextHttp } from "@/server/nest/access-context";
import { getNow } from "@/utils/date";
import {
  HorarioEdicaoApplyChangeCommandMetadata,
  HorarioEdicaoCancelarCommandMetadata,
  HorarioEdicaoCreateCommandMetadata,
  HorarioEdicaoSalvarCommandMetadata,
} from "../domain/horario-edicao.operations";
import {
  HorarioEdicaoSessaoStatus,
  type IHorarioEdicaoMudanca,
  type IHorarioEdicaoSessao,
} from "../domain/horario-edicao.types";
import { IHorarioEdicaoApplicator } from "../domain/repositories/horario-edicao-applicator.interface";
import { IHorarioEdicaoMudancaRepository } from "../domain/repositories/horario-edicao-mudanca.repository.interface";
import { IHorarioEdicaoSessaoRepository } from "../domain/repositories/horario-edicao-sessao.repository.interface";
import {
  HorarioEdicaoMudancaInputRestDto,
  HorarioEdicaoMudancaOutputRestDto,
  HorarioEdicaoSessaoOutputRestDto,
  HorarioEdicaoSessaoParamsRestDto,
} from "./horario-edicao.rest.dto";

@ApiTags("horarios")
@Controller("/horarios/edicao")
export class HorarioEdicaoRestController {
  constructor(
    @DeclareDependency(IHorarioEdicaoSessaoRepository)
    private readonly sessaoRepository: IHorarioEdicaoSessaoRepository,
    @DeclareDependency(IHorarioEdicaoMudancaRepository)
    private readonly mudancaRepository: IHorarioEdicaoMudancaRepository,
    @DeclareDependency(IHorarioEdicaoApplicator)
    private readonly horarioEdicaoApplicator: IHorarioEdicaoApplicator,
  ) {}

  private toSessaoOutput(entity: IHorarioEdicaoSessao): HorarioEdicaoSessaoOutputRestDto {
    const dto = new HorarioEdicaoSessaoOutputRestDto();
    dto.id = entity.id;
    dto.status = entity.status;
    dto.idUsuarioFk = entity.usuario?.id;
    dto.dateCreated = entity.dateCreated;
    dto.dateUpdated = entity.dateUpdated;
    return dto;
  }

  private toMudancaOutput(entity: IHorarioEdicaoMudanca): HorarioEdicaoMudancaOutputRestDto {
    const dto = new HorarioEdicaoMudancaOutputRestDto();
    dto.id = entity.id;
    dto.idSessaoFk = entity.sessao?.id;
    dto.idCalendarioAgendamentoFk = entity.calendarioAgendamento?.id ?? null;
    dto.tipoOperacao = entity.tipoOperacao;
    dto.dados = entity.dados;
    dto.dateCreated = entity.dateCreated;
    return dto;
  }

  @Post("/")
  @HttpCode(201)
  @ApiOperation(HorarioEdicaoCreateCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: HorarioEdicaoSessaoOutputRestDto })
  @ApiForbiddenResponse()
  async create(
    @AccessContextHttp() accessContext: IAccessContext,
  ): Promise<HorarioEdicaoSessaoOutputRestDto> {
    const entity = {
      id: generateUuidV7(),
      status: HorarioEdicaoSessaoStatus.ABERTA,
      usuario: { id: accessContext.requestActor?.id ?? "" },
      dateCreated: getNow(),
      dateUpdated: getNow(),
    };

    const saved = await this.sessaoRepository.save(entity);

    return this.toSessaoOutput(saved);
  }

  @Patch("/:sessaoId")
  @ApiOperation(HorarioEdicaoApplyChangeCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioEdicaoMudancaOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async applyChange(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: HorarioEdicaoSessaoParamsRestDto,
    @Body() dto: HorarioEdicaoMudancaInputRestDto,
  ): Promise<HorarioEdicaoMudancaOutputRestDto> {
    const sessao = await this.sessaoRepository.findById(params.sessaoId);
    ensureExists(sessao, "HorarioEdicaoSessao", params.sessaoId);

    if (sessao.status !== HorarioEdicaoSessaoStatus.ABERTA) {
      throw new BadRequestException(
        `Sessao ${params.sessaoId} nao esta aberta. Status atual: ${sessao.status}.`,
      );
    }

    const mudanca = {
      id: generateUuidV7(),
      sessao: { id: params.sessaoId },
      calendarioAgendamento: dto.calendarioAgendamentoId
        ? { id: dto.calendarioAgendamentoId }
        : null,
      tipoOperacao: dto.tipoOperacao,
      dados: dto.dados,
      dateCreated: getNow(),
    };

    await this.mudancaRepository.save(mudanca);

    // Update sessao dateUpdated
    sessao.dateUpdated = getNow();
    await this.sessaoRepository.save(sessao);

    return this.toMudancaOutput(mudanca);
  }

  @Post("/:sessaoId/salvar")
  @ApiOperation(HorarioEdicaoSalvarCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioEdicaoSessaoOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async salvar(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: HorarioEdicaoSessaoParamsRestDto,
  ): Promise<HorarioEdicaoSessaoOutputRestDto> {
    const sessao = await this.sessaoRepository.findById(params.sessaoId);
    ensureExists(sessao, "HorarioEdicaoSessao", params.sessaoId);

    if (sessao.status !== HorarioEdicaoSessaoStatus.ABERTA) {
      throw new BadRequestException(
        `Sessao ${params.sessaoId} nao esta aberta. Status atual: ${sessao.status}.`,
      );
    }

    // Apply recorded changes to calendario_agendamento
    const mudancas = await this.mudancaRepository.findBySessaoId(params.sessaoId);
    await this.horarioEdicaoApplicator.applyMudancas(mudancas);

    // Mark session as saved
    sessao.status = HorarioEdicaoSessaoStatus.SALVA;
    sessao.dateUpdated = getNow();
    await this.sessaoRepository.save(sessao);

    return this.toSessaoOutput(sessao);
  }

  @Post("/:sessaoId/cancelar")
  @ApiOperation(HorarioEdicaoCancelarCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioEdicaoSessaoOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async cancelar(
    @AccessContextHttp() _accessContext: IAccessContext,
    @Param() params: HorarioEdicaoSessaoParamsRestDto,
  ): Promise<HorarioEdicaoSessaoOutputRestDto> {
    const sessao = await this.sessaoRepository.findById(params.sessaoId);
    ensureExists(sessao, "HorarioEdicaoSessao", params.sessaoId);

    if (sessao.status !== HorarioEdicaoSessaoStatus.ABERTA) {
      throw new BadRequestException(
        `Sessao ${params.sessaoId} nao esta aberta. Status atual: ${sessao.status}.`,
      );
    }

    sessao.status = HorarioEdicaoSessaoStatus.CANCELADA;
    sessao.dateUpdated = getNow();
    await this.sessaoRepository.save(sessao);

    return this.toSessaoOutput(sessao);
  }
}
