import { contextBridge, ipcRenderer } from 'electron';

import { IPC } from '@shared/constants/ipc';
import {
  ICreateDocumentResponse,
  IDeleteDocumentRequest,
  IFetchAllDocumentsResponse,
  IFetchDocumentRequest,
  IFetchDocumentResponse,
  // IOnNewDocumentRequest,
  ISaveDocumentRequest,
} from '@shared/types/ipc';

declare global {
  export interface Window {
    api: typeof api;
  }
}

// Custom APIs for renderer
const api = {
  fetchDocuments(): Promise<IFetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL);
  },

  fetchDocument({
    id,
  }: IFetchDocumentRequest): Promise<IFetchDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, { id });
  },

  createDocument(): Promise<ICreateDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE);
  },

  saveDocument({ id, title, content }: ISaveDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, { id, title, content });
  },

  deleteDocument({ id }: IDeleteDocumentRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, { id });
  },

  onNewDocumentRequest(callback: () => void) {
    ipcRenderer.on('new-document', callback);

    return () => {
      ipcRenderer.off('new-document', callback);
    };
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api;
}
