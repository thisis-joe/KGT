import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';
import './styles/globals.css';
import { TranslationProvider } from './utils/i18n';

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <TranslationProvider>
        <RouterProvider router={router} />
      </TranslationProvider>
    </div>
  );
}
