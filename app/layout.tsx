import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HCM1 ASM - HỆ THỐNG QUẢN LÝ BẢO TRÌ (CMMS)",
  description: "Hệ thống quản lý bảo trì vận hành",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="dark">
      <body className={`${inter.className} bg-[#0b0f19] text-slate-100 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}