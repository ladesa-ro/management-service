import {
  type ArgumentMetadata,
  BadRequestException,
  Injectable,
  type PipeTransform,
} from "@nestjs/common";
import type { z } from "zod";

interface WithSchema {
  schema: z.ZodType;
}

function hasSchema(metatype: unknown): metatype is WithSchema {
  return typeof metatype === "function" && "schema" in metatype && metatype.schema !== undefined;
}

@Injectable()
export class ZodGlobalValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype;

    if (!hasSchema(metatype)) return value;

    const normalize = (input: unknown): unknown => {
      if (input === null || typeof input !== "object") return input;
      const obj = input as Record<string, unknown>;

      if (!obj.filter || typeof obj.filter !== "object") return input;

      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(obj)) {
        if (k === "filter") continue;
        out[k] = v;
      }

      const flatten = (node: unknown, prefix = "filter") => {
        if (node === null || node === undefined) return;
        if (typeof node === "string" || Array.isArray(node)) {
          out[prefix] = node;
          return;
        }
        if (typeof node === "object") {
          for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
            flatten(v, `${prefix}.${k}`);
          }
        }
      };

      flatten(obj.filter);

      return out;
    };

    const normalized = normalize(value);

    const tryParse = (input: unknown) =>
      metatype.schema.safeParse(input);

    const result = tryParse(normalized);

    if (!result.success) {
      const alt = tryParse(value);
      if (alt.success) return alt.data;

      if (metadata.type === "query") return value;

      throw new BadRequestException(
        result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
          rule: issue.code,
        })),
      );
    }

    return result.data;
  }
}
