import { prisma } from "../src/config/prisma.js";
import { articles } from "../src/data/skin-by-yas-articles.ts";

const routeMap = new Map([
  ["/category/protection-solaire", "/solaires"],
  ["/category/peau-grasse", "/skincare"],
  ["/category/nettoyants", "/skincare"],
  ["/category/hydratants", "/skincare"],
  ["/category/peau-sensible", "/skincare"],
  ["/category/peau-seche", "/skincare"],
  ["/brand/cerave", "/marques/cerave"],
  ["/brand/la-roche-posay", "/marques/la-roche-posay"],
  ["/brand/eucerin", "/marques/eucerin"],
]);

const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const inline = (value) => escapeHtml(value).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

function markdownToHtml(markdown) {
  const lines = markdown.trim().split(/\r?\n/);
  const output = [];
  let list = null;

  const closeList = () => {
    if (list) output.push(`</${list}>`);
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      closeList();
      continue;
    }
    if (line.startsWith("# ")) continue;
    if (line.startsWith("### ")) {
      closeList();
      output.push(`<h3>${inline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      closeList();
      output.push(`<h2>${inline(line.slice(3))}</h2>`);
      continue;
    }
    if (/^[-*] /.test(line)) {
      if (list !== "ul") {
        closeList();
        output.push("<ul>");
        list = "ul";
      }
      output.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }
    closeList();
    output.push(`<p>${inline(line)}</p>`);
  }
  closeList();
  return output.join("\n");
}

function categoryFor(article) {
  const text = `${article.title} ${article.tags.join(" ")}`.toLowerCase();
  if (/solaire|spf/.test(text)) return "SOLAIRES";
  if (/cheveu|shampoo/.test(text)) return "CHEVEUX";
  if (/nail|ongle/.test(text)) return "NAILS";
  return "SKINCARE";
}

for (const [index, article] of articles.entries()) {
  const related = article.relatedLinks
    .map(({ label, href }) => `<li><a href="${routeMap.get(href) ?? href}">${inline(label)}</a></li>`)
    .join("");
  const content = `${markdownToHtml(article.content)}${related ? `<h2>À découvrir chez Skin by Yas</h2><ul>${related}</ul>` : ""}`;
  const data = {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    coverImage: article.image,
    content,
    category: categoryFor(article),
    seoTitle: article.seoTitle,
    seoDescription: article.metaDescription,
    isPublished: true,
    publishedAt: new Date(Date.now() - index * 60_000),
  };
  await prisma.article.upsert({ where: { slug: article.slug }, create: data, update: data });
}

console.log(`${articles.length} articles imported successfully.`);
await prisma.$disconnect();
