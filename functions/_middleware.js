import { isValidAdminSession } from "./_utils/admin-auth.js";
export async function onRequest(context) {
 const url=new URL(context.request.url);
 if(url.pathname==="/admin.html"||url.pathname==="/admin") {
  if(await isValidAdminSession(context.request,context.env)) {
   const response=await context.next(); const headers=new Headers(response.headers);
   headers.set("Cache-Control","private, no-store, max-age=0"); headers.set("X-Frame-Options","DENY"); headers.set("Referrer-Policy","same-origin"); headers.set("X-Content-Type-Options","nosniff");
   return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
  }
  return Response.redirect(new URL("/admin-login.html?next=%2Fadmin.html",url.origin),302);
 }
 return context.next();
}
