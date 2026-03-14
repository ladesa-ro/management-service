import { Args, ID, Info, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { ImagemArquivo } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo.domain";
import { IImagemArquivoFindOneQueryHandler } from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-find-one.query.handler.interface";
import { IImagemArquivoListQueryHandler } from "@/modules/armazenamento/imagem-arquivo/domain/queries/imagem-arquivo-list.query.handler.interface";
import {
  ImagemArquivoFindOneOutputGraphQlDto,
  ImagemArquivoListInputGraphQlDto,
  ImagemArquivoListOutputGraphQlDto,
} from "./imagem-arquivo.graphql.dto";
import { ImagemArquivoGraphqlMapper } from "./imagem-arquivo.graphql.mapper";

@Resolver(() => ImagemArquivoFindOneOutputGraphQlDto)
export class ImagemArquivoGraphqlResolver {
  constructor(
    @DeclareDependency(IImagemArquivoListQueryHandler)
    private readonly listHandler: IImagemArquivoListQueryHandler,
    @DeclareDependency(IImagemArquivoFindOneQueryHandler)
    private readonly findOneHandler: IImagemArquivoFindOneQueryHandler,
  ) {}

  @Query(() => ImagemArquivoListOutputGraphQlDto, { name: "imagemArquivoFindAll" })
  async findAll(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args() dto: ImagemArquivoListInputGraphQlDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ImagemArquivoListOutputGraphQlDto> {
    const input = ImagemArquivoGraphqlMapper.toListInput(dto);

    if (input) {
      input.selection = graphqlExtractSelection(info, "paginated");
    }

    const result = await this.listHandler.execute({ accessContext, dto: input });
    return ImagemArquivoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ImagemArquivoFindOneOutputGraphQlDto, { name: "imagemArquivoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ImagemArquivoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const result = await this.findOneHandler.execute({ accessContext, dto: { id, selection } });
    ensureExists(result, ImagemArquivo.entityName, id);
    return ImagemArquivoGraphqlMapper.toFindOneOutputDto(result);
  }
}
