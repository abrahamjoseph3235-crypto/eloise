import { json } from "../../_utils/admin-auth.js";
export async function onRequestPost({request}) {
 const origin=request.headers.get("Origin");
 if(origin&&new URL(origin).host!==new URL(request.url).host)return json({ok:false},403);
 return json({ok:true},200,{"Set-Cookie":"eloise_admin_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict"});
}
