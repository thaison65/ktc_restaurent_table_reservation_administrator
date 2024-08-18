import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addSVGIcon } from '~/assets/icons';
import { Button } from '~/components/common/Button';
import Table from '~/components/common/Table';

const titles = ['STT', 'Tên khách hàng', 'Số điện thoại', 'Email', 'Khu vực', 'Trạng Thái', 'Ngày đặt bàn'];

const danhSachDon = [
  {
    stt: '1',
    tenKhachHang: 'John Doe',
    soDienThoai: '0987654321',
    email: 'johndoe@example.com',
    khuVuc: 'Ngoài sân',
    trangThai: 'Đang xác nhận',
    ngayDatBan: '12/05/2022',
  },
  {
    stt: '2',
    tenKhachHang: 'Jane Smith',
    soDienThoai: '0912345678',
    email: 'janesmith@example.com',
    khuVuc: 'Trong nhà',
    trangThai: 'Đã xác nhận',
    ngayDatBan: '13/05/2022',
  },
  {
    stt: '3',
    tenKhachHang: 'Michael Johnson',
    soDienThoai: '0908765432',
    email: 'michaelj@example.com',
    khuVuc: 'Ngoài sân',
    trangThai: 'Chờ thanh toán',
    ngayDatBan: '14/05/2022',
  },
  {
    stt: '4',
    tenKhachHang: 'Emily Davis',
    soDienThoai: '0934567890',
    email: 'emilydavis@example.com',
    khuVuc: 'Trong nhà',
    trangThai: 'Đang xác nhận',
    ngayDatBan: '15/05/2022',
  },
  {
    stt: '5',
    tenKhachHang: 'William Brown',
    soDienThoai: '0976543210',
    email: 'williambrown@example.com',
    khuVuc: 'Sân thượng',
    trangThai: 'Đã hủy',
    ngayDatBan: '16/05/2022',
  },
  {
    stt: '6',
    tenKhachHang: 'Olivia Taylor',
    soDienThoai: '0956781234',
    email: 'oliviataylor@example.com',
    khuVuc: 'Trong nhà',
    trangThai: 'Đang xác nhận',
    ngayDatBan: '17/05/2022',
  },
  {
    stt: '7',
    tenKhachHang: 'James Anderson',
    soDienThoai: '0923456789',
    email: 'jamesanderson@example.com',
    khuVuc: 'Ngoài sân',
    trangThai: 'Đã xác nhận',
    ngayDatBan: '18/05/2022',
  },
  {
    stt: '8',
    tenKhachHang: 'Isabella Thomas',
    soDienThoai: '0945678901',
    email: 'isabellathomas@example.com',
    khuVuc: 'Sân thượng',
    trangThai: 'Chờ thanh toán',
    ngayDatBan: '19/05/2022',
  },
  {
    stt: '9',
    tenKhachHang: 'Liam Wilson',
    soDienThoai: '0911223344',
    email: 'liamwilson@example.com',
    khuVuc: 'Trong nhà',
    trangThai: 'Đã xác nhận',
    ngayDatBan: '20/05/2022',
  },
  {
    stt: '10',
    tenKhachHang: 'Sophia Martinez',
    soDienThoai: '0987651234',
    email: 'sophiamartinez@example.com',
    khuVuc: 'Ngoài sân',
    trangThai: 'Đang xác nhận',
    ngayDatBan: '21/05/2022',
  },
  {
    stt: '11',
    tenKhachHang: 'Benjamin Harris',
    soDienThoai: '0967890123',
    email: 'benjaminharris@example.com',
    khuVuc: 'Sân thượng',
    trangThai: 'Đã hủy',
    ngayDatBan: '22/05/2022',
  },
  {
    stt: '12',
    tenKhachHang: 'Mia Clark',
    soDienThoai: '0954321098',
    email: 'miaclark@example.com',
    khuVuc: 'Trong nhà',
    trangThai: 'Đang xác nhận',
    ngayDatBan: '23/05/2022',
  },
  {
    stt: '13',
    tenKhachHang: 'Lucas Lewis',
    soDienThoai: '0932109876',
    email: 'lucaslewis@example.com',
    khuVuc: 'Ngoài sân',
    trangThai: 'Đã xác nhận',
    ngayDatBan: '24/05/2022',
  },
  {
    stt: '14',
    tenKhachHang: 'Amelia Lee',
    soDienThoai: '0923456789',
    email: 'amelialee@example.com',
    khuVuc: 'Sân thượng',
    trangThai: 'Chờ thanh toán',
    ngayDatBan: '25/05/2022',
  },
  {
    stt: '15',
    tenKhachHang: 'Henry Walker',
    soDienThoai: '0910987654',
    email: 'henrywalker@example.com',
    khuVuc: 'Trong nhà',
    trangThai: 'Đã xác nhận',
    ngayDatBan: '26/05/2022',
  },
  {
    stt: '16',
    tenKhachHang: 'Evelyn Hall',
    soDienThoai: '0943210987',
    email: 'evelynhall@example.com',
    khuVuc: 'Ngoài sân',
    trangThai: 'Đang xác nhận',
    ngayDatBan: '27/05/2022',
  },
  {
    stt: '17',
    tenKhachHang: 'Alexander King',
    soDienThoai: '0934567890',
    email: 'alexanderking@example.com',
    khuVuc: 'Sân thượng',
    trangThai: 'Đã hủy',
    ngayDatBan: '28/05/2022',
  },
  {
    stt: '18',
    tenKhachHang: 'Charlotte Wright',
    soDienThoai: '0956784321',
    email: 'charlottewright@example.com',
    khuVuc: 'Trong nhà',
    trangThai: 'Đang xác nhận',
    ngayDatBan: '29/05/2022',
  },
  {
    stt: '19',
    tenKhachHang: 'Daniel Lopez',
    soDienThoai: '0912345678',
    email: 'daniellopez@example.com',
    khuVuc: 'Ngoài sân',
    trangThai: 'Chờ thanh toán',
    ngayDatBan: '30/05/2022',
  },
  {
    stt: '20',
    tenKhachHang: 'Grace Green',
    soDienThoai: '0987654321',
    email: 'gracegreen@example.com',
    khuVuc: 'Sân thượng',
    trangThai: 'Đã xác nhận',
    ngayDatBan: '31/05/2022',
  },
];

function OrderPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    // Fetch data from API
    //...
    // Update danhSachBan with fetched data

    if (searchParams.get('search')) {
      const searchText = searchParams.get('search').toLowerCase().trim();

      const filteredData = danhSachDon.filter((item) => {
        return item.tenKhachHang.toLowerCase().includes(searchText) || item.soDienThoai.toLowerCase().includes(searchText);
      });

      setDatas(filteredData);
    } else {
      setDatas(danhSachDon);
    }

    setSearchParams({ search: searchParams.get('search') ?? '' });
  }, [searchParams, setSearchParams]);
  return (
    <>
      <div className=' header-content-table'>
        <Button icon={addSVGIcon} title={'Thêm bàn'} classes={'btn-add button'} />
      </div>

      <Table titles={titles} datas={datas} />
    </>
  );
}

export default OrderPage;
