import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { EstadoService } from "./estado.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("estados")
@Controller("/base/estados")
export class EstadoController {
  constructor(private estadoService: EstadoService) {}

  @Get("/")
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("FindAll") dto: IApiDoc.operations["FindAll"],
  ): Promise<LadesaTypings.EstadoListOperationOutput["success"]> {
    return this.estadoService.findAll(accessContext, dto);
  }

  @Get("/:id")
  async findById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("FindById") dto: IApiDoc.operations["FindById"],
  ) {
    return this.estadoService.findByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
