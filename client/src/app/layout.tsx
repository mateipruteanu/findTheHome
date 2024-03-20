import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <Toaster position="bottom-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
