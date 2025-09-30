"use strict";(()=>{var e={};e.id=599,e.ids=[599],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4058:(e,t,n)=>{n.r(t),n.d(t,{originalPathname:()=>m,patchFetch:()=>h,requestAsyncStorage:()=>l,routeModule:()=>d,serverHooks:()=>g,staticGenerationAsyncStorage:()=>c});var o={};n.r(o),n.d(o,{POST:()=>u});var i=n(9303),s=n(8716),a=n(670),r=n(7070);async function u(e){try{let t=await e.json();console.log("Sending appointment notification:",t);let{clientName:n,clientEmail:o,businessName:i,appointmentDate:s,appointmentTime:a,status:u}=t;if(!n||!o||!u)return r.NextResponse.json({error:"Missing required fields: clientName, clientEmail, status"},{status:400});let d=function(e){let{clientName:t,businessName:n,appointmentDate:o,appointmentTime:i,status:s,eligibility:a,fundingAmount:r}=e,u={confirmed:{subject:"\uD83C\uDF89 Your Business Funding Appointment is Confirmed!",emoji:"\uD83C\uDF89",title:"APPOINTMENT CONFIRMED",message:"Great news! Your appointment has been confirmed and we're excited to help you secure your business funding.",nextSteps:["Please be ready for our call at the scheduled time","Have any additional business documents ready","Prepare any questions you may have about funding options","If you need to reschedule, please contact us as soon as possible"]},completed:{subject:"✅ Thank You - Your Business Funding Consultation is Complete",emoji:"✅",title:"CONSULTATION COMPLETED",message:"Thank you for your time! We hope our consultation was helpful for your business funding needs.",nextSteps:["Review the funding options we discussed","Gather any additional documents we mentioned","Feel free to reach out with any follow-up questions","We're here to help you secure the funding your business deserves"]},cancelled:{subject:"⚠️ Your Business Funding Appointment Has Been Cancelled",emoji:"⚠️",title:"APPOINTMENT CANCELLED",message:"Your appointment has been cancelled. We understand that schedules can change.",nextSteps:["If you'd like to reschedule, please contact us","We'll be happy to find a new time that works for you","We're still here to help you secure your business funding","Don't hesitate to reach out when you're ready"]},pending:{subject:"\uD83D\uDCCB Your Business Funding Appointment Status Update",emoji:"\uD83D\uDCCB",title:"STATUS UPDATE",message:"Your appointment status has been updated to pending. We're reviewing your details.",nextSteps:["We're reviewing your appointment details","We'll confirm your appointment shortly","Please stay tuned for updates","Thank you for your patience"]}},p=u[s]||u.pending,d=`
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${p.subject}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .status-badge { background: #10b981; color: white; padding: 10px 20px; border-radius: 25px; display: inline-block; font-weight: bold; margin: 20px 0; }
        .appointment-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
        .next-steps { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        .button { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
        ul { padding-left: 20px; }
        li { margin: 8px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${p.emoji} ${p.title}</h1>
        <p>Credit With Rami - Business Funding Solutions</p>
    </div>
    
    <div class="content">
        <h2>Hello ${t}!</h2>
        
        <p>${p.message}</p>
        
        <div class="appointment-details">
            <h3>📋 Appointment Details</h3>
            <p><strong>Business:</strong> ${n}</p>
            <p><strong>Date:</strong> ${o}</p>
            <p><strong>Time:</strong> ${i}</p>
            ${a?`<p><strong>Eligibility:</strong> <span style="color: #10b981;">✅ Eligible for Funding</span></p>`:""}
            ${r?`<p><strong>Funding Amount:</strong> ${r}</p>`:""}
        </div>
        
        <div class="next-steps">
            <h3>📝 Next Steps</h3>
            <ul>
                ${p.nextSteps.map(e=>`<li>${e}</li>`).join("")}
            </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="https://wa.me/17868835543" class="button">💬 Contact Us on WhatsApp</a>
        </div>
        
        <p>If you have any questions or need immediate assistance, please don't hesitate to reach out to us.</p>
        
        <p>We're committed to helping you secure the funding your business deserves!</p>
        
        <div class="footer">
            <p><strong>Credit With Rami</strong></p>
            <p>📞 Phone: (786) 883-5543</p>
            <p>💬 WhatsApp: +1 (786) 883-5543</p>
            <p>🌐 Website: Your Business Funding Partner</p>
        </div>
    </div>
</body>
</html>
  `;return{subject:p.subject,body:d}}({clientName:n,businessName:i,appointmentDate:s,appointmentTime:a,status:u,eligibility:!0,fundingAmount:"N/A",message:"N/A"});if(console.log("Email notification prepared:"),console.log("To:",o),console.log("Subject:",d.subject),console.log("Body:",d.body),await p(o,d))return r.NextResponse.json({success:!0,message:"Notification sent successfully",notificationType:"email",recipient:o,status:u});return r.NextResponse.json({error:"Failed to send email notification"},{status:500})}catch(e){return console.error("Error sending appointment notification:",e),r.NextResponse.json({error:"Internal server error",details:e instanceof Error?e.message:"Unknown error"},{status:500})}}async function p(e,t){return await new Promise(e=>setTimeout(e,1e3)),console.log(`📧 Email would be sent to: ${e}`),console.log(`📧 Subject: ${t.subject}`),!0}let d=new i.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/send-appointment-notification/route",pathname:"/api/send-appointment-notification",filename:"route",bundlePath:"app/api/send-appointment-notification/route"},resolvedPagePath:"/Users/cesararteaga/rami/src/app/api/send-appointment-notification/route.ts",nextConfigOutput:"standalone",userland:o}),{requestAsyncStorage:l,staticGenerationAsyncStorage:c,serverHooks:g}=d,m="/api/send-appointment-notification/route";function h(){return(0,a.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:c})}}};var t=require("../../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),o=t.X(0,[92,972],()=>n(4058));module.exports=o})();