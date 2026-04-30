// @ts-nocheck
import { DataSource } from "typeorm";
import crypto from "crypto";
import { DataSourceAppFactory } from "../src/infrastructure.database/data-sources/factories/data-source-app-factory";
import fs from "fs";
import path from "path";

function loadEnv(): void {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(/^([^=]+)=(.*)$/);
    if (m) {
      const key = m[1].trim();
      let val = m[2];
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[key] = val;
    }
  }
}

function makeDbOptions() {
  return {
    url: process.env.DATABASE_URL,
    useSSL: process.env.DATABASE_USE_SSL ?? "false",
    schema: undefined,
  };
}

function topoSort(metas) {
  const map = new Map();
  metas.forEach((m) => map.set(m.tableName, m));
  const deps = new Map();
  metas.forEach((m) => {
    const refs = new Set();
    m.foreignKeys?.forEach((fk) => {
      if (fk.referencedTableName && map.has(fk.referencedTableName)) refs.add(fk.referencedTableName);
    });
    deps.set(m.tableName, Array.from(refs));
  });

  const res = [];
  const visited = new Set();
  function visit(n, stack = new Set()) {
    if (visited.has(n)) return;
    if (stack.has(n)) return; // cycle
    stack.add(n);
    for (const d of deps.get(n) || []) visit(d, stack);
    stack.delete(n);
    visited.add(n);
    res.push(n);
  }
  for (const k of deps.keys()) visit(k);
  return res.map((name) => map.get(name));
}

function sampleForColumn(col, idx, insertedMap) {
  const i = idx + 1;
  const name = col.databaseName;
  const type = (col.type || "").toString().toLowerCase();
  if (col.isPrimary && col.isGenerated) return undefined; // let DB generate
  if (col.isPrimary && !col.isGenerated && (type === "int" || type === "integer")) return i; // simple
  if (type.includes("uuid")) {
    // if DB won't generate, create one
    if (col.isPrimary && !col.isGenerated) return crypto.randomUUID();
    return undefined; // prefer DB gen when possible
  }
  if (type.includes("timestamp") || type.includes("timestamptz")) return new Date();
  if (type.includes("date") && !type.includes("time")) return new Date(2024, 0, i + 0); // Jan
  if (type.includes("time") && !type.includes("timestamp")) return "08:00:00";
  if (type.includes("int") || type.includes("integer")) return i;
  if (type.includes("boolean")) return i % 2 === 0 ? false : true;
  if (col.enum && col.enum.length) return col.enum[0];
  if (type === "json" || type === "jsonb") return {};
  // fallback text
  return `${name}_seed_${i}`;
}

async function run() {
  loadEnv();
  const opts = makeDbOptions();
  if (!opts.url) {
    console.error("DATABASE_URL not set in env");
    process.exit(1);
  }

  const dsOpts = DataSourceAppFactory.fromOptions(opts);
  const dataSource = new DataSource(dsOpts as any);
  await dataSource.initialize();

  const metas = dataSource.entityMetadatas.filter((m) => m.tableName);
  const ordered = topoSort(metas);

  const inserted = new Map();

  for (const meta of ordered) {
    const repo = dataSource.getRepository(meta.target as any);
    for (let i = 0; i < 2; i++) {
      const obj = {};
      meta.columns.forEach((col) => {
        const val = sampleForColumn(col, i, inserted);
        if (val !== undefined) obj[col.propertyName] = val;
      });
      // Wire relations to previously inserted parents when possible
      if (meta.relations && meta.relations.length) {
        for (const rel of meta.relations) {
          try {
            // skip many-to-many (handled via join tables)
            if (rel.isManyToMany) continue;
            const refMeta = rel.inverseEntityMetadata;
            const refTable = refMeta && refMeta.tableName;
            if (!refTable) continue;
            const refIds = inserted.get(refTable);
            if (!refIds || !refIds.length) continue;
            const firstId = refIds[0];
            // For owner relations (many-to-one / one-to-one owner) assign an object with pk
            if (rel.isManyToOne || rel.isOneToOneOwner) {
              const pk = refMeta.primaryColumns && refMeta.primaryColumns[0] && refMeta.primaryColumns[0].propertyName;
              if (pk) obj[rel.propertyName] = { [pk]: firstId };
              else obj[rel.propertyName] = firstId;
            }
          } catch (e) {
            // ignore relation wiring failures
          }
        }
      }
      try {
        const saved = await repo.save(obj);
        if (!inserted.has(meta.tableName)) inserted.set(meta.tableName, []);
        const pk = meta.primaryColumns[0]?.propertyName;
        const idVal = pk ? saved[pk] : saved;
        inserted.get(meta.tableName).push(idVal);
      } catch (err) {
        console.warn(`Skipping insert into ${meta.tableName}:`, err?.message || err);
      }
    }
  }

  await dataSource.destroy();
  console.log("Seeding complete");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
