import { createBrowserRouter } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';

// Lazy load components for code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));

// Loading fallback
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#0f0f0f]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD700]"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/contact',
    element: (
      <Suspense fallback={<Loading />}>
        <ContactPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#0f0f0f]">
          <h1 className="text-4xl font-['Oswald'] font-bold text-[#FFD700] mb-4">404</h1>
          <p className="text-xl mb-8 text-gray-900 dark:text-white">Page not found</p>
          <a href="/" className="px-6 py-3 bg-[#FFD700] text-black font-bold uppercase tracking-wider hover:bg-[#FFA000] transition-colors rounded-sm">
            Go Home
          </a>
        </div>
      </Suspense>
    ),
  },
]);