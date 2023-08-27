import { BrowserRouter } from 'react-router-dom';
import { XRoutes } from './Routes';
import { UserProvider } from './hooks/userContext';

import { useEffect } from 'react';

export function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <XRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}
