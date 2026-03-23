import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

const root = document.getElementById('root');
if (!root) throw new Error("Root container didn't found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
