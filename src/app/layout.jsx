import './globals.css';

import Nav from './dashboard/nav';
import { Suspense } from 'react';
import TansStackProvider from './TansStackProvider'; 

export const metadata = {
  title: 'Admin App',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-200">
      <body className="h-full">
        <TansStackProvider>
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        </TansStackProvider>
      </body>
    </html>
  );
}
