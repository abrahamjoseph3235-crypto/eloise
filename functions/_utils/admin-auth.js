const encoder = new TextEncoder();
function b64u(bytes) { let s=""; for (const b of bytes) s+=String.fromCharCode(b); return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,""); }
function unb64u(v) { const b=v.replace(/-/g,"+").replace(/_/g,"/")+"=".repeat((4-v.length%4)%4); return Uint8Array.from(atob(b),c=>c.charCodeAt(0)); }
async function sign(v,secret) { const k=await crypto.subtle.importKey("raw",encoder.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]); return new Uint8Array(await crypto.subtle.sign("HMAC",k,encoder.encode(v))); }
export async function createAdminSession(username,secret) { const expires=Math.floor(Date.now()/1000)+28800; const payload=b64u(encoder.encode(JSON.stringify({username,expires}))); return payload+"."+b64u(await sign(payload,secret)); }
export async function isValidAdminSession(request,env) {
 if(!env.ADMIN_SESSION_SECRET||!env.ADMIN_USERNAME)return false;
 const m=(request.headers.get("Cookie")||"").match(/(?:^|;\s*)eloise_admin_session=([^;]+)/); if(!m)return false;
 const p=m[1].split("."); if(p.length!==2)return false;
 let got; try{got=unb64u(p[1]);}catch{return false;}
 const want=await sign(p[0],env.ADMIN_SESSION_SECRET); if(got.length!==want.length)return false;
 let diff=0; for(let i=0;i<want.length;i++)diff|=got[i]^want[i]; if(diff!==0)return false;
 try{const v=JSON.parse(new TextDecoder().decode(unb64u(p[0])));return v.username===env.ADMIN_USERNAME&&Number.isInteger(v.expires)&&v.expires>Math.floor(Date.now()/1000);}catch{return false;}
}
export function json(data,status=200,headers={}) { return new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff",...headers}}); }
