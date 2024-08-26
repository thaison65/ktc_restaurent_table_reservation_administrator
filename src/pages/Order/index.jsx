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
  const [sortedTables, setSortedTables] = useState(datas);

  const [triggerReload, setTriggerReload] = useState(false);

  const handleSortChange = (event) => {
    const sortType = event.target.value;

    let sorted;
    if (sortType === '1') {
      // Sort by nearest date (ascending order)
      sorted = [...datas].sort((a, b) => new Date(a.dateBooking) - new Date(b.dateBooking));
    } else if (sortType === '2') {
      // Sort by farthest date (descending order)
      sorted = [...datas].sort((a, b) => new Date(b.dateBooking) - new Date(a.dateBooking));
    } else {
      // Default sorting or no sorting
      sorted = [...datas];
    }

    setSortedTables(sorted);
  };

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

        const search = searchParams.get('search');
        const date = searchParams.get('date');

        if (search || date) {
          const searchText = search.toLowerCase().trim();

          let filteredDatas = [...tables];

          if (date) {
            filteredDatas = tables.filter((item) => {
              return item.dateBooking === date;
            });
          }

          const filteredData = filteredDatas.filter((item) => {
            if (item.name.toLowerCase().includes(searchText) || item.phone.toLowerCase().includes(searchText)) {
              return true;
            }
          });

          setDatas(filteredData);
          setSortedTables(filteredData);
        } else {
          setSortedTables(tables);
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
    <>
      <div className='header-content-table'>
        <label className='title-sort' htmlFor=''>
          Sắp xếp ngày đặt bàn:
        </label>
        <select className='select-sort' onChange={handleSortChange}>
          <option value='0'>Mặc định</option>
          <option value='1'>Sắp xếp theo ngày từ nhỏ nhất</option>
          <option value='2'>Sắp xếp theo ngày từ lớn nhất</option>
        </select>
      </div>
      <div id='content-page-order'>
        <Table titles={titles} datas={sortedTables} handleClickBtnUpdate={handleClickBtnUpdate} recordsPerPage={8} titleUpdate={'Chi tiết đơn đặt'} />

        <ModalDialog show={showModal} onClose={handleCloseModal} title={'Chi tiết đơn đặt bàn'}>
          <ChildrenModalOrder onClose={handleCloseModal} item={itemUpdated} action={action} handleTriggerReload={handleTriggerReload} />
        </ModalDialog>
      </div>
    </>
  );
}

export default OrderPage;
