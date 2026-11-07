"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
// 1. Thêm biểu tượng CalendarDays từ lucide-react
import { LayoutDashboard, Wrench, Calendar, CalendarDays, BarChart3, Settings, LogOut } from "lucide-react"

const menuItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Danh sách Thiết bị", href: "/thiet-bi", icon: Wrench },
  { name: "Lịch bảo trì (PM)", href: "/bao-tri", icon: Calendar },
  // 2. Thêm thanh công cụ Lịch làm việc tại đây
  { name: "Lịch làm việc", href: "/lich-lam-viec", icon: CalendarDays },
  { name: "Báo cáo & Thống kê", href: "/bao-cao", icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
    router.push("/login")
  }

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <Wrench className="h-7 w-7 text-blue-400" />
          <span className="font-bold text-xl tracking-wide">CMMS SYSTEM</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 pt-4 space-y-1">
        <Link
          href="/cai-dat"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <Settings className="h-5 w-5" />
          Cài đặt hệ thống
        </Link>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Đăng xuất
        </button>
      </div>
    </div>
  )
}