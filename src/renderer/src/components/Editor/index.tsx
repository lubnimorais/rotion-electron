import Document from '@tiptap/extension-document';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface IEditorProps {
  content: string;
}

const Editor = ({ content }: IEditorProps) => {
  const editor = useEditor({
    extensions: [
      Document.extend({
        // Estamos informando qual estrutura meu documento precisa ter.
        // E estamos informando que ele sempre precisa iniciar com um título
        content: 'heading block*',
      }),
      StarterKit.configure({
        document: false,
      }),
      Highlight,
      Typography,
      Document,
      Placeholder.configure({
        placeholder: 'Untitled',
        // classes que vão ser passadas para o editor quando estiver vazio
        emptyEditorClass:
          // as três última instruções vai fazer com que o placeholder não seja clicável ou copiado
          'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none',
      }),
    ],
    content,
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-invert prose-headings:mt-0',
      },
    },
  });

  return <EditorContent className="w-[65ch]" editor={editor} />;
};

export { Editor };
