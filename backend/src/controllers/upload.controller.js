import { mkdir, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { resolve } from "node:path";
import { AppError, ok } from "../utils/api.js";

const extensions = {"image/jpeg":"jpg","image/png":"png","image/webp":"webp","image/gif":"gif"};
const validSignature=(type,file)=>type==="image/jpeg"?file.subarray(0,3).equals(Buffer.from([0xff,0xd8,0xff])):type==="image/png"?file.subarray(0,8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])):type==="image/gif"?file.subarray(0,4).toString()==="GIF8":type==="image/webp"?file.subarray(0,4).toString()==="RIFF"&&file.subarray(8,12).toString()==="WEBP":false;

export async function uploadImage(req,res){
  const type=(req.headers["content-type"]??"").split(";")[0].toLowerCase();
  const extension=extensions[type];
  if(!extension)throw new AppError(415,"INVALID_IMAGE_TYPE","Formats acceptés : JPG, PNG, WebP ou GIF.");
  if(!Buffer.isBuffer(req.body)||req.body.length===0)throw new AppError(400,"EMPTY_IMAGE","Le fichier image est vide.");
  if(!validSignature(type,req.body))throw new AppError(415,"INVALID_IMAGE_FILE","Le contenu du fichier ne correspond pas à une image valide.");
  const directory=resolve("uploads/images");
  await mkdir(directory,{recursive:true});
  const filename=`${randomUUID()}.${extension}`;
  await writeFile(resolve(directory,filename),req.body,{flag:"wx"});
  ok(res,{url:`${req.protocol}://${req.get("host")}/uploads/images/${filename}`},201);
}

export const uploadProductImage=uploadImage;
