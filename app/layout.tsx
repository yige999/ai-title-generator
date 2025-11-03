import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';  // 可选，如果有全局 CSS

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Free AI YouTube Title Generator 2025',
  description: 'Generate SEO-optimized YouTube titles with AI. No signup required.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}