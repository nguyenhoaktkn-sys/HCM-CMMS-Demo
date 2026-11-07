// Bổ sung LogOut vào dòng import từ lucide-react ở đầu file:
import { LayoutDashboard, Wrench, Calendar, BarChart3, Settings, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

// Thêm logic handleLogout trong component Sidebar:
export function Sidebar() {
  const pathname = usePathname()
  const router = router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
    router.push("/login")
  }

  return (
    // ... Phần giao diện giữ nguyên ...

    {/* Sửa lại phần Cài đặt & Đăng xuất ở cuối Sidebar */}
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
  )
}