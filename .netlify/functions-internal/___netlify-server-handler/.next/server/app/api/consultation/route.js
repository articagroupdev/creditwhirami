"use strict";(()=>{var e={};e.id=17,e.ids=[17],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1785:(e,t,o)=>{o.r(t),o.d(t,{originalPathname:()=>g,patchFetch:()=>x,requestAsyncStorage:()=>c,routeModule:()=>d,serverHooks:()=>m,staticGenerationAsyncStorage:()=>u});var r={};o.r(r),o.d(r,{GET:()=>p,POST:()=>l});var n=o(9303),s=o(8716),a=o(670),i=o(7070);async function l(e){try{let{name:t,email:o,phone:r,message:n}=await e.json();if(!t||!o)return i.NextResponse.json({error:"Name and email are required"},{status:400});let s={to:"info@creditwhitrami.com",subject:"New Free Consultation - Credit with Rami",html:`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e40af; margin: 0;">New Free Consultation</h1>
              <p style="color: #6b7280; margin: 10px 0 0 0;">Request from website</p>
            </div>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin: 0 0 15px 0; font-size: 18px;">Client Information</h2>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #1f2937;">Name:</strong>
                <span style="color: #4b5563; margin-left: 10px;">${t}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #1f2937;">Email:</strong>
                <span style="color: #4b5563; margin-left: 10px;">${o}</span>
              </div>
              
              ${r?`
                <div style="margin-bottom: 15px;">
                  <strong style="color: #1f2937;">Phone:</strong>
                  <span style="color: #4b5563; margin-left: 10px;">${r}</span>
                </div>
              `:""}
            </div>
            
            ${n?`
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">Client Message:</h3>
                <p style="color: #1e40af; margin: 0; line-height: 1.6;">${n}</p>
              </div>
            `:""}
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                This message was sent from the free consultation form on 
                <strong>creditwhitrami.com</strong>
              </p>
              <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 12px;">
                Date: ${new Date().toLocaleString("en-US",{timeZone:"America/New_York",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}
              </p>
            </div>
          </div>
        </div>
      `};return console.log("Email would be sent to:",s.to),console.log("Subject:",s.subject),console.log("From:",t,"-",o),i.NextResponse.json({success:!0,message:"Consultation request sent successfully",data:{name:t,email:o,phone:r||null,timestamp:new Date().toISOString()}})}catch(e){return console.error("Error processing consultation request:",e),i.NextResponse.json({error:"Internal server error",message:"Failed to process consultation request"},{status:500})}}async function p(){return i.NextResponse.json({error:"Method not allowed"},{status:405})}let d=new n.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/consultation/route",pathname:"/api/consultation",filename:"route",bundlePath:"app/api/consultation/route"},resolvedPagePath:"/Users/cesararteaga/rami/src/app/api/consultation/route.ts",nextConfigOutput:"standalone",userland:r}),{requestAsyncStorage:c,staticGenerationAsyncStorage:u,serverHooks:m}=d,g="/api/consultation/route";function x(){return(0,a.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:u})}}};var t=require("../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[92,972],()=>o(1785));module.exports=r})();