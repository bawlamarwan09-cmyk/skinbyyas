import { cache } from "react";

const API_URL = (
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || ""
).replace(/\/$/, "");

const API_HEADERS = { "ngrok-skip-browser-warning": "true" };

export interface ProductImage {
  id?: string;
  url: string;
  alt?: string | null;
  position?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  description?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: string | number;
  compareAtPrice?: string | number | null;
  sku?: string | null;
  stock: number;
  isActive: boolean;
  isFeatured?: boolean;
  seoTitle?: string | null;
  seoDescription?: string | null;
  category: Category;
  brand?: Brand | null;
  images: ProductImage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  coverImage?: string | null;
  category: "SKINCARE" | "SOLAIRES" | "CHEVEUX" | "NAILS";
  seoTitle?: string | null;
  seoDescription?: string | null;
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Collection<T> {
  data: T[];
  pagination: Pagination;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  error?: { message?: string };
}

export class PublicApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = "PublicApiError";
  }
}

async function apiGet<T>(path: string, revalidate: number | false = false): Promise<T | null> {
  if (!API_URL) throw new PublicApiError("L’URL de l’API publique n’est pas configurée.");

  const response = await fetch(`${API_URL}${path}`, {
    headers: API_HEADERS,
    ...(revalidate === false
      ? { cache: "no-store" as const }
      : { next: { revalidate } }),
  });

  if (response.status === 404) return null;

  let payload: ApiEnvelope<T>;
  try {
    payload = (await response.json()) as ApiEnvelope<T>;
  } catch {
    throw new PublicApiError("Réponse invalide de l’API publique.", response.status);
  }

  if (!response.ok || !payload.success) {
    throw new PublicApiError(payload.error?.message || "Erreur de l’API publique.", response.status);
  }

  return payload.data;
}

async function fetchCollection<T>(path: string, revalidate: number | false = false) {
  const first = await apiGet<Collection<T>>(`${path}${path.includes("?") ? "&" : "?"}page=1&limit=100`, revalidate);
  if (!first) return { data: [], pagination: { page: 1, limit: 100, total: 0, totalPages: 0 } } satisfies Collection<T>;
  if (first.pagination.totalPages <= 1) return first;

  const remaining = await Promise.all(
    Array.from({ length: first.pagination.totalPages - 1 }, (_, index) =>
      apiGet<Collection<T>>(`${path}${path.includes("?") ? "&" : "?"}page=${index + 2}&limit=100`, revalidate),
    ),
  );

  return {
    data: [first.data, ...remaining.map((page) => page?.data || [])].flat(),
    pagination: first.pagination,
  } satisfies Collection<T>;
}

export const getProduct = cache((slug: string) => apiGet<Product>(`/api/products/${encodeURIComponent(slug)}`));
export const getArticle = cache((slug: string) => apiGet<Article>(`/api/articles/${encodeURIComponent(slug)}`, 300));
export const getBrand = cache((slug: string) => apiGet<Brand>(`/api/brands/${encodeURIComponent(slug)}`, 300));
export const getCategory = cache((slug: string) => apiGet<Category>(`/api/categories/${encodeURIComponent(slug)}`, 300));

export const getProducts = cache((query = "") => fetchCollection<Product>(`/api/products${query ? `?${query}` : ""}`));
export const getArticles = cache((query = "") => fetchCollection<Article>(`/api/articles${query ? `?${query}` : ""}`, 300));
export const getBrands = cache(async () => (await apiGet<Brand[]>("/api/brands", 300)) || []);
export const getCategories = cache(async () => (await apiGet<Category[]>("/api/categories", 300)) || []);

export async function optional<T>(request: Promise<T>): Promise<T | undefined> {
  try {
    return await request;
  } catch {
    return undefined;
  }
}
