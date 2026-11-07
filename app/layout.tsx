"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/Sidebar"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  return (
    <html lang="vi">
      <body className={`${inter.className} flex bg-gray-50`}>
        {/* Chỉ hiện Sidebar nếu không phải trang Login */}
        {!isLoginPage && <Sidebar />}

        {/* Nội dung màn hình chính */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}