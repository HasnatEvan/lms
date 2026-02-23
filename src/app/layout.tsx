import type { Metadata } from "next";
import "./globals.css";
import "plyr/dist/plyr.css";
import Providers from "@/components/Providers";
import { getWebsiteContent } from "@/lib/website-content";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = await getWebsiteContent();
    const title = content?.metaTitle?.trim() || "CodeZyne - Online Learning Platform";
    const faviconUrl = content?.branding?.faviconUrl?.trim();

    return {
      title,
      description: "Online learning platform",
      icons: faviconUrl
        ? {
            icon: faviconUrl,
            shortcut: faviconUrl,
            apple: faviconUrl,
          }
        : undefined,
    };
  } catch {
    return {
      title: "CodeZyne - Online Learning Platform",
      description: "Online learning platform",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
