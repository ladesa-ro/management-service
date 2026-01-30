import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { BlocoService } from "@/v2/core/bloco/application/use-cases/bloco.service";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
  BlocoUpdateInputDto,
} from "./dto";

@ApiTags("blocos")
@Controller("/blocos")
export class BlocoController {
  constructor(private blocoService: BlocoService) {}

  @Get("/")
  @ApiOperation({ summary: "Lista blocos" })
  @ApiOkResponse({ type: BlocoListOutputDto })
  @ApiForbiddenResponse()
  async blocoFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @Query() dto: BlocoListInputDto,
  ): Promise<BlocoListOutputDto> {
    return this.blocoService.blocoFindAll(accessContext, dto);
  }

  @Get("/:id")
  @ApiOperation({ summary: "Busca um bloco por ID" })
  @ApiOkResponse({ type: BlocoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async blocoFindById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    return this.blocoService.blocoFindByIdStrict(accessContext, params);
  }

  @Post("/")
  @ApiOperation({ summary: "Cria um bloco" })
  @ApiCreatedResponse({ type: BlocoFindOneOutputDto })
  @ApiForbiddenResponse()
  async blocoCreate(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: BlocoCreateInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    return this.blocoService.blocoCreate(accessContext, dto);
  }

  @Patch("/:id")
  @ApiOperation({ summary: "Atualiza um bloco" })
  @ApiOkResponse({ type: BlocoFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async blocoUpdate(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
    @Body() dto: BlocoUpdateInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    return this.blocoService.blocoUpdate(accessContext, { id: params.id, ...dto });
  }

  @Get("/:id/imagem/capa")
  @ApiOperation({ summary: "Obtem a imagem de capa de um bloco" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async blocoGetImagemCapa(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
  ) {
    return this.blocoService.blocoGetImagemCapa(accessContext, params.id);
  }

  @Put("/:id/imagem/capa")
  @ApiOperation({ summary: "Define a imagem de capa de um bloco" })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async blocoImagemCapaSave(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.blocoService.blocoUpdateImagemCapa(accessContext, params, file);
  }

  @Delete("/:id")
  @ApiOperation({ summary: "Remove um bloco" })
  @ApiOkResponse({ type: Boolean })
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async blocoDeleteOneById(
    @AccessContextHttp() accessContext: AccessContext,
    @Param() params: BlocoFindOneInputDto,
  ): Promise<boolean> {
    return this.blocoService.blocoDeleteOneById(accessContext, params);
  }
}
