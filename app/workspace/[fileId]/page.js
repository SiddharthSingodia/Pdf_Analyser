'use client'
import React, { useEffect }  from 'react' 
import WorkspaceHeader from '../_components/WorkspaceHeader'
import { useParams } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import PdfViewer from '../_components/PdfViewer'
import TextEditior from '../_components/TextEditior'



export default function Workspace() {
    const {fileId}=useParams();
    const FileInfo = useQuery(api.fileStorage.GetFileRecord,{fileId:fileId})
     
    useEffect(()=>{
        console.log(FileInfo)
    },[FileInfo])
   
  return (
    <div>   
        <WorkspaceHeader fileName={FileInfo?.fileName}/>
        <div className='grid grid-cols-2 gap-5'>
            <div>
                {/* text editor */}
                <TextEditior fileId={fileId}/>
            </div>
            <div>
                {/* pdf viewer */}
                <PdfViewer fileUrl={FileInfo?.fileUrl}/>
            </div>
        </div>
    </div>
  )
}