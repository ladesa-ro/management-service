import { Args, ID, Info, Query, Resolver } from "@nestjs/graphql";
import { type GraphQLResolveInfo } from "graphql";
import { DeclareDependency, IContainer } from "@/domain/dependency-injection";
import { AccessContext, AccessContextGraphQL } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { graphqlExtractSelection } from "@/modules/@shared/infrastructure/graphql";
import { ImagemArquivo } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo";
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
  constructor(@DeclareDependency(IContainer) private readonly container: IContainer) {}

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

    const listHandler = this.container.get<IImagemArquivoListQueryHandler>(
      IImagemArquivoListQueryHandler,
    );
    const result = await listHandler.execute(accessContext, input);
    return ImagemArquivoGraphqlMapper.toListOutputDto(result);
  }

  @Query(() => ImagemArquivoFindOneOutputGraphQlDto, { name: "imagemArquivoFindById" })
  async findById(
    @AccessContextGraphQL() accessContext: AccessContext,
    @Args("id", { type: () => ID }) id: string,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ImagemArquivoFindOneOutputGraphQlDto> {
    const selection = graphqlExtractSelection(info);
    const findOneHandler = this.container.get<IImagemArquivoFindOneQueryHandler>(
      IImagemArquivoFindOneQueryHandler,
    );
    const result = await findOneHandler.execute(accessContext, { id, selection });
    ensureExists(result, ImagemArquivo.entityName, id);
    return ImagemArquivoGraphqlMapper.toFindOneOutputDto(result);
  }
}
