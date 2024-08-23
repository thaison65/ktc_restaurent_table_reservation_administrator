import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ModalDialog } from '~/components/common/Dialog';
import Table from '~/components/common/Table';
import ChildrenModalOrder from './ChildrenModal';

import './Order.scss';
import { getBookings } from '~/services';

const titles = ['STT', 'Mã đơn', 'Tên khách hàng', 'Số điện thoại', 'Email', 'Trạng Thái', 'Khu vực', 'Ngày đặt bàn'];

// const danhSachDon = [
//   {
//     id: '1',
//     customer: 'John Doe',
//     phone: '0987654321',
//     email: 'johndoe@example.com',
//     area: 'Ngoài sân',
//     status: 'Đang xác nhận',
//     dateBooking: '12/05/2022',
//   },
//   {
//     id: '2',
//     customer: 'Jane Smith',
//     phone: '0912345678',
//     email: 'janesmith@example.com',
//     area: 'Trong nhà',
//     status: 'Đã xác nhận',
//     dateBooking: '13/05/2022',
//   },
//   {
//     id: '3',
//     customer: 'Michael Johnson',
//     phone: '0908765432',
//     email: 'michaelj@example.com',
//     area: 'Ngoài sân',
//     status: 'Chờ thanh toán',
//     dateBooking: '14/05/2022',
//   },
//   {
//     id: '4',
//     customer: 'Emily Davis',
//     phone: '0934567890',
//     email: 'emilydavis@example.com',
//     area: 'Trong nhà',
//     status: 'Đang xác nhận',
//     dateBooking: '15/05/2022',
//   },
//   {
//     id: '5',
//     customer: 'William Brown',
//     phone: '0976543210',
//     email: 'williambrown@example.com',
//     area: 'Sân thượng',
//     status: 'Đã hủy',
//     dateBooking: '16/05/2022',
//   },
//   {
//     id: '6',
//     customer: 'Olivia Taylor',
//     phone: '0956781234',
//     email: 'oliviataylor@example.com',
//     area: 'Trong nhà',
//     status: 'Đang xác nhận',
//     dateBooking: '17/05/2022',
//   },
//   {
//     id: '7',
//     customer: 'James Anderson',
//     phone: '0923456789',
//     email: 'jamesanderson@example.com',
//     area: 'Ngoài sân',
//     status: 'Đã xác nhận',
//     dateBooking: '18/05/2022',
//   },
//   {
//     id: '8',
//     customer: 'Isabella Thomas',
//     phone: '0945678901',
//     email: 'isabellathomas@example.com',
//     area: 'Sân thượng',
//     status: 'Chờ thanh toán',
//     dateBooking: '19/05/2022',
//   },
//   {
//     id: '9',
//     customer: 'Liam Wilson',
//     phone: '0911223344',
//     email: 'liamwilson@example.com',
//     area: 'Trong nhà',
//     status: 'Đã xác nhận',
//     dateBooking: '20/05/2022',
//   },
//   {
//     id: '10',
//     customer: 'Sophia Martinez',
//     phone: '0987651234',
//     email: 'sophiamartinez@example.com',
//     area: 'Ngoài sân',
//     status: 'Đang xác nhận',
//     dateBooking: '21/05/2022',
//   },
//   {
//     id: '11',
//     customer: 'Benjamin Harris',
//     phone: '0967890123',
//     email: 'benjaminharris@example.com',
//     area: 'Sân thượng',
//     status: 'Đã hủy',
//     dateBooking: '22/05/2022',
//   },
//   {
//     id: '12',
//     customer: 'Mia Clark',
//     phone: '0954321098',
//     email: 'miaclark@example.com',
//     area: 'Trong nhà',
//     status: 'Đang xác nhận',
//     dateBooking: '23/05/2022',
//   },
//   {
//     id: '13',
//     customer: 'Lucas Lewis',
//     phone: '0932109876',
//     email: 'lucaslewis@example.com',
//     area: 'Ngoài sân',
//     status: 'Đã xác nhận',
//     dateBooking: '24/05/2022',
//   },
//   {
//     id: '14',
//     customer: 'Amelia Lee',
//     phone: '0923456789',
//     email: 'amelialee@example.com',
//     area: 'Sân thượng',
//     status: 'Chờ thanh toán',
//     dateBooking: '25/05/2022',
//   },
//   {
//     id: '15',
//     customer: 'Henry Walker',
//     phone: '0910987654',
//     email: 'henrywalker@example.com',
//     area: 'Trong nhà',
//     status: 'Đã xác nhận',
//     dateBooking: '26/05/2022',
//   },
//   {
//     id: '16',
//     customer: 'Evelyn Hall',
//     phone: '0943210987',
//     email: 'evelynhall@example.com',
//     area: 'Ngoài sân',
//     status: 'Đang xác nhận',
//     dateBooking: '27/05/2022',
//   },
//   {
//     id: '17',
//     customer: 'Alexander King',
//     phone: '0934567890',
//     email: 'alexanderking@example.com',
//     area: 'Sân thượng',
//     status: 'Đã hủy',
//     dateBooking: '28/05/2022',
//   },
//   {
//     id: '18',
//     customer: 'Charlotte Wright',
//     phone: '0956784321',
//     email: 'charlottewright@example.com',
//     area: 'Trong nhà',
//     status: 'Đang xác nhận',
//     dateBooking: '29/05/2022',
//   },
//   {
//     id: '19',
//     customer: 'Daniel Lopez',
//     phone: '0912345678',
//     email: 'daniellopez@example.com',
//     area: 'Ngoài sân',
//     status: 'Chờ thanh toán',
//     dateBooking: '30/05/2022',
//   },
//   {
//     id: '20',
//     customer: 'Grace Green',
//     phone: '0987654321',
//     email: 'gracegreen@example.com',
//     area: 'Sân thượng',
//     status: 'Đã xác nhận',
//     dateBooking: '31/05/2022',
//   },
// ];

function OrderPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [datas, setDatas] = useState([]);
  const [itemUpdated, setItemUpdated] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('add');

  const [triggerReload, setTriggerReload] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClickBtnUpdate = (data) => {
    setItemUpdated(data.id);
    setShowModal(true);
    setAction('update');
  };

  const handleTriggerReload = () => {
    setTriggerReload(!triggerReload);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getBookings();

        const tables = response.map((item) => ({
          id: item.id,
          name: item.name,
          phone: item.phone,
          email: item.email,
          status: item.booking_status,
          categoryName: item.views.category.name,
          dateBooking: item.booking_date,
        }));

        if (searchParams.get('search') || searchParams.get('date')) {
          console.log(searchParams.get('date'));

          const searchText = searchParams.get('search').toLowerCase().trim();
          // const formattedDate = startDate instanceof Date ? startDate.toISOString().split('T')[0] : startDate;

          const filteredData = tables.filter((item) => {
            return item.customer.toLowerCase().includes(searchText) || item.phone.toLowerCase().includes(searchText);
          });

          setDatas(filteredData);
        } else {
          setDatas(tables);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getData();
  }, [searchParams, triggerReload]);

  useEffect(() => {
    // Chỉ cập nhật setSearchParams nếu nó chưa có giá trị 'search'
    if (!searchParams.has('search')) {
      setSearchParams({ search: searchParams.get('search') ?? '' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div id='content-page-order'>
      <Table titles={titles} datas={datas} handleClickBtnUpdate={handleClickBtnUpdate} recordsPerPage={8} titleUpdate={'Chi tiết đơn đặt'} />

      <ModalDialog show={showModal} onClose={handleCloseModal} title={'Chi tiết đơn đặt bàn'}>
        <ChildrenModalOrder onClose={handleCloseModal} item={itemUpdated} action={action} handleTriggerReload={handleTriggerReload} />
      </ModalDialog>
    </div>
  );
}

export default OrderPage;
