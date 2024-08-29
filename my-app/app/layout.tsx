
import { Header } from "../components/header/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}