import {prisma} from "../config/prisma.js";
import {AppError} from "../utils/api.js";
import {slugify} from "./articleGenerator.service.js";

const clean=value=>String(value??"").replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim();
async function uniqueSlug(name){const base=slugify(name)||"produit-skin-by-yas";let candidate=base,index=2;while(await prisma.product.findUnique({where:{slug:candidate},select:{id:true}}))candidate=`${base}-${index++}`;return candidate;}
export async function generateProductDraft({name,categoryId,brandId,verifiedDetails}){
 const [category,brand]=await Promise.all([prisma.category.findUnique({where:{id:categoryId},select:{id:true,name:true,slug:true,isActive:true}}),brandId?prisma.brand.findUnique({where:{id:brandId},select:{id:true,name:true,slug:true,isActive:true}}):null]);
 if(!category)throw new AppError(400,"INVALID_CATEGORY","La catégorie sélectionnée est introuvable.");
 if(brandId&&!brand)throw new AppError(400,"INVALID_BRAND","La marque sélectionnée est introuvable.");
 const productName=clean(name),details=clean(verifiedDetails),brandText=brand?` de la marque ${brand.name}`:"",categoryText=category.name.toLowerCase();
 const paragraphs=[`${productName} est une référence ${categoryText}${brandText} enregistrée dans la sélection Skin by Yas. Consultez les informations de l’emballage et les indications fournies par la marque avant utilisation.`];
 if(details)paragraphs.push(`Informations vérifiées communiquées pour ce produit : ${details}`);
 paragraphs.push("Choisissez ce produit selon vos préférences, son format et la place que vous souhaitez lui donner dans votre routine. Aucune propriété médicale ou promesse non vérifiée n’est ajoutée à cette fiche.");
 const seoTitle=`${productName}${brand?` – ${brand.name}`:""} | Skin by Yas`.slice(0,65);
 const seoDescription=`Découvrez ${productName}${brand?` de ${brand.name}`:""}, disponible dans la sélection ${category.name} de Skin by Yas à Agadir.`.slice(0,160);
 return{name:productName,slug:await uniqueSlug(productName),description:paragraphs.join("\n\n"),seoTitle,seoDescription,categoryId:category.id,brandId:brand?.id??null};
}

