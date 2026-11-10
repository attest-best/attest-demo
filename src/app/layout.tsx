import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Project Dashboard", description: "Project progress, team activity and work in one place." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
