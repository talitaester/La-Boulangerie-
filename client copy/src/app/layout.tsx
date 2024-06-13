import type { Metadata } from 'next'
import "./globals.css";
import { poppins } from '@/src/app/ui/fonts';
import Footer from './components/Footer/Footer';

export const metadata: Metadata = {
  title: "La padarie",
  description: "Atividade 7 - núcleo web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body className={poppins.className}>
        {children}
      <Footer></Footer>

      </body>

    </html>
  );

}

