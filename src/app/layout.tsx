import type { Metadata } from "next";
import "./globals.css";
import "./variables.css";
// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";
import { ClientLayout } from "./ClientLayout";

export const metadata: Metadata = {
  title: "art-bud-sofia",
  description: "Niezawodne remontu od profesjonalisty w Twoim mieście",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <ClientLayout>{children}</ClientLayout>
        <div id="modal-root" />
      </body>
    </html>
  );
}
