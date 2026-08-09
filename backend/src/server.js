import {app}from"./app.js";import{env}from"./config/env.js";import{prisma}from"./config/prisma.js";
const server=app.listen(env.PORT,()=>console.log(`Skin by Yas API listening on port ${env.PORT}`));
async function shutdown(signal){console.log(`${signal}: stopping API`);server.close(async()=>{await prisma.$disconnect();process.exit(0);});setTimeout(()=>process.exit(1),10000).unref();}
process.on("SIGTERM",()=>shutdown("SIGTERM"));process.on("SIGINT",()=>shutdown("SIGINT"));
