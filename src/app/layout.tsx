import Script from 'next/script'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Superchat",
  description: "Superchat.",
  twitter: {
    card: 'summary_large_image',
    title: 'Superchat',
    description: 'Chat with data.',
  },
  openGraph: {
    title: 'Superchat',
    description: 'Chat with data',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>{children}</div>
      </body>
    </html>
  );
}
