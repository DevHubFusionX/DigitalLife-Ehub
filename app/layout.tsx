import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/shared/Preloader";
import FloatingContact from "@/components/shared/FloatingContact";
import { ModalProvider } from "@/context/ModalContext";
import ModalRenderer from "@/components/shared/ModalRenderer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DigitalLife | Sell Without Stress",
  description: "Automated selling procedures tailored for your business.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${instrumentSans.variable} antialiased`}
      >
        <ModalProvider>
          <Preloader />
          {children}
          <FloatingContact />
          <ModalRenderer />
        </ModalProvider>
      </body>
    </html>
  );
}
