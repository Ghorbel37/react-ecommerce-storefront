// In-browser stand-in for json-server 0.17, covering the routes the shop uses.
// Read-only collections come from api/db.json; carts and orders live in localStorage.
import db from "../../api/db.json";

type Row = Record<string, unknown> & { id: string | number };

const STORAGE_PREFIX = "mockApi:";
const STATIC: Record<string, Row[]> = {
  products: db.products as Row[],
  categories: db.categories as Row[],
  slides: db.slides as Row[],
};
const STORED = ["carts", "orders"];

function load(name: string): Row[] {
  if (STATIC[name]) return STATIC[name];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_PREFIX + name) ?? "[]");
  } catch {
    return [];
  }
}

function save(name: string, rows: Row[]) {
  localStorage.setItem(STORAGE_PREFIX + name, JSON.stringify(rows));
}

function json(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function matches(row: Row, params: URLSearchParams): boolean {
  for (const [key, value] of params) {
    if (key.startsWith("_")) continue;
    if (key === "q") {
      const needle = value.toLowerCase();
      const hit = Object.values(row).some((v) => String(v).toLowerCase().includes(needle));
      if (!hit) return false;
    } else if (String(row[key]) !== value) {
      return false;
    }
  }
  return true;
}

function list(name: string, params: URLSearchParams): Response {
  let rows = load(name).filter((row) => matches(row, params));

  const sort = params.get("_sort");
  if (sort) {
    const dir = params.get("_order") === "desc" ? -1 : 1;
    rows = [...rows].sort((a, b) => (a[sort]! > b[sort]! ? dir : a[sort]! < b[sort]! ? -dir : 0));
  }

  const headers: Record<string, string> = {};
  const limit = params.has("_limit") ? Number(params.get("_limit")) : undefined;
  if (params.has("_page")) {
    const page = Number(params.get("_page"));
    const size = limit ?? 10;
    headers["X-Total-Count"] = String(rows.length);
    rows = rows.slice((page - 1) * size, page * size);
  } else if (limit !== undefined) {
    rows = rows.slice(0, limit);
  }
  return json(rows, 200, headers);
}

export async function mockFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const url = new URL(path, "http://mock.local");
  const [name, id] = url.pathname.split("/").filter(Boolean);
  const method = (init.method ?? "GET").toUpperCase();

  if (!STATIC[name] && !STORED.includes(name)) return json({}, 404);

  if (!id) {
    if (method === "GET") return list(name, url.searchParams);
    if (method === "POST" && STORED.includes(name)) {
      const row = { ...JSON.parse(String(init.body ?? "{}")), id: newId() };
      save(name, [...load(name), row]);
      return json(row, 201);
    }
    return json({}, 405);
  }

  const rows = load(name);
  const index = rows.findIndex((row) => String(row.id) === id);

  if (method === "GET") return index === -1 ? json({}, 404) : json(rows[index]);
  if (!STORED.includes(name)) return json({}, 405);
  if (index === -1) return json({}, 404);

  if (method === "PUT") {
    rows[index] = { ...JSON.parse(String(init.body ?? "{}")), id: rows[index].id };
    save(name, rows);
    return json(rows[index]);
  }
  if (method === "DELETE") {
    save(name, rows.filter((_, i) => i !== index));
    return json({});
  }
  return json({}, 405);
}
