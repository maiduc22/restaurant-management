import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import AppRoutes from './pages/routers';
import store from './redux/store';
import customTheme from './theme';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <CookiesProvider>
          <BrowserRouter>
            <MantineProvider theme={customTheme}>
              <ModalsProvider>
                <Notifications position="top-right" />
                <AppRoutes />
              </ModalsProvider>
            </MantineProvider>
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
