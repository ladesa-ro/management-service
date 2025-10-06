import type { NextFunction, Request, Response } from "express";
import { getRequestRepresentationDto, type SchemaRegistry, validateDto } from "@/shared";
import type { AppSchema } from "@/shared/infrastructure/schemas/registry/app-schema.ts";

export interface BaseAppRoute {
  handler(requestRepresentation: unknown): Promise<unknown>;
}

export type BaseAppRouteClass = {
  method: string;
  path: string;
  requestSchema: AppSchema;

  new (...args: any[]): BaseAppRoute;
};

export function createRouteHandler(schemaRegistry: SchemaRegistry, routeClass: BaseAppRouteClass) {
  const schema = schemaRegistry.getSchema(routeClass.requestSchema);

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const incomingRequestDto = getRequestRepresentationDto(req);
      const requestDto = await validateDto(schema, incomingRequestDto);

      const routeInstance = req.container.get(routeClass, { autobind: true });
      const result = await routeInstance.handler(requestDto);

      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}
