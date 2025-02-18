import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "../app/globals.css";
import { Toaster } from "../components/ui/sonner";

const pt_sans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export const metadata: Metadata = {
  title: "",
  description: "",
  alternates: {
    canonical: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pt_sans.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
