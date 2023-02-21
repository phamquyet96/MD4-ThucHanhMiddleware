import onHeaders from "on-headers";

export const responseTime=async (req,res,next)=>{
    let start=new Date().getTime();
    onHeaders(res,()=>{
        let duration=new Date().getTime() -start;
        console.log("Application-level middleware url: " + req.url + " có duration " + duration + "ms");
    });
    next();
}