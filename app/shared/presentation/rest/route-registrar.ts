import type express from "express";

export type RouteRegistrarApp = express.Application;

export interface RouteRegistrar {
  register(app: express.Application): void;
}

export const ROUTE_REGISTRAR = Symbol("Ladesa.ManagementService.Presentation.Rest.RouteRegistrar");
