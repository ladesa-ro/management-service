import { Injectable } from "@nestjs/common";
import type { IAutorizacaoUseCasePort } from "../ports";

@Injectable()
export class AutorizacaoService implements IAutorizacaoUseCasePort {}
