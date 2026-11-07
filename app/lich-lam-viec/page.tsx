import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function LichLamViecPage() {
  const shifts = [
    { id: "S-01", tech: "Nguyễn Văn A", shift: "Ca 1 (06:00 - 14:00)", zone: "Xưởng Sản Xuất 1", status: "Đang trực" },
    { id: "S-02", tech: "Trần Văn B", shift: "Ca 2 (14:00 - 22:00)", zone: "Khu Kỹ Thuật Điện", status: "Chờ ca" },
    { id: "S-03", tech: "Lê Văn C", shift: "Ca 3 (22:00 - 06:00)", zone: "Kho Thành Phẩm", status: "Chờ ca" },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lịch Làm Việc & Ca Trực Kỹ Thuật</h1>
          <p className="text-gray-500">Phân công ca trực và phân vùng hỗ trợ cho kỹ thuật viên bảo trì</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          + Phân Công Ca Mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lịch Phân Công Ca Trực Hôm Nay</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã Ca</TableHead>
                <TableHead>Kỹ Thuật Viên</TableHead>
                <TableHead>Ca Làm Việc</TableHead>
                <TableHead>Khu Vực Phụ Trách</TableHead>
                <TableHead>Trạng Thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shifts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-blue-600">{item.id}</TableCell>
                  <TableCell className="font-semibold">{item.tech}</TableCell>
                  <TableCell>{item.shift}</TableCell>
                  <TableCell>{item.zone}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Đang trực' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status}
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