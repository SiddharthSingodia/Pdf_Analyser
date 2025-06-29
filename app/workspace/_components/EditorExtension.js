'use client'
import { Bold, Highlighter, Italic, Sparkles, Underline } from 'lucide-react';
import React from 'react'
import { api } from '@/convex/_generated/api'
import { useAction, useMutation } from 'convex/react'
import { useParams } from 'next/navigation'
import { chatSession } from '@/configs/AIModel'
import { toast } from 'sonner'
import { useUser } from '@clerk/clerk-react'


export default function  EditorExtension({editor}) {
  const {fileId}= useParams()
  const SearchAI= useAction(api.myAction.search)
  const saveNotes= useMutation(api.notes.addNotes)
  const {user}= useUser()

  // console.log("User object:", user);
  // console.log("User email:", user?.emailAddresses?.[0]?.emailAddress);

  const onAiClick = async () => {
    toast("AI is working...")
    const selectedText= editor.state.doc.textBetween(editor.state.selection.from,
       editor.state.selection.to,
        " ")
        console.log("selectedText:", selectedText)
        const result = await SearchAI({query:selectedText,fileId:fileId})

        const UnformattedAns=JSON.parse(result);
        let AllUnformattedAns='';
        UnformattedAns&&UnformattedAns.forEach(item=>{
          AllUnformattedAns+=item.pageContent;
        })
        const PROMPT="For question: "+selectedText+" and with the given content as answer,"+
        "Please give appropriate answer in HTML format. The answer content is:"+AllUnformattedAns;
        console.log("PROMPT:", PROMPT)

        const AiModelResult=await chatSession.sendMessage(PROMPT);
        console.log("AiModelResult:", AiModelResult.response.text());

        const FinalAns= AiModelResult.response.text().replace('```html','').replace('```','');
        const AllText= editor.getHTML();
        editor.commands.setContent(AllText+'<p> <strong>Answer:</strong> '+FinalAns+'</p>')

        const userEmail = user?.emailAddresses?.[0]?.emailAddress;
         console.log("Attempting to save notes with email:", userEmail);
        if (!userEmail) {
           console.error("User email not found. User object:", user);
          return;
        }
        await saveNotes({
          notes: editor.getHTML(),
          fileId: fileId,
          createdBy: userEmail
        });
      }
      
   
   
  return editor&& (
    <div className='p-2'>
         <div className="control-group">
        <div className="button-group flex gap-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'text-blue-500' : ''}
          >
            <Bold/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-blue-500' : ''}
          >
            <Italic/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'text-blue-500' : ''}
          >
            <Underline/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'text-blue-500' : ''}
          >
            <Highlighter/>
          </button>
            <button
            onClick={() => onAiClick()}
            className={ 'hover:text-blue-500'}
          >
            <Sparkles/>
          </button>
        </div>
        </div>
    </div>
  )
}