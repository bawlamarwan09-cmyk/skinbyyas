import{readdir}from"node:fs/promises";import{spawnSync}from"node:child_process";import{join}from"node:path";
async function files(dir){return(await readdir(dir,{withFileTypes:true})).flatMap(e=>e.isDirectory()?[]:[join(dir,e.name)]);}
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});let out=[];for(const e of entries)out=e.isDirectory()?out.concat(await walk(join(dir,e.name))):out.concat(join(dir,e.name));return out;}
for(const file of (await walk("src")).filter(f=>f.endsWith(".js"))){const result=spawnSync(process.execPath,["--check",file],{stdio:"inherit"});if(result.status)process.exit(result.status);}console.log("Syntax check passed.");
