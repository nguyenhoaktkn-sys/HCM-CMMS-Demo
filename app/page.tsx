"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  LogOut, Clock, Globe, Settings, Filter, ChevronDown, 
  Wrench, ShieldAlert 
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Dữ liệu biểu đồ sự cố theo thời gian
const trendData = [
  { time: "31/10", count: 8, trend: 10 },
  { time: "01/11", count: 7, trend: 10 },
  { time: "02/11", count: 16, trend: 10 },
  { time: "03/11", count: 13, trend: 9.8 },
  { time: "04/11", count: 8, trend: 9.6 },
  { time: "05/11", count: 9, trend: 9.0 },
  { time: "06/11", count: 11, trend: 10.0 },
]

// Dữ liệu lỗi thiết bị
const topFailures = [
  { name: "Matrix B", count: 19 },
  { name: "GBB", count: 9 },
  { name: "DWS 4", count: 5 },
]

export default function DashboardASM() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("TongQuan")

  // Xử lý sự kiện Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
    router.push("/login")
  }

  const navItems = [
    { id: "TongQuan", label: "📊 Tổng quan", path: "/" },
    { id: "SoSanh", label: "📉 So sánh", path: "/bao-cao" },
    { id: "SuCo", label: "⚠️ Sự cố", path: "/thiet-bi" },
    { id: "BaoCao", label: "📋 Báo cáo", path: "/bao-cao" },
    { id: "BaoTri", label: "🛠️ Bảo trì", path: "/bao-tri" },
    { id: "PhuTung", label: "⚙️ Phụ tùng", path: "/thiet-bi" },
    { id: "ThietBi", label: "🖥️ Thiết bị", path: "/thiet-bi" },
    { id: "WorkOrder", label: "📄 Work Order", path: "/bao-tri" },
    { id: "LichCa", label: "📅 Lịch ca", path: "/lich-lam-viec" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#0b0f19] text-slate-200">
      {/* 1. HEADER TRÊN CÙNG */}
      <header className="bg-[#0f172a] border-b border-slate-800 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600 text-white font-black px-3 py-1 rounded text-xl tracking-tighter">
            SPX
          </div>
          <div>
            <span className="text-xs text-blue-400 block font-semibold">Nhockute1990</span>
          </div>
        </div>
        

        <div className="text-center">
          <h1 className="text-xl font-extrabold tracking-wider text-white">HCM1 ASM</h1>
          <p className="text-sm font-semibold text-blue-400 tracking-widest">HỆ THỐNG QUẢN LÝ BẢO TRÌ (CMMS)</p>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-blue-400" /> Thứ Bảy, 07/11/2026 - 20:10</div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white"><Globe className="w-4 h-4" /> Tiếng Việt VN</div>
          <Settings className="w-4 h-4 cursor-pointer hover:text-white" onClick={() => router.push("/cai-dat")} />
        </div>
      </header>

      {/* 2. THANH MENU ĐIỀU HƯỚNG DẠNG NGANG */}
      <nav className="bg-[#1e293b] border-b border-slate-800 px-6 flex gap-1 overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id)
              if (item.path !== "/") router.push(item.path)
            }}
            className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === item.id
                ? "bg-[#334155] text-white border-blue-500 font-bold"
                : "text-slate-400 border-transparent hover:text-slate-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* 3. THÂN TRANG BẢO GỒM BỘ LỌC VÀ KHU VỰC BÁO CÁO */}
      <div className="flex flex-1 p-4 gap-4 overflow-hidden">
        {/* CỘT BỘ LỌC BÊN TRÁI */}
        <aside className="w-64 bg-[#0f172a] rounded-xl border border-slate-800 p-4 flex flex-col gap-4 text-xs">
          {/* Box User Info & Nút Đăng xuất */}
          <div className="bg-[#1e293b] p-3 rounded-lg border border-slate-700/50">
            <div className="text-slate-400">Xin chào, <span className="text-white font-bold">Nguyễn Văn Hòa</span></div>
            <div className="flex gap-2 mt-2">
              <Button 
                size="sm" 
                onClick={handleLogout}
                className="h-7 text-[10px] bg-amber-600 hover:bg-amber-700 text-white flex items-center font-semibold"
              >
                <LogOut className="w-3 h-3 mr-1" /> Đăng xuất
              </Button>
            </div>
          </div>

          <div className="bg-[#1e293b] p-2.5 rounded-lg border border-slate-700/50 flex justify-between items-center font-semibold">
            <span>📍 ASM1 - HCM1</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          {/* Bộ lọc chi tiết */}
          <div className="space-y-3">
            <div className="flex items-center gap-1 font-bold text-slate-300 text-sm">
              <Filter className="w-4 h-4 text-blue-400" /> BỘ LỌC
            </div>

            <div className="bg-[#1e293b] p-3 rounded-lg space-y-2 border border-slate-700/50">
              <div className="font-semibold text-slate-300 flex justify-between">
                📅 Thời gian <ChevronDown className="w-3 h-3" />
              </div>
              <div className="bg-[#0f172a] p-2 rounded text-[11px] text-center border border-slate-800 text-blue-400 font-mono">
                31/10/2026 - 06/11/2026
              </div>
            </div>

            <div className="bg-[#1e293b] p-3 rounded-lg border border-slate-700/50 font-semibold text-slate-400 flex justify-between">
              ⚙️ Hệ thống <ChevronDown className="w-3 h-3" />
            </div>

            <div className="bg-[#1e293b] p-3 rounded-lg border border-slate-700/50 font-semibold text-slate-400 flex justify-between">
              ⚡ Loại sự cố <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </aside>

        {/* NỘI DUNG CHÍNH (THẺ KPI & BIỂU ĐỒ) */}
        <main className="flex-1 flex flex-col gap-4 overflow-y-auto">
          {/* HÀNG THẺ KPI TỈ LỆ VẬN HÀNH */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <div className="bg-red-950/40 border border-red-800/60 p-2.5 rounded-lg text-center">
              <div className="text-[10px] text-red-300 font-medium">TỔNG SỰ CỐ</div>
              <div className="text-lg font-bold text-red-400">▲ 67</div>
            </div>
            <div className="bg-amber-950/40 border border-amber-800/60 p-2.5 rounded-lg text-center">
              <div className="text-[10px] text-amber-300 font-medium">TỔNG DOWNTIME</div>
              <div className="text-lg font-bold text-amber-400">⏱ 6.8h</div>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-lg text-center">
              <div className="text-[10px] text-emerald-300 font-medium">TỔNG BẢO TRÌ</div>
              <div className="text-lg font-bold text-emerald-400">🛠 28</div>
            </div>
            <div className="bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-lg text-center">
              <div className="text-[10px] text-emerald-300 font-medium">KHẢ DỤNG</div>
              <div className="text-lg font-bold text-emerald-400">95.9%</div>
            </div>
            <div className="bg-purple-950/40 border border-purple-800/60 p-2.5 rounded-lg text-center">
              <div className="text-[10px] text-purple-300 font-medium">PM LOSS</div>
              <div className="text-lg font-bold text-purple-400">1,794,390đ</div>
            </div>
            <div className="bg-indigo-950/40 border border-indigo-800/60 p-2.5 rounded-lg text-center">
              <div className="text-[10px] text-indigo-300 font-medium">18 SỰ CỐ/NGÀY</div>
              <div className="text-lg font-bold text-indigo-400">9.6</div>
            </div>
            <div className="bg-blue-950/40 border border-blue-800/60 p-2.5 rounded-lg text-center">
              <div className="text-[10px] text-blue-300 font-medium">TỶ LỆ BẢO TRÌ</div>
              <div className="text-lg font-bold text-blue-400">46.7%</div>
            </div>
            <div className="bg-teal-950/40 border border-teal-800/60 p-2.5 rounded-lg text-center">
              <div className="text-[10px] text-teal-300 font-medium">MTTR / MTBF</div>
              <div className="text-lg font-bold text-teal-400">6m / 2.4h</div>
            </div>
          </div>

          {/* HÀNG BIỂU ĐỒ TRÊN */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-[#0f172a] border-slate-800 text-slate-100">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-xs font-semibold text-slate-300">Biến động Sự cố theo Thời gian</CardTitle>
              </CardHeader>
              <CardContent className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569" }} />
                    <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} />
                    <Line type="monotone" dataKey="trend" stroke="#ef4444" strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-[#0f172a] border-slate-800 text-slate-100">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-xs font-semibold text-slate-300">Top 10 Thiết bị lỗi nhiều nhất</CardTitle>
              </CardHeader>
              <CardContent className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topFailures} layout="vertical">
                    <XAxis type="number" stroke="#64748b" fontSize={10} />
                    <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569" }} />
                    <Bar dataKey="count" fill="#818cf8" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}