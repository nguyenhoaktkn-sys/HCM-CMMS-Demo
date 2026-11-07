import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BaoCaoPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Báo Cáo & Thống Kê</h1>
        <p className="text-gray-500">Phân tích hiệu suất thiết bị (MTBF, MTTR) và chi phí bảo trì</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tổng Quan Báo Cáo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 italic">Hệ thống biểu đồ báo cáo chi phí và sự cố đang được khởi tạo...</p>
        </CardContent>
      </Card>
    </div>
  )
}