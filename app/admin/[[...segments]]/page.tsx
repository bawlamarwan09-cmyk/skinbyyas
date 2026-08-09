import type { Metadata } from "next";
import AdminApp from "@/app/admin/AdminApp";
import "@/app/admin/admin.css";
export const metadata:Metadata={title:"Administration | Skin by Yas",robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{segments?:string[]}>}){const {segments=[]}=await params;return <AdminApp segments={segments}/>;}
