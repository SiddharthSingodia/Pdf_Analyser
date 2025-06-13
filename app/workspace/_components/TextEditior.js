import React from 'react'
import { useEditor,EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import EditorExtension from './EditorExtension'

export default function TextEditior() {
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
    
  return (
    <div>
       <EditorExtension editor={editor}/>
        <div>
            <EditorContent editor={editor} />
        </div>
    </div>
  )
}