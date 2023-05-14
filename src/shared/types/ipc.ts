export interface IDocument {
  id: string;
  title: string;
  content?: string;
}

/**
 * REQUEST
 */

export type ISaveDocumentRequest = IDocument;

export interface IFetchDocumentRequest {
  id: string;
}

export interface IDeleteDocumentRequest {
  id: string;
}

export interface IOnNewDocumentRequest {
  callback: () => void;
}

/**
 * RESPONSE
 */

export interface IFetchAllDocumentsResponse {
  data: IDocument[];
}

export interface IFetchDocumentResponse {
  data: IDocument;
}

export interface ICreateDocumentResponse {
  data: IDocument;
}
