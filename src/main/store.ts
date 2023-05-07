import Store from 'electron-store';

import { IDocument } from '@shared/types/ipc';

interface IStoreType {
  // Record é do Typescript onde a chave é o ID do documento e o resto vai ser o documento em si
  documents: Record<string, IDocument>;
}

const store = new Store<IStoreType>({
  // valores iniciais para cada uma das informações que estiver armazenada dentro
  defaults: {
    documents: {},
  },
});

export { store };
