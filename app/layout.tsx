import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CMMS - Hệ Thống Quản Lý Bảo Trì",
  description: "Phần mềm quản lý bảo trì thiết bị và tài sản",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} flex bg-gray-50`}>
        {/* Sidebar Cố Định Bên Trái */}
        <Sidebar />

        {/* Nội Dung Màn Hình Chính Bên Phải */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}