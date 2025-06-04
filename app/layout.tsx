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
  title: "F-Ledger",
  description: "Your Family Finance Tracker",
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
          card: "bg-white/10 backdrop-blur-[8px] border border-white/30 shadow-2xl rounded-2xl ring-1 ring-white/10",
          headerTitle: "text-white",
          headerSubtitle: "text-zinc-300",
          formFieldLabel: "text-zinc-200",
          formFieldInput:
            "bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 border border-white/20 focus:ring-2 focus:ring-blue-400",
          socialButtonsBlockButton:
            "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 transition-all",
          footerActionText: "text-zinc-400",
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
