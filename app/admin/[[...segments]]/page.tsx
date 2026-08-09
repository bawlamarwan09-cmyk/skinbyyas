import type { Metadata } from "next";
import AdminApp from "../AdminApp";
import "../admin.css";
export const metadata:Metadata={title:"Administration | Skin by Yas",robots:{index:false,follow:false}};
export default async function Page({params}:{params:Promise<{segments?:string[]}>}){const {segments=[]}=await params;return <AdminApp segments={segments}/>;}
