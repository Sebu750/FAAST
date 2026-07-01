import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import { useCallback, useState } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

const RichTextEditor = ({ content, onChange, placeholder = 'Start writing your blog post...' }: RichTextEditorProps) => {
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#bb9457] hover:underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-lg max-w-none focus:outline-none min-h-[500px] px-6 py-4',
      },
    },
  })

  const setLink = useCallback(() => {
    if (!editor) return null

    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      setShowLinkModal(false)
      setLinkUrl('')
      return
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkUrl })
      .run()

    setShowLinkModal(false)
    setLinkUrl('')
  }, [editor, linkUrl])

  const addImage = useCallback((url: string) => {
    if (editor && url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="border border-neutral-700 rounded-sm bg-neutral-950">
      {/* Toolbar */}
      <div className="border-b border-neutral-700 bg-neutral-900 p-2 flex items-center gap-1 flex-wrap sticky top-0 z-10">
        {/* Text Formatting */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
              editor.isActive('heading', { level: 1 }) ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
              editor.isActive('heading', { level: 2 }) ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
              editor.isActive('heading', { level: 3 }) ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Heading 3"
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
              editor.isActive('heading', { level: 4 }) ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Heading 4"
          >
            H4
          </button>
        </div>

        <div className="w-px h-5 bg-neutral-700 mx-1" />

        {/* Text Style */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 rounded text-xs font-bold transition-colors ${
              editor.isActive('bold') ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Bold"
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 rounded text-xs italic transition-colors ${
              editor.isActive('italic') ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Italic"
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-2 py-1 rounded text-xs underline transition-colors ${
              editor.isActive('underline') ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Underline"
          >
            U
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-2 py-1 rounded text-xs line-through transition-colors ${
              editor.isActive('strike') ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Strikethrough"
          >
            S
          </button>
        </div>

        <div className="w-px h-5 bg-neutral-700 mx-1" />

        {/* Text Color */}
        <div className="flex items-center gap-0.5">
          <input
            type="color"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="w-6 h-6 rounded cursor-pointer border border-neutral-700"
            title="Text Color"
          />
          <button
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="px-2 py-1 rounded text-xs text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
            title="Reset Color"
          >
            Reset
          </button>
        </div>

        <div className="w-px h-5 bg-neutral-700 mx-1" />

        {/* Highlight */}
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`px-2 py-1 rounded text-xs transition-colors ${
            editor.isActive('highlight') ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
          }`}
          title="Highlight"
        >
          <span className="bg-yellow-400 text-black px-1">H</span>
        </button>

        <div className="w-px h-5 bg-neutral-700 mx-1" />

        {/* Alignment */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Align Left"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h12M3 18h18" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Align Center"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M9 12h6M3 18h18" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Align Right"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M9 12h12M3 18h18" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Justify"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>

        <div className="w-px h-5 bg-neutral-700 mx-1" />

        {/* Lists */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('bulletList') ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Bullet List"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('orderedList') ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Numbered List"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </button>
        </div>

        <div className="w-px h-5 bg-neutral-700 mx-1" />

        {/* Blockquote & Code */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('blockquote') ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Blockquote"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('codeBlock') ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Code Block"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </button>
        </div>

        <div className="w-px h-5 bg-neutral-700 mx-1" />

        {/* Insert Elements */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => {
              const url = prompt('Enter image URL:')
              if (url) addImage(url)
            }}
            className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
            title="Insert Image"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={() => setShowLinkModal(true)}
            className={`p-1.5 rounded transition-colors ${
              editor.isActive('link') ? 'bg-[#bb9457] text-black' : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
            }`}
            title="Insert Link"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
            title="Horizontal Rule"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" />
            </svg>
          </button>
        </div>

        <div className="w-px h-5 bg-neutral-700 mx-1" />

        {/* Undo/Redo */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Undo"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Redo"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-neutral-700 rounded-sm p-6 max-w-md w-full mx-4">
            <h3 className="text-white text-lg font-serif mb-4">Insert Link</h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-600 focus:outline-none focus:border-[#bb9457] mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={setLink}
                className="flex-1 px-4 py-2 bg-[#bb9457] text-black font-semibold hover:bg-white transition-colors"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setShowLinkModal(false)
                  setLinkUrl('')
                }}
                className="flex-1 px-4 py-2 bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RichTextEditor
