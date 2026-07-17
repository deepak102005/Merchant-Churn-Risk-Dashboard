import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Customer support AI-Proficiency - Customer Success Dashboard",
  description: "Enterprise dashboard for managing merchant churn risk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </ToastProvider>
      </body>
    </html>
  );
}
