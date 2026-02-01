import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

/**
 * Decorator para extrair o Request Actor de requisições GraphQL.
 * Uso: @RequestActorGraphQL() actor: IRequestActor
 */
export const RequestActorGraphQL = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request.user ?? null;
  },
);
