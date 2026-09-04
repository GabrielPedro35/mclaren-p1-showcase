import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import LoadingScreen from "@/components/LoadingScreen";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "McLaren",
  description: "McLaren Automotive",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <LoadingScreen />
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}