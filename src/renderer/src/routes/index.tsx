import { Router, Route } from 'electron-router-dom';

import { BlackPage } from '../pages/blank';
import { DocumentPage } from '../pages/document';

export function Routes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<BlackPage />} />
          <Route path="/document" element={<DocumentPage />} />
        </>
      }
    />
  );
}