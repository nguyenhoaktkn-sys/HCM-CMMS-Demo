import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CaiDatPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cài Đặt Hệ Thống</h1>
        <p className="text-gray-500">Quản lý tài khoản, phân quyền và cấu hình thông báo CMMS</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Cấu Hình Chung</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 italic">Trang cài đặt thông số hệ thống đang được xây dựng...</p>
        </CardContent>
      </Card>
    </div>
  )
}