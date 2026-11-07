import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Wrench, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function Home() {
  const stats = [
    { title: "Tổng Số Thiết Bị", value: "124", icon: Wrench, color: "text-blue-600" },
    { title: "Sự Cố Đang Xử Lý", value: "5", icon: AlertTriangle, color: "text-amber-500" },
    { title: "Bảo Trì Tới Hạn (7 ngày)", value: "12", icon: Clock, color: "text-blue-500" },
    { title: "Thiết Bị Đang Dừng", value: "1", icon: AlertTriangle, color: "text-red-500" },
  ]

  const recentOrders = [
    { id: "WO-001", asset: "Máy nén khí A1", issue: "Rò rỉ áp suất", priority: "Cao", status: "Đang xử lý", tech: "Nguyễn Văn A" },
    { id: "WO-002", asset: "Băng tải chuyền 2", issue: "Bảo trì định kỳ tháng 11", priority: "Trung bình", status: "Chờ xử lý", tech: "Trần Văn B" },
    { id: "WO-003", asset: "Máy phát điện dự phòng", issue: "Thay dầu & bộ lọc", priority: "Thấp", status: "Hoàn thành", tech: "Lê Văn C" },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hệ Thống Quản Lý Bảo Trì (CMMS)</h1>
          <p className="text-gray-500">Tổng quan tình trạng thiết bị và phiếu yêu cầu sửa chữa</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          + Tạo Yêu Cầu Bảo Trì
        </Button>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Danh sách yêu cầu bảo trì mới nhất */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Danh Sách Phiếu Yêu Cầu Sửa Chữa Mới Nhất</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã Phiếu</TableHead>
                <TableHead>Thiết Bị / Tài Sản</TableHead>
                <TableHead>Mô Tả Sự Cố</TableHead>
                <TableHead>Mức Độ</TableHead>
                <TableHead>Trạng Thái</TableHead>
                <TableHead>Kỹ Thuật Viên</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.asset}</TableCell>
                  <TableCell>{order.issue}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.priority === 'Cao' ? 'bg-red-100 text-red-700' :
                      order.priority === 'Trung bình' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {order.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' :
                      order.status === 'Đang xử lý' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>{order.tech}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}