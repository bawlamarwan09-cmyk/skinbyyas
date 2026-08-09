import type { MetadataRoute } from "next";
const base = "https://skin-by-yas-agadir.bawlamarwan09.chatgpt.site";
export default function sitemap(): MetadataRoute.Sitemap { return ["","/produits","/skincare","/soins-cheveux","/soins-corps","/solaires","/marques","/parapharmacie-agadir","/nails-agadir","/conseils"].map(path => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : .8 })); }
