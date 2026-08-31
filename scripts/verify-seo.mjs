const baseUrl = new URL(process.argv[2] || process.env.SEO_BASE_URL || "http://localhost:3000");
const productionOrigin = "https://skinbyyas.com";
const obsoleteOrigin = /(?:skin-by-yas-agadir\.)?bawlamarwan09\.chatgpt\.site|chatgpt\.site/i;

const staticPaths = [
  "/",
  "/produits",
  "/skincare",
  "/soins-cheveux",
  "/soins-corps",
  "/solaires",
  "/parapharmacie-agadir",
  "/nails-agadir",
  "/conseils",
  "/marques",
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function attribute(html, selector, attributeName) {
  const tag = html.match(selector)?.[0];
  if (!tag) return "";
  return tag.match(new RegExp(`${escapeRegex(attributeName)}=["']([^"']+)["']`, "i"))?.[1] || "";
}

function metaContent(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const tag = tags.find((item) =>
    new RegExp(`(?:name|property)=["']${escapeRegex(name)}["']`, "i").test(item),
  );
  return tag ? attribute(tag, /<meta\b[^>]*>/i, "content") : "";
}

function canonical(html) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const tag = tags.find((item) => /rel=["']canonical["']/i.test(item));
  return tag ? attribute(tag, /<link\b[^>]*>/i, "href") : "";
}

async function request(path, options = {}) {
  const response = await fetch(new URL(path, baseUrl), { redirect: "follow", ...options });
  return { response, html: options.method === "HEAD" ? "" : await response.text() };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function inspectHtml(path, html) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
  const description = metaContent(html, "description");
  const canonicalUrl = canonical(html);
  const robots = metaContent(html, "robots");
  const openGraphUrl = metaContent(html, "og:url");
  const openGraphTitle = metaContent(html, "og:title");
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];

  assert(title, `${path}: missing title`);
  assert(description, `${path}: missing meta description`);
  const expectedCanonical = `${productionOrigin}${path === "/" ? "/" : path}`;
  assert(canonicalUrl === expectedCanonical, `${path}: canonical ${canonicalUrl} does not match ${expectedCanonical}`);
  assert(!/noindex/i.test(robots), `${path}: public page is noindex`);
  assert(h1Count === 1, `${path}: expected exactly one H1, found ${h1Count}`);
  assert(openGraphUrl === expectedCanonical, `${path}: missing or incorrect og:url`);
  assert(openGraphTitle, `${path}: missing og:title`);
  assert(!obsoleteOrigin.test(html), `${path}: contains an obsolete origin`);
  for (const [, json] of jsonLd) JSON.parse(json.replace(/&quot;/g, '"'));

  return { title, canonicalUrl, jsonLd: jsonLd.length };
}

async function main() {
  const sitemapResponse = await request("/sitemap.xml");
  assert(sitemapResponse.response.ok, `sitemap.xml returned ${sitemapResponse.response.status}`);
  assert(!obsoleteOrigin.test(sitemapResponse.html), "sitemap contains an obsolete origin");
  const sitemapUrls = [...sitemapResponse.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert(new Set(sitemapUrls).size === sitemapUrls.length, "sitemap contains duplicate URLs");
  const sitemapPaths = sitemapUrls.map((value) => new URL(value).pathname);

  const productPath = sitemapPaths.find((path) => /^\/produits\/[^/]+$/.test(path));
  const articlePath = sitemapPaths.find((path) => /^\/conseils\/[^/]+$/.test(path));
  const brandPath = sitemapPaths.find((path) => /^\/marques\/[^/]+$/.test(path));
  assert(articlePath, "sitemap must include at least one published article");
  assert(brandPath, "sitemap must include at least one active brand");
  const dynamicPaths = [productPath, articlePath, brandPath].filter(Boolean);

  const inspectedPaths = [...new Set([...staticPaths, ...dynamicPaths])];
  const htmlByPath = new Map();
  for (const path of inspectedPaths) {
    const { response, html } = await request(path);
    assert(response.status === 200, `${path}: expected 200, received ${response.status}`);
    htmlByPath.set(path, html);
    const result = inspectHtml(path, html);
    console.log(`✓ ${path} — ${result.title}`);
  }

  const titles = inspectedPaths.map((path) => inspectHtml(path, htmlByPath.get(path)).title);
  assert(new Set(titles).size === titles.length, "representative public pages do not have unique titles");

  for (const path of ["/produits/seo-verification-missing", "/conseils/seo-verification-missing", "/produits/produit-test-skin-by-yas"]) {
    const { response } = await request(path);
    assert(response.status === 404, `${path}: expected 404, received ${response.status}`);
    console.log(`✓ ${path} — 404`);
  }

  const search = await request("/produits?q=cerave");
  assert(search.response.status === 200, "internal search did not return 200");
  assert(/noindex/i.test(metaContent(search.html, "robots")), "internal search must be noindex");
  assert(canonical(search.html) === `${productionOrigin}/produits`, "internal search canonical is incorrect");

  const cart = await request("/panier");
  assert(/noindex/i.test(metaContent(cart.html, "robots")), "cart must be noindex");

  const admin = await request("/admin/login");
  assert(/noindex/i.test(metaContent(admin.html, "robots")), "admin must be noindex");

  const internalPaths = new Set();
  for (const path of inspectedPaths) {
    const { html } = await request(path);
    for (const match of html.matchAll(/<a\b[^>]*href=["']([^"'#?]+)["']/gi)) {
      if (match[1].startsWith("/") && !match[1].startsWith("//")) internalPaths.add(match[1]);
    }
  }
  for (const path of internalPaths) {
    const { response } = await request(path, { method: "HEAD" });
    assert(response.status < 400, `broken internal link: ${path} (${response.status})`);
  }

  for (const url of sitemapUrls) {
    assert(url.startsWith(productionOrigin), `non-production sitemap URL: ${url}`);
    const path = new URL(url).pathname;
    const { response, html } = await request(path);
    assert(response.status === 200, `sitemap URL failed: ${url} (${response.status})`);
    assert(canonical(html) === url, `sitemap URL is not self-canonical: ${url}`);
  }

  assert(!sitemapPaths.includes("/panier"), "cart must not be in the sitemap");
  assert(!sitemapPaths.some((path) => path.startsWith("/admin")), "admin must not be in the sitemap");
  assert(!sitemapPaths.includes("/produits/produit-test-skin-by-yas"), "test product must not be in the sitemap");

  const productListing = htmlByPath.get("/produits") || "";
  if (productPath) {
    assert(productListing.includes(`href=\"${productPath}\"`), "product listing does not contain its active product link in raw HTML");
  }
  assert(/\/conseils\/[^\"']+/.test(htmlByPath.get("/conseils") || ""), "article links are missing from raw HTML");
  assert(/\/marques\/[^\"']+/.test(htmlByPath.get("/marques") || ""), "brand links are missing from raw HTML");

  console.log(`\nSEO verification passed for ${inspectedPaths.length} representative public pages and ${sitemapUrls.length} sitemap URLs.`);
  assert(productPath, "no legitimate active product exists, so product-page verification cannot pass");
}

main().catch((error) => {
  console.error(`SEO verification failed: ${error.message}`);
  process.exitCode = 1;
});
