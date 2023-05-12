import { useCallback, useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { IDocument } from '@shared/types/ipc';

import { Editor, OnContentUpdatedParams } from '../../components/Editor';
import { ToC } from '../../components/ToC';

const DocumentPage = () => {
  const { id } = useParams<{ id: string }>();

  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery(['document', id], async () => {
    if (id) {
      const response = await window.api.fetchDocument({ id });

      return response.data;
    }
  });

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`;
    }

    return '';
  }, [data]);

  const { mutateAsync: saveDocument } = useMutation(
    async ({ title, content }: OnContentUpdatedParams) => {
      if (id) {
        await window.api.saveDocument({ id, title, content });
      }
    },
    {
      onSuccess: (_, { title, content }) => {
        queryClient.setQueryData<IDocument[]>(['documents'], documents => {
          if (documents && documents.length >= 0) {
            return documents.map(document => {
              if (document.id === id) {
                return { ...document, title };
              }

              return document;
            });
          }
        });
      },
    },
  );

  const handleEditorContentUpdated = useCallback(
    ({ title, content }: OnContentUpdatedParams) => {
      console.log(title);
      console.log(content);
      saveDocument({ title, content });
    },
    [saveDocument],
  );

  return (
    <main className="flex flex-1 py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs ">
          TABLE OF CONTENTS
        </span>

        <ToC.Root>
          <ToC.Link>Back-end</ToC.Link>
          <ToC.Section>
            <ToC.Link>Banco de dados</ToC.Link>
            <ToC.Link>Autenticação</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex flex-col flex-1 items-center">
        {!isFetching && data && (
          <Editor
            content={initialContent}
            onContentUpdated={handleEditorContentUpdated}
          />
        )}
      </section>
    </main>
  );
};

export { DocumentPage };
