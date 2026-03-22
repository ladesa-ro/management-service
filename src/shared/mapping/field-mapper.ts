import type { IValidationErrorDetail } from "@/domain/validation";

// ============================================================================
// Types
// ============================================================================

type TransformFn = (value: any) => any;

export type FieldMapping =
  | string
  | [source: string, target: string]
  | [source: string, target: string, transform: TransformFn];

interface PathSegment {
  key: string;
  array: boolean;
}

interface NormalizedMapping {
  sourcePath: PathSegment[];
  targetPath: PathSegment[];
  sourceRaw: string;
  targetRaw: string;
  transform?: TransformFn;
}

export interface Mapping {
  map<T = Record<string, unknown>>(source: unknown): T;
  mapDefined<T = Record<string, unknown>>(source: unknown): T;
  reverseField(targetField: string): string;
  reverseDetails(details: readonly IValidationErrorDetail[]): IValidationErrorDetail[];
}

// ============================================================================
// Path parsing (Lodash-style dot notation + JMESPath [*] wildcard)
// ============================================================================

function parsePath(path: string): PathSegment[] {
  const segments: PathSegment[] = [];

  for (const part of path.split(".")) {
    if (part.endsWith("[*]")) {
      segments.push({ key: part.slice(0, -3), array: true });
    } else {
      segments.push({ key: part, array: false });
    }
  }

  return segments;
}

function getByPath(obj: any, segments: PathSegment[]): any {
  let current = obj;

  for (let i = 0; i < segments.length; i++) {
    if (current === undefined || current === null) return undefined;

    const seg = segments[i];
    current = current[seg.key];

    if (seg.array) {
      if (!Array.isArray(current)) return undefined;

      const remaining = segments.slice(i + 1);

      if (remaining.length === 0) return current;

      return current.map((item) => getByPath(item, remaining));
    }
  }

  return current;
}

function setByPath(obj: Record<string, any>, segments: PathSegment[], value: any): void {
  let current = obj;

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const isLast = i === segments.length - 1;

    if (isLast && !seg.array) {
      current[seg.key] = value;
      return;
    }

    if (seg.array) {
      if (!Array.isArray(value)) {
        current[seg.key] = value;
        return;
      }

      const remaining = segments.slice(i + 1);

      if (remaining.length === 0) {
        current[seg.key] = value;
        return;
      }

      if (!Array.isArray(current[seg.key])) {
        current[seg.key] = [];
      }

      const arr = current[seg.key] as Record<string, any>[];

      for (let j = 0; j < value.length; j++) {
        if (!arr[j]) arr[j] = {};
        setByPath(arr[j], remaining, value[j]);
      }

      return;
    }

    if (current[seg.key] === undefined || current[seg.key] === null) {
      current[seg.key] = {};
    }

    current = current[seg.key];
  }
}

// ============================================================================
// Normalize field mapping definitions
// ============================================================================

function normalize(field: FieldMapping): NormalizedMapping {
  if (typeof field === "string") {
    return {
      sourcePath: parsePath(field),
      targetPath: parsePath(field),
      sourceRaw: field,
      targetRaw: field,
    };
  }

  const [source, target, transform] = field;

  return {
    sourcePath: parsePath(source),
    targetPath: parsePath(target),
    sourceRaw: source,
    targetRaw: target,
    transform,
  };
}

// ============================================================================
// createMapping
// ============================================================================

export function createMapping(fields: FieldMapping[]): Mapping {
  const normalized = fields.map(normalize);

  const reverseMap = new Map<string, string>();

  for (const m of normalized) {
    reverseMap.set(m.targetRaw, m.sourceRaw);
  }

  function mapFrom(source: unknown, skipUndefined: boolean): Record<string, unknown> {
    const src = source as Record<string, any>;
    const result: Record<string, any> = {};

    for (const m of normalized) {
      const value = getByPath(src, m.sourcePath);

      if (skipUndefined && value === undefined) continue;

      const transformed = m.transform ? m.transform(value) : value;
      setByPath(result, m.targetPath, transformed);
    }

    return result;
  }

  return {
    map<T = Record<string, unknown>>(source: unknown): T {
      return mapFrom(source, false) as T;
    },

    mapDefined<T = Record<string, unknown>>(source: unknown): T {
      return mapFrom(source, true) as T;
    },

    reverseField(targetField: string): string {
      return reverseMap.get(targetField) ?? targetField;
    },

    reverseDetails(details: readonly IValidationErrorDetail[]): IValidationErrorDetail[] {
      return details.map((d) => ({
        ...d,
        field: reverseMap.get(d.field) ?? d.field,
      }));
    },
  };
}

// ============================================================================
// mapFilterCase helper
// ============================================================================

export function mapFilterCase(dotPath: string): [string, string] {
  const parts = dotPath.split(".");
  const camelCase = parts[0] + parts.slice(1).map(capitalize).join("");
  return [camelCase, dotPath];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
