"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  LogOut, Clock, Globe, Settings, Filter, ChevronDown, 
  Upload, Download, UserPlus, FileSpreadsheet, Calendar as CalendarIcon 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// Danh sách mã ca trực và khung giờ
const SHIFT_TYPES = [
  { code: "OFF", label: "Nghỉ (OFF)", color: "bg-yellow-400 text-black font-bold" },
  { code: "S1", label: "Ca 1 (04:00 - 13:00)", color: "bg-slate-800 text-cyan-300" },
  { code: "S2", label: "Ca 2 (06:00 - 14:00)", color: "bg-slate-800 text-emerald-300" },
  { code: "S3", label: "Ca 3 (08:00 - 16:00)", color: "bg-slate-800 text-blue-300" },
  { code: "S10", label: "Ca 10 (13:00 - 22:00)", color: "bg-slate-800 text-purple-300" },
  { code: "S19", label: "Ca đêm (19:00 - 03:00)", color: "bg-indigo-900 text-cyan-200" },
  { code: "KL", label: "Nghỉ không lương", color: "bg-blue-600 text-white font-bold" },
]

// Danh sách nhân viên demo
const INITIAL_STAFF = [
  { id: 1, name: "Lê Văn Sang" },
  { id: 2, name: "Nguyễn Văn Hòa" },
  { id: 3, name: "Nguyễn Đình Long" },
  { id: 4, name: "Hoàng Văn Tĩnh" },
  { id: 5, name: "Lê Minh Cường" },
  { id: 6, name: "Phạm Đức Phong" },
  { id: 7, name: "Đặng Lê Hoàng" },
  { id: 8, name: "Phan Hoàng Bảo Long" },
  { id: 9, name: "Phạm Thanh Nhã" },
]

// Tạo danh sách 30 ngày trong tháng 11/2026
const DAYS = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1
  // Giả lập ngày cuối tuần (Thứ 7 / CN)
  const isWeekend = (day % 7 === 1 || day % 7 === 2) 
  return {
    day: day < 10 ? `0${day}` : `${day}`,
    weekDay: isWeekend ? "CN" : `T${(day % 5) + 2}`,
    isWeekend
  }
})

export default function ShiftSchedulePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("LichCa")
  
  // State lưu lịch trực: key = "staffId-dayIndex", value = shiftCode
  const [schedule, setSchedule] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    INITIAL_STAFF.forEach((staff) => {
      DAYS.forEach((_, dayIdx) => {
        // Gán mẫu ngẫu nhiên: OFF cuối tuần, ngày thường ca S3/S10/S19
        if (dayIdx % 7 === 0 || dayIdx % 7 === 6) {
          initial[`${staff.id}-${dayIdx}`] = "OFF"
        } else if (dayIdx % 3 === 0) {
          initial[`${staff.id}-${dayIdx}`] = "S19"
        } else if (dayIdx % 4 === 0) {
          initial[`${staff.id}-${dayIdx}`] = "S10"
        } else {
          initial[`${staff.id}-${dayIdx}`] = "S3"
        }
      })
    })
    return initial
  })

  // State điều khiển Popup phân ca
  const [selectedCell, setSelectedCell] = useState<{ staffId: number; staffName: string; dayIndex: number; dayStr: string } | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  // Mở popup khi click vào 1 ô trong ma trận
  const handleCellClick = (staffId: number, staffName: string, dayIndex: number, dayStr: string) => {
    setSelectedCell({ staffId, staffName, dayIndex, dayStr })
    setOpenDialog(true)
  }

  // Cập nhật ca trực mới cho nhân viên
  const updateShift = (shiftCode: string) => {
    if (!selectedCell) return
    setSchedule((prev) => ({
      ...prev,
      [`${selectedCell.staffId}-${selectedCell.dayIndex}`]: shiftCode
    }))
    setOpenDialog(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
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
      {/* 1. HEADER */}
      <header className="bg-[#0f172a] border-b border-slate-800 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#ea580c] text-white font-black px-3 py-1 rounded text-xl tracking-tighter">
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
          <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-blue-400" /> Chủ Nhật, 08/11/2026</div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white"><Globe className="w-4 h-4" /> Tiếng Việt VN</div>
          <Settings className="w-4 h-4 cursor-pointer hover:text-white" onClick={() => router.push("/cai-dat")} />
        </div>
      </header>

      {/* 2. THANH MENU ĐIỀU HƯỚNG */}
      <nav className="bg-[#1e293b] border-b border-slate-800 px-6 flex justify-between items-center overflow-x-auto">
        <div className="flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                if (item.path !== "/lich-lam-viec") router.push(item.path)
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
        </div>

        {/* Nút tác vụ Excel */}
        <div className="flex gap-2 py-1.5">
          <Button size="sm" variant="outline" className="h-7 text-[11px] bg-slate-800 border-slate-700 text-slate-200">
            <Upload className="w-3.5 h-3.5 mr-1" /> Import Shift Info
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-[11px] bg-slate-800 border-slate-700 text-slate-200">
            <Download className="w-3.5 h-3.5 mr-1" /> Export Ca
          </Button>
        </div>
      </nav>

      {/* 3. NỘI DUNG CHÍNH (BỘ LỌC + MA TRẬN PHÂN CA) */}
      <div className="flex flex-1 p-3 gap-3 overflow-hidden">
        {/* CỘT BỘ LỌC BÊN TRÁI */}
        <aside className="w-56 bg-[#0f172a] rounded-xl border border-slate-800 p-3 flex flex-col gap-3 text-xs flex-shrink-0">
          <div className="bg-[#1e293b] p-3 rounded-lg border border-slate-700/50">
            <div className="text-slate-400">Xin chào, <span className="text-white font-bold">Nguyễn Văn Hòa</span></div>
            <Button size="sm" onClick={handleLogout} className="mt-2 h-7 text-[10px] bg-amber-600 hover:bg-amber-700 text-white w-full">
              <LogOut className="w-3 h-3 mr-1" /> Đăng xuất
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1 font-bold text-slate-300 text-sm">
              <Filter className="w-4 h-4 text-blue-400" /> BỘ LỌC LỊCH CA
            </div>

            <div className="bg-[#1e293b] p-2.5 rounded-lg space-y-2 border border-slate-700/50">
              <label className="text-slate-400 font-semibold block">Năm / Tháng</label>
              <div className="bg-[#0f172a] p-2 rounded text-center border border-slate-800 text-blue-400 font-mono font-bold">
                Tháng 11 - 2026
              </div>
            </div>

            <div className="bg-[#1e293b] p-2.5 rounded-lg border border-slate-700/50 space-y-1.5">
              <span className="text-slate-400 font-semibold">Nhân viên</span>
              <input type="text" placeholder="Tìm tên nhân viên..." className="w-full bg-[#0f172a] border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-blue-500" />
            </div>
          </div>
        </aside>

        {/* BẢNG MA TRẬN PHÂN CA (KHUNG ĐỎ) */}
        <main className="flex-1 bg-[#0f172a] rounded-xl border border-slate-800 p-3 flex flex-col overflow-hidden">
          {/* Thanh ghi chú mã ca */}
          <div className="flex flex-wrap gap-1.5 mb-3 pb-2 border-b border-slate-800 text-[10px]">
            <span className="font-bold text-slate-400 self-center mr-1">Ghi chú:</span>
            {SHIFT_TYPES.map((s) => (
              <span key={s.code} className={`px-2 py-0.5 rounded border border-slate-700 ${s.color}`}>
                {s.code}: {s.label}
              </span>
            ))}
          </div>

          {/* Bảng cuộn ma trận phân ca */}
          <div className="flex-1 overflow-auto rounded border border-slate-800">
            <table className="w-full text-center border-collapse text-[11px]">
              <thead>
                {/* Hàng 1: Tiêu đề Tháng & Các Ngày trong tháng */}
                <tr className="bg-indigo-950 text-white font-bold sticky top-0 z-20">
                  <th className="p-2 border border-slate-700 bg-indigo-900 min-w-[140px] text-left px-3">
                    11-2026
                  </th>
                  {DAYS.map((d, idx) => (
                    <th 
                      key={idx} 
                      className={`p-1 border border-slate-700 min-w-[36px] ${
                        d.isWeekend ? "bg-yellow-500 text-slate-950" : "bg-indigo-950 text-cyan-300"
                      }`}
                    >
                      {d.day}
                      <div className="text-[9px] font-normal">{d.weekDay}</div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {INITIAL_STAFF.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-800/50 transition-colors">
                    {/* Cột Tên nhân viên */}
                    <td className="p-2 border border-slate-800 text-left font-bold text-slate-200 bg-[#0f172a] sticky left-0 z-10 whitespace-nowrap">
                      {staff.name}
                    </td>

                    {/* Các ô mã ca từng ngày */}
                    {DAYS.map((d, dayIdx) => {
                      const shiftCode = schedule[`${staff.id}-${dayIdx}`] || "S3"
                      const shiftInfo = SHIFT_TYPES.find((s) => s.code === shiftCode)

                      return (
                        <td
                          key={dayIdx}
                          onClick={() => handleCellClick(staff.id, staff.name, dayIdx, `${d.day}/11`)}
                          className={`border border-slate-800 p-1 cursor-pointer font-bold select-none transition-transform hover:scale-110 hover:z-20 ${
                            shiftCode === "OFF"
                              ? "bg-yellow-400 text-black"
                              : shiftCode === "KL"
                              ? "bg-blue-600 text-white"
                              : shiftCode === "S19"
                              ? "bg-indigo-900 text-cyan-200"
                              : "bg-[#1e293b] text-cyan-400"
                          }`}
                        >
                          {shiftCode}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* POPUP THAO TÁC PHÂN CA KHI CLICK VÀO Ô */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-[#0f172a] border-slate-800 text-slate-100 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-blue-400" />
              Phân Ca: <span className="text-blue-400">{selectedCell?.staffName}</span> ({selectedCell?.dayStr})
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-2 py-3">
            {SHIFT_TYPES.map((s) => (
              <Button
                key={s.code}
                variant="outline"
                onClick={() => updateShift(s.code)}
                className={`justify-start border-slate-700 text-xs ${s.color} hover:opacity-90`}
              >
                <span className="font-black mr-1.5">[{s.code}]</span> {s.label}
              </Button>
            ))}
          </div>

          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setOpenDialog(false)} className="text-slate-400 hover:text-white">
              Hủy bỏ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}