import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import 'shared/styles/global.css';
import App from 'app/App';
import ReactQueryProviders from 'app/providers/ReactQueryProviders';

const isElectron = window.env?.isElectron === true;

const Router = isElectron ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')!).render(
  <ReactQueryProviders>
    <Router>
      <App />
    </Router>
  </ReactQueryProviders>
);
