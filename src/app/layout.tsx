import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KaamWala — Find a skilled worker near you",
  description: "Book verified masons, electricians, plumbers, and more, on demand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <header className="border-b" style={{ borderColor: "var(--border)" }}>
          <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
            <a href="/" className="text-lg font-medium" style={{ color: "var(--navy)" }}>
              Kaam<span style={{ color: "var(--amber)" }}>Wala</span>
            </a>
            <nav className="text-sm" style={{ color: "var(--muted)" }}>
              <a href="/" className="hover:underline">Book a worker</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t py-6 text-center text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          KaamWala — demo build. Not yet processing real payments or bookings.
        </footer>
      </body>
    </html>
  );
}
