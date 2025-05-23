import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | HdM Zeitreihen-Dashboard',
    default: 'HdM Zeitreihen-Dashboard',
  },
  description: 'Dashboard zur Visualisierung und Analyse von Zeitreihendaten, entwickelt im Rahmen des Moduls Web Technologies & Analytics.',
  metadataBase: new URL('http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}