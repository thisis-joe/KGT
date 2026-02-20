import { RouterProvider } from 'react-router';
import { router } from './routes';
import './styles/globals.css';

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <RouterProvider router={router} />
    </div>
  );
}