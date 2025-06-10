import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/providers/theme-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "700"],
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "F‑Ledger",
  description: "Your Family Finance Tracker",
  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "favicons/favicon.ico" }],
  },
  manifest: "/favicons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          card: "bg-[#00002e]",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${montserrat.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            // theme="dark"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
