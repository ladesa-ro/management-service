import type { NextFunction, Request, Response } from "express";
import { getRequestRepresentationDto, RequestRepresentationDtoSchema, validateDto } from "@/shared";

export interface BaseAppRoute {
  handler(requestRepresentation: unknown): Promise<unknown>;
}

export type BaseAppRouteClass = {
  new(...args: any[]): BaseAppRoute;
};

export function createRouteHandler(routeClass: BaseAppRouteClass) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const routeInstance = req.container.get(routeClass, {autobind: true});

      const incomingRequestRepresentation = getRequestRepresentationDto(req);
      const request = await validateDto(routeClass.requestSchema, incomingRequestRepresentation);

      const result = await routeInstance.handler(request);

      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}
