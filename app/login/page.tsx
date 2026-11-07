"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wrench, Lock, Mail, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Kiểm tra tài khoản dùng thử
    if (email === "admin@cmms.com" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userRole", "Admin")
      router.push("/")
    } else {
      setError("Email hoặc mật khẩu không chính xác! (Gợi ý: admin@cmms.com / 123456)")
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0b0f19] text-slate-100 p-4">
      <Card className="w-full max-w-md bg-[#0f172a] border-slate-800 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="flex items-center gap-2 bg-red-600 text-white font-black px-4 py-2 rounded-lg text-2xl tracking-tighter shadow-lg">
              <Wrench className="h-6 w-6" /> SPX CMMS
            </div>
          </div>
          <CardTitle className="text-xl font-extrabold text-white tracking-wide">
            HỆ THỐNG QUẢN LÝ BẢO TRÌ (CMMS)
          </CardTitle>
          <CardDescription className="text-slate-400 text-xs">
            Đăng nhập tài khoản vận hành kỹ thuật
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-950/60 border border-red-800/80 text-red-300 text-xs rounded-lg flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 flex-shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email hệ thống</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="email"
                  placeholder="admin@cmms.com"
                  className="pl-10 bg-[#1e293b] border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500 text-xs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-[#1e293b] border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500 text-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 text-xs shadow-md">
              ĐĂNG NHẬP VẬN HÀNH
            </Button>
          </form>

          <div className="mt-6 text-center text-[11px] text-slate-500 border-t border-slate-800/80 pt-4">
            Tài khoản demo: <span className="font-mono text-blue-400">admin@cmms.com</span> | Mật khẩu: <span className="font-mono text-blue-400">123456</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}