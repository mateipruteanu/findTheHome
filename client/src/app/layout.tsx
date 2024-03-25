import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>findTheHome</title>
      </head>
      <body>
        <Providers>
          <Navbar />
          <Toaster position="bottom-center" />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
