import { ipcMain } from 'electron';

import { randomUUID } from 'node:crypto';

import { IPC } from '../shared/constants/ipc';

import { store } from './store';

import {
  ICreateDocumentResponse,
  IDeleteDocumentRequest,
  IDocument,
  IFetchAllDocumentsResponse,
  IFetchDocumentRequest,
  IFetchDocumentResponse,
  ISaveDocumentRequest,
} from '@shared/types/ipc';

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<IFetchAllDocumentsResponse> => {
    /**
     * usamos assim porque a estrutura que é salva no arquivo é assim
     * "id": {
     *    "id": '1'
     *    "title: 'Titulo"
     *    "content": ''
     * }
     *
     * Esse primeiro id é o controle do Electron Store
     *
     * Então só queremos os valores e com o Object.values, só pegamos os valores
     */

    return {
      data: Object.values(store.get('documents')),
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (
    event,
    { id }: IFetchDocumentRequest,
  ): Promise<IFetchDocumentResponse> => {
    const document = store.get(`documents.${id}`) as IDocument;

    return {
      data: document,
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (): Promise<ICreateDocumentResponse> => {
    const id = randomUUID();

    const document: IDocument = {
      id,
      title: 'Untitled',
    };

    store.set(`documents.${id}`, document);

    return {
      data: document,
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  async (
    event,
    { id, title, content }: ISaveDocumentRequest,
  ): Promise<void> => {
    store.set(`documents.${id}`, { id, title, content });
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (event, { id }: IDeleteDocumentRequest): Promise<void> => {
    // @ts-ignore (https://github.com/sindresorhus/electron-store/issues/196)
    store.delete(`documents.${id}`);
  },
);
