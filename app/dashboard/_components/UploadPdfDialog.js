'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  import { useMutation } from 'convex/react';
  import { api } from '../../../convex/_generated/api';
  import { useState } from 'react';
  import { Loader2Icon } from "lucide-react";
  import { useUser } from '@clerk/clerk-react';
  import axios from 'axios';
  import { useAction } from 'convex/react'; 
  import { toast } from 'sonner';

 
 // import { v4 as uuidv4 } from 'uuid';

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_FILE_TYPES = 'application/pdf';




export default function UploadPdfDialog({children,isMaxFile}) {
    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const AddFileEntry=useMutation(api.fileStorage.AddFileEntryToDb);
   const getFileUrl=useMutation(api.fileStorage.getFileUrl);
   const embeddDocument=useAction(api.myAction.ingest);
   const {user}=useUser();
    const [file,setFile]=useState(null);
    const [loading, setLoading]=useState(false);
    const [fileName,setFileName]=useState('');
    const [open,setOpen]=useState(false);

      
      const OnFileSelect=(event)=>{
        setFile(event.target.files[0]);
      }
      const OnUpload=async()=>{
        setLoading(true);

        // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();  

    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type },
        body: file,
      });
      const { storageId } = await result.json();
      console.log('Storage ID:', storageId);
          const fieldId=crypto.randomUUID();
          const fileUrl=await getFileUrl({storageId:storageId});
       // Step 3: Save the newly allocated storage id to the database
      const resp=await AddFileEntry({
        fileId:fieldId,
        fileName:fileName??'Untitled File',
        storageId:storageId,
        fileUrl:fileUrl,
        createdBy:user?.primaryEmailAddress?.emailAddress
      })
      console.log('Response:',resp);

      //API call to fetch pdf process data
       const ApiResp= await axios.get('/api/pdf-loader?pdfUrl='+fileUrl);
       console.log(ApiResp.data.result);
       
       await embeddDocument({
        splitText:ApiResp.data.result,
        fileId:fieldId
       });
     //  console.log(embeddResult);
       
      setLoading(false);
      setOpen(false);

       toast.success('File uploaded successfully');

      }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
        <Button onClick={()=>setOpen(true)} disabled={isMaxFile} className='w-full'> +Uplaod the pdf file</Button>
        
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload pdf file</DialogTitle>
        <DialogDescription asChild>
          <div className=''>
          <h2 className='mt-5'>
                    Select a PDF file
                </h2>
            <div className=' gap-2 p-3 rounded-md border '>
                
                <input type='file' accept='application/pdf'
                
                onChange={(event)=>OnFileSelect(event)}/>
            </div>
            <div className=' mt-3'>
                <label> File Name*</label>
                <Input placeholder='Enter file name' onChange={(event)=>setFileName(event.target.value)}   />
            </div>
           </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload} disabled={loading}>
            {loading ?
            <Loader2Icon className='animate-spin'/>:  'Upload'}
            </Button>
        </DialogFooter>
    </DialogContent>
  </Dialog> 
  )
}