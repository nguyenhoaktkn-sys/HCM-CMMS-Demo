import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function CMMSDashboard() {
  const workOrders = [
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

      {/* Thẻ Thống Kê */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Tổng Số Thiết Bị</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">124</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Sự Cố Đang Xử Lý</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">5</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Bảo Trì Tới Hạn (7 ngày)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Thiết Bị Đang Dừng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">1</div>
          </CardContent>
        </Card>
      </div>

      {/* Bảng Danh Sách Phiếu Công Việc */}
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
              {workOrders.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.asset}</TableCell>
                  <TableCell>{item.issue}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.priority === 'Cao' ? 'bg-red-100 text-red-700' :
                      item.priority === 'Trung bình' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Hoàn thành' ? 'bg-green-100 text-green-700' :
                      item.status === 'Đang xử lý' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>{item.tech}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}