import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ModalDialog } from '~/components/common/Dialog';
import Table from '~/components/common/Table';
import ChildrenModalOrder from './ChildrenModal';

import './Order.scss';
import { getBookings } from '~/services';

const titles = ['STT', 'Mã đơn', 'Tên khách hàng', 'Số điện thoại', 'Email', 'Trạng Thái', 'Khu vực', 'Ngày đặt bàn'];

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
          const searchText = searchParams.get('search').toLowerCase().trim();

          const filteredData = tables.filter((item) => {
            if (item.name.toLowerCase().includes(searchText) || item.phone.toLowerCase().includes(searchText)) {
              return true;
            }
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
