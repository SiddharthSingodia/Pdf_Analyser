import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


//const pdfUrl= "https://modest-roadrunner-212.convex.cloud/api/storage/4191aea0-f200-4409-8a19-c140df98df83";
export async function GET(req){

    const reqUrl= req.url;
    const {searchParams}= new URL(reqUrl);
    const pdfUrl= searchParams.get('pdfUrl');
    console.log(pdfUrl);

    //1. loasd the pdf file
    const response= await fetch(pdfUrl);
    const data = await response.blob();

    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = '';
    docs.forEach(doc=>{
        pdfTextContent += doc.pageContent+" ";
    });
     
    //2. split the pdf text content into chunks
    const Splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20, 
      });

   const output = await Splitter.splitText(pdfTextContent);

//    let splitterList = [];
//    output.forEach(doc=>{
//     splitterList.push(doc.pageContent);
//    })

    return NextResponse.json({result:output});
}