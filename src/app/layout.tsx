import type { Metadata } from "next";
import "./globals.css";
import "./assets/custom.css";

export const metadata: Metadata = {
  title: "Poliklinik Sehat Aja"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
