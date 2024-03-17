import { Inter } from "next/font/google";
import "./globals.css";
import GlobalState from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TWC Innovations",
  description: "TWC Innovations Software Engineer Intern assignment ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          {children}
        </GlobalState>
      </body>
    </html>
  );
}
