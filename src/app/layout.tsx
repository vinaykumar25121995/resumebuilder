import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import FullereneCursorModel from "@/components/FullereneCursorModel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATS Resume Builder | Build once, Tailor for every job",
  description: "AI-powered platform to build, manage, and tailor ATS-friendly resumes for every job application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <FullereneCursorModel />
          {children}
        </Providers>
      </body>
    </html>
  );
}
