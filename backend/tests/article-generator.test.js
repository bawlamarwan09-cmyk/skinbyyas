import test from "node:test";
import assert from "node:assert/strict";
import {prisma} from "../src/config/prisma.js";
import {detectIntent,generateArticleDraft} from "../src/services/articleGenerator.service.js";

test("selection guide without products stays generic",async()=>{const draft=await generateArticleDraft({topic:"Comment choisir son nettoyant visage ?",category:"SKINCARE"});assert.equal(detectIntent(draft.title),"selection");assert.match(draft.content,/Comprendre|Définir/);assert.deepEqual(draft.relatedProductIds,[]);assert.doesNotMatch(draft.content,/produit-test-skin-by-yas/i)});
test("only selected real products are mentioned",async t=>{const products=await prisma.product.findMany({take:2,orderBy:{createdAt:"asc"}});if(!products.length)return t.skip("No product fixture");const selected=products[0];const draft=await generateArticleDraft({topic:"Comment choisir son nettoyant visage ?",category:"SKINCARE",productIds:[selected.id]});assert.match(draft.content,new RegExp(selected.name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")));for(const other of products.slice(1))assert.doesNotMatch(draft.content,new RegExp(other.name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")));assert.deepEqual(draft.relatedProductIds,[selected.id])});
test("solar SPF topic uses comparison structure",async()=>{const draft=await generateArticleDraft({topic:"SPF 30 ou SPF 50 : quelle différence ?",category:"SOLAIRES"});assert.equal(draft.intent,"comparison");assert.match(draft.content,/Comprendre les deux options/);assert.match(draft.content,/href="\/solaires"/)});
test("routine topic uses ordered steps",async()=>{const draft=await generateArticleDraft({topic:"Routine skincare simple",category:"SKINCARE"});assert.equal(draft.intent,"routine");assert.match(draft.content,/<ol>/)});
test("unknown topic safely falls back to care guide",async()=>{const draft=await generateArticleDraft({topic:"Mes préférences du matin",category:"SKINCARE"});assert.equal(draft.intent,"care");assert.match(draft.content,/Prendre soin|Identifier ses besoins/)});
test("invalid product ID is rejected",async()=>{await assert.rejects(()=>generateArticleDraft({topic:"Comment choisir un soin ?",category:"SKINCARE",productIds:["missing-product-id"]}),error=>error?.code==="INVALID_PRODUCT_IDS")});

test.after(async()=>{await prisma.$disconnect()});
