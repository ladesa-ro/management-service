import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
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
import { Dep } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { ICalendarioAgendamentoRepository } from "@/modules/calendario/agendamento/domain/repositories/calendario-agendamento.repository.interface";
import { AccessContextHttp } from "@/server/nest/access-context";
import { getNowISO } from "@/utils/date";
import type { HorarioEdicaoSessaoDesfazerMudancaCommand } from "../domain/commands/horario-edicao-sessao-desfazer-mudanca.command";
import { IHorarioEdicaoSessaoDesfazerMudancaCommandHandler } from "../domain/commands/horario-edicao-sessao-desfazer-mudanca.command.handler.interface";
import type { HorarioEdicaoSessaoPublicarCommand } from "../domain/commands/horario-edicao-sessao-publicar.command";
import { IHorarioEdicaoSessaoPublicarCommandHandler } from "../domain/commands/horario-edicao-sessao-publicar.command.handler.interface";
import {
  HorarioEdicaoApplyChangeCommandMetadata,
  HorarioEdicaoCancelarCommandMetadata,
  HorarioEdicaoCreateCommandMetadata,
  HorarioEdicaoDesfazerMudancaCommandMetadata,
  HorarioEdicaoSalvarCommandMetadata,
} from "../domain/horario-edicao.operations";
import {
  HorarioEdicaoSessaoStatus,
  type IHorarioEdicaoMudanca,
  type IHorarioEdicaoSessao,
} from "../domain/horario-edicao.types";
import { HorarioEdicaoSessaoDiferencaQuery } from "../domain/queries/horario-edicao-sessao-diferenca.query";
import {
  HorarioEdicaoSessaoDiferencaQueryMetadata,
  IHorarioEdicaoSessaoDiferencaQueryHandler,
} from "../domain/queries/horario-edicao-sessao-diferenca.query.handler.interface";
import type { IHorarioEdicaoDiferencaEntrada } from "../domain/queries/horario-edicao-sessao-diferenca.query.result";
import { IHorarioEdicaoApplicator } from "../domain/repositories/horario-edicao-applicator.interface";
import { IHorarioEdicaoMudancaRepository } from "../domain/repositories/horario-edicao-mudanca.repository.interface";
import { IHorarioEdicaoSessaoRepository } from "../domain/repositories/horario-edicao-sessao.repository.interface";
import {
  HorarioEdicaoDiferencaEntradaOutputRestDto,
  HorarioEdicaoMudancaInputRestDto,
  HorarioEdicaoMudancaOutputRestDto,
  HorarioEdicaoMudancaParamsRestDto,
  HorarioEdicaoSessaoDiferencaOutputRestDto,
  HorarioEdicaoSessaoOutputRestDto,
  HorarioEdicaoSessaoParamsRestDto,
} from "./horario-edicao.rest.dto";

@ApiTags("horarios")
@Controller("/horarios/edicao")
export class HorarioEdicaoRestController {
  constructor(
    @Dep(IHorarioEdicaoSessaoRepository)
    private readonly sessaoRepository: IHorarioEdicaoSessaoRepository,
    @Dep(IHorarioEdicaoMudancaRepository)
    private readonly mudancaRepository: IHorarioEdicaoMudancaRepository,
    @Dep(IHorarioEdicaoApplicator)
    private readonly horarioEdicaoApplicator: IHorarioEdicaoApplicator,
    @Dep(ICalendarioAgendamentoRepository)
    private readonly calendarioAgendamentoRepository: ICalendarioAgendamentoRepository,
    @Dep(IHorarioEdicaoSessaoDiferencaQueryHandler)
    private readonly sessaoDiferencaQueryHandler: IHorarioEdicaoSessaoDiferencaQueryHandler,
    @Dep(IHorarioEdicaoSessaoPublicarCommandHandler)
    private readonly publicarHandler: IHorarioEdicaoSessaoPublicarCommandHandler,
    @Dep(IHorarioEdicaoSessaoDesfazerMudancaCommandHandler)
    private readonly desfazerMudancaHandler: IHorarioEdicaoSessaoDesfazerMudancaCommandHandler,
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
    dto.dadosAnteriores = entity.dadosAnteriores;
    dto.dateCreated = entity.dateCreated;
    return dto;
  }

  /**
   * Snapshot dos campos que uma mudança MOVER/REMOVER pode alterar — mesmo
   * conjunto de campos que HorarioEdicaoApplicatorTypeOrmAdapter lê/escreve
   * para esses dois tipos de operação.
   */
  private async capturarEstadoAtual(
    calendarioAgendamentoId: string,
  ): Promise<Record<string, unknown> | null> {
    const atual = await this.calendarioAgendamentoRepository.getFindOneQueryResult(
      null,
      calendarioAgendamentoId,
    );
    if (!atual) return null;

    return {
      nome: atual.nome,
      cor: atual.cor,
      dataInicio: atual.dataInicio,
      dataFim: atual.dataFim,
      horarioInicio: atual.horarioInicio,
      horarioFim: atual.horarioFim,
      diaInteiro: atual.diaInteiro,
    };
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
      dateCreated: getNowISO(),
      dateUpdated: getNowISO(),
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

    // MOVER/REMOVER agem sobre um agendamento que já existe: captura o estado
    // dele agora, antes de qualquer coisa ser aplicada de verdade (aplicar só
    // acontece em /salvar) — é o que sustenta desfazer esta mudança específica
    // depois. CRIAR não tem "antes".
    const dadosAnteriores = dto.calendarioAgendamentoId
      ? await this.capturarEstadoAtual(dto.calendarioAgendamentoId)
      : null;

    const mudanca = {
      id: generateUuidV7(),
      sessao: { id: params.sessaoId },
      calendarioAgendamento: dto.calendarioAgendamentoId
        ? { id: dto.calendarioAgendamentoId }
        : null,
      tipoOperacao: dto.tipoOperacao,
      dados: dto.dados,
      dadosAnteriores,
      dateCreated: getNowISO(),
    };

    await this.mudancaRepository.save(mudanca);

    // Update sessao dateUpdated
    sessao.dateUpdated = getNowISO();
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
    sessao.dateUpdated = getNowISO();
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
    sessao.dateUpdated = getNowISO();
    await this.sessaoRepository.save(sessao);

    return this.toSessaoOutput(sessao);
  }

  @Post("/:sessaoId/publicar")
  @ApiOperation(HorarioEdicaoSalvarCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioEdicaoSessaoOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async publicar(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: HorarioEdicaoSessaoParamsRestDto,
    @Headers("Idempotency-Key") idempotencyKey?: string,
  ): Promise<HorarioEdicaoSessaoOutputRestDto> {
    const command: HorarioEdicaoSessaoPublicarCommand = {
      sessaoId: params.sessaoId,
      idempotencyKey,
    };
    const sessao = await this.publicarHandler.execute(accessContext, command);

    return this.toSessaoOutput(sessao);
  }

  @Post("/:sessaoId/mudancas/:mudancaId/desfazer")
  @ApiOperation(HorarioEdicaoDesfazerMudancaCommandMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioEdicaoSessaoOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async desfazerMudanca(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: HorarioEdicaoMudancaParamsRestDto,
  ): Promise<HorarioEdicaoSessaoOutputRestDto> {
    const command: HorarioEdicaoSessaoDesfazerMudancaCommand = {
      sessaoId: params.sessaoId,
      mudancaId: params.mudancaId,
    };
    const sessao = await this.desfazerMudancaHandler.execute(accessContext, command);

    return this.toSessaoOutput(sessao);
  }

  private toDiferencaEntradaOutput(
    entrada: IHorarioEdicaoDiferencaEntrada,
  ): HorarioEdicaoDiferencaEntradaOutputRestDto {
    const dto = new HorarioEdicaoDiferencaEntradaOutputRestDto();
    dto.tipoOperacao = entrada.tipoOperacao;
    dto.calendarioAgendamentoId = entrada.calendarioAgendamentoId;
    dto.antes = entrada.antes;
    dto.depois = entrada.depois;
    return dto;
  }

  @Get("/:sessaoId/diferenca")
  @ApiOperation(HorarioEdicaoSessaoDiferencaQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: HorarioEdicaoSessaoDiferencaOutputRestDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async diferenca(
    @AccessContextHttp() accessContext: IAccessContext,
    @Param() params: HorarioEdicaoSessaoParamsRestDto,
  ): Promise<HorarioEdicaoSessaoDiferencaOutputRestDto> {
    const query: HorarioEdicaoSessaoDiferencaQuery = { sessaoId: params.sessaoId };
    const resultado = await this.sessaoDiferencaQueryHandler.execute(accessContext, query);

    const dto = new HorarioEdicaoSessaoDiferencaOutputRestDto();
    dto.sessaoId = resultado.sessaoId;
    dto.entram = resultado.entram.map((entrada) => this.toDiferencaEntradaOutput(entrada));
    dto.saem = resultado.saem.map((entrada) => this.toDiferencaEntradaOutput(entrada));
    dto.mudam = resultado.mudam.map((entrada) => this.toDiferencaEntradaOutput(entrada));
    return dto;
  }
}
