import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("uses one canonical production origin", async () => {
  const [site, layout, sitemap, robots] = await Promise.all([
    read("app/lib/site.ts"),
    read("app/layout.tsx"),
    read("app/sitemap.ts"),
    read("app/robots.ts"),
  ]);

  assert.match(site, /https:\/\/skinbyyas\.com/);
  assert.match(site, /NEXT_PUBLIC_SITE_URL/);
  assert.match(layout, /metadataBase:\s*new URL\(SITE_URL\)/);
  assert.match(sitemap, /canonicalUrl/);
  assert.match(robots, /canonicalUrl\("\/sitemap\.xml"\)/);
  assert.doesNotMatch(`${site}${layout}${sitemap}${robots}`, /chatgpt\.site/);
});

test("protects utility routes with crawlable noindex metadata", async () => {
  const [robots, cart, admin] = await Promise.all([
    read("app/robots.ts"),
    read("app/panier/page.tsx"),
    read("app/admin/[[...segments]]/page.tsx"),
  ]);

  assert.doesNotMatch(robots, /disallow/);
  assert.doesNotMatch(robots, /_next|images|api/);
  assert.match(cart, /index:\s*false/);
  assert.match(cart, /follow:\s*false/);
  assert.match(admin, /index:false/);
  assert.match(admin, /follow:false/);
});

test("public product API excludes test and inactive taxonomy records", async () => {
  const controller = await read("backend/src/controllers/product.controller.js");
  assert.match(controller, /startsWith:"\[TEST\]"/);
  assert.match(controller, /category:\{isActive:true\}/);
  assert.match(controller, /brand:\{isActive:true\}/);
  assert.match(controller, /getProduct[\s\S]*publicProductWhere/);
});

test("dynamic public pages use server metadata and true not-found handling", async () => {
  const pages = await Promise.all([
    read("app/produits/[slug]/page.tsx"),
    read("app/conseils/[slug]/page.tsx"),
    read("app/marques/[slug]/page.tsx"),
  ]);

  for (const page of pages) {
    assert.match(page, /generateMetadata/);
    assert.match(page, /notFound\(\)/);
    assert.match(page, /JsonLd/);
    assert.match(page, /canonicalUrl/);
  }
});

test("sitemap excludes private routes and is populated from public API data", async () => {
  const sitemap = await read("app/sitemap.ts");
  assert.match(sitemap, /getProducts/);
  assert.match(sitemap, /getArticles/);
  assert.match(sitemap, /getBrands/);
  assert.doesNotMatch(sitemap, /\/admin|\/panier/);
  assert.doesNotMatch(sitemap, /new Date\(\)/);
});
