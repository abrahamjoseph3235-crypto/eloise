import { createAdminSession, json } from "../../_utils/admin-auth.js";
export async function onRequestPost({request,env}) {
 if(!env.ADMIN_USERNAME||!env.ADMIN_PASSWORD||!env.ADMIN_SESSION_SECRET)return json({ok:false,message:"Admin login is not configured on the server."},503);
 const origin=request.headers.get("Origin");
 if(origin&&new URL(origin).host!==new URL(request.url).host)return json({ok:false,message:"Request origin rejected."},403);
 let body; try{body=await request.json();}catch{return json({ok:false,message:"Invalid request."},400);}
 const username=typeof body.username==="string"?body.username:"",password=typeof body.password==="string"?body.password:"";
 if(username.length>128||password.length>1024||username!==env.ADMIN_USERNAME||password!==env.ADMIN_PASSWORD)return json({ok:false,message:"Username or password is incorrect."},401);
 const token=await createAdminSession(username,env.ADMIN_SESSION_SECRET);
 return json({ok:true},200,{"Set-Cookie":"eloise_admin_session="+token+"; Path=/; Max-Age=28800; HttpOnly; Secure; SameSite=Strict"});
}
