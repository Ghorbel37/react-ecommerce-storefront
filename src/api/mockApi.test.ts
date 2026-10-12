import { beforeEach, describe, expect, it } from "vitest";
import { mockFetch } from "./mockApi";
import db from "../../api/db.json";

async function get(path: string) {
  const res = await mockFetch(path);
  return { res, body: await res.json() };
}

describe("mock API", () => {
  beforeEach(() => localStorage.clear());

  it("filters products by category", async () => {
    const { body } = await get("/products?categoryId=100");
    expect(body.length).toBeGreaterThan(0);
    expect(body.every((p: { categoryId: string }) => p.categoryId === "100")).toBe(true);
  });

  it("matches boolean flags given as query strings", async () => {
    const { body } = await get("/products?isTopSeller=true");
    expect(body.length).toBe(db.products.filter((p) => p.isTopSeller).length);
  });

  it("searches any field with q, case-insensitively", async () => {
    const { body } = await get("/products?q=IPHONE");
    expect(body.length).toBeGreaterThan(0);
    expect(body.every((p: { name: string }) => p.name.toLowerCase().includes("iphone"))).toBe(true);
  });

  it("paginates and reports the total in X-Total-Count", async () => {
    const { res, body } = await get("/products?_page=2&_limit=12");
    expect(res.headers.get("X-Total-Count")).toBe(String(db.products.length));
    expect(body.map((p: { id: number }) => p.id)).toEqual(db.products.slice(12, 24).map((p) => p.id));
  });

  it("returns one product by id, or 404", async () => {
    expect((await get("/products/1015")).body.id).toBe(1015);
    expect((await mockFetch("/products/999999")).status).toBe(404);
  });

  it("stores posted orders", async () => {
    const res = await mockFetch("/orders", { method: "POST", body: JSON.stringify({ total: 12 }) });
    expect(res.status).toBe(201);
    const { body } = await get("/orders");
    expect(body).toEqual([{ total: 12, id: expect.any(String) }]);
  });

  it("does not let the read-only catalog be changed", async () => {
    const res = await mockFetch("/products/1015", { method: "DELETE" });
    expect(res.status).toBe(405);
  });
});
