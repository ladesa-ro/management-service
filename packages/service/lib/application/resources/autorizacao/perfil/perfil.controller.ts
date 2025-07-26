import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { PerfilService } from "./perfil.service";

@Controller("/vinculos")
@ApiTags("perfis")
export class PerfilController {
  constructor(private vinculoService: PerfilService) {}

  @Get("/")
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("FindAll") dto: IOperationInput<"FindAll">,
  ) {
    return this.vinculoService.perfilFindAll(accessContext, dto);
  }

  @Post("/")
  async vinculoSetVinculos(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("VinculoSetVinculos") dto: IOperationInput<"VinculoSetVinculos">,
  ) {
    return this.vinculoService.perfilSetVinculos(accessContext, dto);
  }
}
