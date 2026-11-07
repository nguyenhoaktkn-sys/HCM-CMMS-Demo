import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ThietBiPage() {
  // Dữ liệu mẫu danh sách thiết bị/tài sản
  const assets = [
    { id: "EQ-101", name: "Máy nén khí A1", category: "Thiết bị cơ điện", location: "Xưởng Sản Xuất 1", status: "Hoạt động", lastPM: "15/10/2026" },
    { id: "EQ-102", name: "Băng tải chuyền 2", category: "Dây chuyền tự động", location: "Xưởng Đóng Gói", status: "Bảo trì", lastPM: "01/11/2026" },
    { id: "EQ-103", name: "Máy phát điện dự phòng", category: "Hệ thống điện", location: "Khu Kỹ Thuật", status: "Hoạt động", lastPM: "20/09/2026" },
    { id: "EQ-104", name: "Xe nâng hàng 3 tấn", category: "Thiết bị nâng hạ", location: "Kho Thành Phẩm", status: "Hỏng hóc", lastPM: "05/08/2026" },
    { id: "EQ-105", name: "Hệ thống PCCC khu A", category: "An toàn lao động", location: "Toàn Nhà Văn Phòng", status: "Hoạt động", lastPM: "10/10/2026" },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản Lý Danh Sách Thiết Bị & Tài Sản</h1>
          <p className="text-gray-500">Theo dõi thông tin máy móc, vị trí và lịch bảo trì định kỳ</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          + Thêm Thiết Bị Mới
        </Button>
      </div>

      {/* Thanh Tìm Kiếm & Lọc */}
      <Card className="mb-6">
        <CardContent className="pt-6 flex gap-4">
          <Input 
            placeholder="Tìm kiếm theo mã hoặc tên thiết bị..." 
            className="max-w-md bg-white"
          />
          <Button variant="outline">Tìm kiếm</Button>
        </CardContent>
      </Card>

      {/* Bảng Danh Sách Thiết Bị */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Tất Cả Thiết Bị Trong Hệ Thống</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã Thiết Bị</TableHead>
                <TableHead>Tên Thiết Bị / Máy Móc</TableHead>
                <TableHead>Phân Loại</TableHead>
                <TableHead>Vị Trí Lắp Đặt</TableHead>
                <TableHead>Bảo Trì Gần Nhất</TableHead>
                <TableHead>Trạng Thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium text-blue-600">{asset.id}</TableCell>
                  <TableCell className="font-semibold">{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.lastPM}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      asset.status === 'Hoạt động' ? 'bg-green-100 text-green-700' :
                      asset.status === 'Bảo trì' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {asset.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}