"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wrench, Lock, Mail } from "lucide-react"
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
    
    // Giả lập kiểm tra tài khoản demo (sau này sẽ kết nối Database)
    if (email === "admin@cmms.com" && password === "123456") {
      // Lưu trạng thái đăng nhập giả lập vào localStorage
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userRole", "Admin")
      router.push("/")
    } else {
      setError("Email hoặc mật khẩu không chính xác! (Gợi ý: admin@cmms.com / 123456)")
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-blue-600 rounded-xl text-white">
              <Wrench className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">Hệ Thống CMMS</CardTitle>
          <CardDescription>Đăng nhập để quản lý bảo trì & tài sản</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-600 border border-red-200 text-sm rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email hệ thống</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="email"
                  placeholder="admin@cmms.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2">
              Đăng Nhập
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Tài khoản dùng thử: <span className="font-mono text-slate-600">admin@cmms.com</span> | Mật khẩu: <span className="font-mono text-slate-600">123456</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}