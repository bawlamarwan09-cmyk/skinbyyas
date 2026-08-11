import test from "node:test";
import assert from "node:assert/strict";
import {prisma} from "../src/config/prisma.js";
import {generateProductDraft} from "../src/services/productGenerator.service.js";

test("generates a grounded product draft from real taxonomy",async t=>{const category=await prisma.category.findFirst(),brand=await prisma.brand.findFirst();if(!category)return t.skip("No category fixture");const draft=await generateProductDraft({name:"Produit Démo",categoryId:category.id,brandId:brand?.id,verifiedDetails:"Flacon de 200 ml. Utilisation indiquée sur l’emballage."});assert.match(draft.description,/Flacon de 200 ml/);assert.equal(draft.categoryId,category.id);assert.equal(draft.brandId,brand?.id??null);assert.match(draft.slug,/^produit-demo(?:-\d+)?$/)});
test("does not invent medical or efficacy claims",async t=>{const category=await prisma.category.findFirst();if(!category)return t.skip("No category fixture");const draft=await generateProductDraft({name:"Produit Neutre",categoryId:category.id,verifiedDetails:""});assert.doesNotMatch(draft.description,/guérit|traite|eczéma|acné|garanti|médicalement/i)});
test("rejects an unknown category",async()=>{await assert.rejects(()=>generateProductDraft({name:"Produit",categoryId:"missing-category",verifiedDetails:""}),error=>error?.code==="INVALID_CATEGORY")});

test.after(async()=>{await prisma.$disconnect()});
