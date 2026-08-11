const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const TOKEN_KEY = "sby_admin_token";

export class ApiError extends Error { status:number; constructor(status:number,message:string){super(message);this.status=status;} }
export const authStore = { get:()=>typeof window!=="undefined"?sessionStorage.getItem(TOKEN_KEY):null, set:(v:string)=>sessionStorage.setItem(TOKEN_KEY,v), clear:()=>sessionStorage.removeItem(TOKEN_KEY) };

export async function api<T>(path:string, options:RequestInit={}) : Promise<T> {
  if (!BASE_URL) throw new ApiError(503,"L’URL de l’API admin n’est pas configurée.");
  const token=authStore.get();
  const response=await fetch(`${BASE_URL}${path}`,{...options,headers:{"Content-Type":"application/json","ngrok-skip-browser-warning":"true",...(token&&{Authorization:`Bearer ${token}`}),...options.headers}});
  const payload=await response.json().catch(()=>null);
  if(response.status===401){authStore.clear();if(typeof window!=="undefined"&&!location.pathname.endsWith("/login"))location.href="/admin/login";}
  if(!response.ok)throw new ApiError(response.status,payload?.error?.message??"Une erreur est survenue.");
  return payload.data as T;
}
export const get=<T>(path:string)=>api<T>(path);
export const send=<T>(path:string,method:string,body?:unknown)=>api<T>(path,{method,body:body===undefined?undefined:JSON.stringify(body)});
export async function uploadImage(file:File):Promise<{url:string}>{
  if (!BASE_URL) throw new ApiError(503,"L’URL de l’API admin n’est pas configurée.");
  const token=authStore.get();
  const response=await fetch(`${BASE_URL}/api/admin/uploads/image`,{method:"POST",body:file,headers:{"Content-Type":file.type,"ngrok-skip-browser-warning":"true",...(token&&{Authorization:`Bearer ${token}`})}});
  const payload=await response.json().catch(()=>null);
  if(!response.ok)throw new ApiError(response.status,payload?.error?.message??"Impossible d’envoyer l’image.");
  return payload.data;
}
export const uploadProductImage=uploadImage;
