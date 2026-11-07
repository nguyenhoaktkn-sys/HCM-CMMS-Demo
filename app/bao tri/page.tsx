import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function BaoTriPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lịch Bảo Trì Định Kỳ (PM)</h1>
          <p className="text-gray-500">Kế hoạch và lịch trình bảo dưỡng máy móc, thiết bị</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          + Thêm Lịch Bảo Trì
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Lịch Bảo Trì Sắp Tới</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 italic">Tính năng quản lý lịch trình bảo trì đang được phát triển...</p>
        </CardContent>
      </Card>
    </div>
  )
}