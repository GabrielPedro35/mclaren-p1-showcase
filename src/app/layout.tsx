import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import FrameDebugger from "@/components/FrameDebugger";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "McLaren",
  description: "McLaren Automotive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <NavbarWrapper />
        {children}
        <FrameDebugger />
      </body>
    </html>
  );
}