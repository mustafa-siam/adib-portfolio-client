import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxWrapper from "@/redux/ReduxWrapper";
import { ClerkProvider } from "@clerk/nextjs";
import ClerkAuthProvider from "@/providers/ClerkAuthProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ishraq-Al-Adib",
  description: "i am a video editor and motion designer. i make videos for brands, agencies, and artists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col">
          <ReduxWrapper>
            <ClerkAuthProvider>
              {children}
                    <Toaster position="top-center" />
            </ClerkAuthProvider>
          </ReduxWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}