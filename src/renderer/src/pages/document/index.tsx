import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Editor } from '../../components/Editor';
import { ToC } from '../../components/ToC';
import { useQuery } from '@tanstack/react-query';

const DocumentPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log('🚀 ~ file: index.tsx:10 ~ DocumentPage ~ id:', id);

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
        {!isFetching && data && <Editor content={initialContent} />}
      </section>
    </main>
  );
};

export { DocumentPage };
