import React, { useEffect } from 'react'
import { useEditor,EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import EditorExtension from './EditorExtension'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'


export default function TextEditior({fileId}) {

    const notes=useQuery(api.notes.GetNotes,
        {fileId:fileId})
        console.log("notes:",notes)
    // const {fileId}=useParams()
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Disable underline in StarterKit since we're using the dedicated extension
                underline: false,
            }),
            Placeholder.configure({
                placeholder: 'Write something...',
            }),
            Highlight.configure({
                multicolor: true,
            }),
            Underline.configure(),
        ],
       
        editorProps: {
            attributes: {
              class: "focus:outline-none h-screen p-5"
            }
          }
      })

      useEffect(()=>{
        editor&&editor.commands.setContent(notes)
      },[notes&&editor])
       
    
  return (
    <div>
       <EditorExtension editor={editor}/>
        <div className='overflow-scroll h-[88vh]'>
            <EditorContent editor={editor} />
        </div>
    </div>
  )
}