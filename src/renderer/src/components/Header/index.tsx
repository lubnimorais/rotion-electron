import { useNavigate, useParams } from 'react-router-dom';

import clsx from 'clsx';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as Collapsible from '@radix-ui/react-collapsible';

import { Code, CaretDoubleRight, TrashSimple } from 'phosphor-react';

import * as Breadcrumbs from './Breadcrumbs';

import { IDocument } from '~/src/shared/types/ipc';

interface IHeaderProps {
  isSidebarOpen: boolean;
}

export function Header({ isSidebarOpen }: IHeaderProps) {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const isMacOS = process.platform === 'darwin';
  // const isSidebarOpen = false;

  const { data } = useQuery(['documents', id], async () => {
    if (id) {
      const response = await window.api.fetchDocument({ id });

      return response.data;
    }
  });

  console.log(data);

  const { mutateAsync: deleteDocument, isLoading: isDeleteDocumentLoading } =
    useMutation(
      async () => {
        if (id) {
          await window.api.deleteDocument({ id });
        }
      },
      {
        onSuccess: () => {
          queryClient.setQueryData<IDocument[]>(['documents'], documents => {
            if (documents) {
              return documents.filter(document => document.id !== id);
            }
          });

          navigate('/');
        },
        onError: err => {
          console.log(err);
        },
      },
    );

  return (
    <div
      id="header"
      className={clsx(
        'h-14 border-b border-rotion-600 py-[1.125rem] px-6 flex items-center gap-4 leading-tight transition-all duration-250 region-drag',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-240px)]': isSidebarOpen,
        },
      )}
    >
      <Collapsible.Trigger
        className={clsx('h-5 w-5 text-rotion-200 hover:text-rotion-50', {
          hidden: isSidebarOpen,
          block: !isSidebarOpen,
        })}
      >
        <CaretDoubleRight className="h-4 w-4" />
      </Collapsible.Trigger>

      {id && (
        <>
          <Breadcrumbs.Root>
            <Breadcrumbs.Item>
              <Code weight="bold" className="h-4 w-4 text-pink-500" />
              Estrutura técnica
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.HiddenItems />
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>Back-end</Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            {/* <Breadcrumbs.Item isActive>{data?.title}</Breadcrumbs.Item> */}
            <Breadcrumbs.Item isActive>Untitled</Breadcrumbs.Item>
          </Breadcrumbs.Root>

          <div className="inline-flex region-no-drag">
            <button
              className="inline-flex items-center gap-1 text-rotion-100 text-sm hover:text-rotion-50 disabled:opacity-60"
              disabled={isDeleteDocumentLoading}
              onClick={async () => await deleteDocument()}
            >
              <TrashSimple className="h-4 w-4" />
              Apagar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
