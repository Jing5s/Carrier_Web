import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'shared/styles/global.css';
import App from 'app/App';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
