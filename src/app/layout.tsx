import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from './components/Header';
import Footer from './components/Footer';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PegaWORLD Design Track",
  description: "An agenda app built by Neil Kelsey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
