import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Text to Video Generator',
  description: 'Transform your text into animated videos instantly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
