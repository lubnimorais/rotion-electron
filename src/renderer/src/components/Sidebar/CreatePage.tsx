import { useEffect } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Plus } from 'phosphor-react';
import { IDocument } from '@shared/types/ipc';
import { useNavigate } from 'react-router-dom';

export function CreatePage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { isLoading: isCreatingNewDocument, mutateAsync: createDocument } =
    useMutation(
      async () => {
        const response = await window.api.createDocument();

        return response.data;
      },
      {
        onSuccess: data => {
          queryClient.setQueriesData<IDocument[]>(['documents'], documents => {
            if (documents && documents.length >= 0) {
              return [...documents, data];
            } else {
              return [data];
            }
          });

          navigate(`/documents/${data.id}`);
        },
      },
    );

  useEffect(() => {
    function onNewDocument() {
      createDocument();
    }

    const unsubscribe = window.api.onNewDocumentRequest(onNewDocument);

    return () => {
      unsubscribe();
    };
  }, [createDocument]);

  return (
    <button
      disabled={isCreatingNewDocument}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
      onClick={async () => {
        await createDocument();
      }}
    >
      <Plus className="h-4 w-4" />
      Novo documento
    </button>
  );
}
