import { useEffect, useState } from 'react';

import Button from '~/components/common/Button';
import SelectArea from '~/components/common/SelectItem';
import Alert from '~/components/common/Dialog/Alert';

import './ChildrenModal.scss';
import { getBooking, putBookingStatus } from '~/services';
import Loading from '~/components/common/Dialog/Loading';

const status = [
  {
    id: 0,
    title: 'Không nhận đơn đặt bàn',
    color: 'gray',
  },
  {
    id: 1,
    title: 'Chấp thuận đơn đặt bàn',
    color: 'success',
  },
  {
    id: 2,
    title: 'Chờ xác nhận',
    color: 'warning',
  },
  {
    id: 3,
    title: 'Đơn đặt bàn bị hủy',
    color: 'danger',
  },
  {
    id: 4,
    title: 'Đơn đã hoàn thành',
    color: 'primay',
  },
];

function ChildrenModalOrder({ ...props }) {
  const { onClose, item = 1, handleTriggerReload } = props;

  const [id, setID] = useState('');
  const [booking, setBooking] = useState({
    name: '',
    phone: '',
    email: '',
    idTable: '',
    nameTable: '',
    nameCategory: '',
    note: '',
    booking_date: '',
  });
  const [selectedStatus, setSelectedStatus] = useState('');

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, onClose: null, title: '', message: '', status: 'success' });

  const handleSelectStatus = (event) => {
    console.log('Select:', event.target.value);
    setSelectedStatus(event.target.value);
    console.log(selectedStatus);
  };

  const handleCloseAlert = () => {
    setShowAlert({ show: false });
    onClose();
  };

  const handleCloseError = () => {
    setShowAlert({ show: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await putBookingStatus(id, selectedStatus);
      handleTriggerReload();
      setLoading(false);

      setShowAlert({
        show: true,
        onClose: handleCloseAlert,
        title: 'Cập nhật trạng thái',
        message: 'Thông tin trạng thái cập nhật thành công',
        status: 'success',
      });
    } catch (e) {
      console.error(e);
      setLoading(false);

      setShowAlert({
        show: true,
        onClose: handleCloseError,
        title: 'Lỗi khi cập nhật',
        message: 'Cập nhật trạng thái không thành công',
        status: 'error',
      });
    }
  };

  useEffect(() => {
    if (!item) return;

    const fetchData = async () => {
      try {
        // Fetch booking data
        const bookingResponse = await getBooking(item);

        setID(bookingResponse.id);
        setBooking({
          name: bookingResponse.name,
          phone: bookingResponse.phone,
          email: bookingResponse.email,
          idTable: bookingResponse.views.id,
          nameTable: bookingResponse.views.name,
          nameCategory: bookingResponse.views.category.name,
          note: bookingResponse.addition_note,
          booking_date: bookingResponse.booking_date,
        });
        setSelectedStatus(bookingResponse.booking_status);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [item]);

  return (
    <>
      <form id='form-order' onSubmit={handleSubmit}>
        <p id='id-booking'>
          Mã đơn đặt: <span>{id}</span>
        </p>
        <section id='content-booking-detail'>
          <section className='container-info-customer'>
            <h3>Thông tin khách hàng</h3>
            <p id='name-customer'>
              Tên khách hàng: <span>{booking.name}</span>
            </p>
            <p id='phone-customer'>
              Số điện thoại: <span>{booking.phone}</span>
            </p>
            <p id='email-customer'>
              Email: <span>{booking.email}</span>
            </p>
            <p id='note'>
              Ghi chú: <span>{booking.note}</span>
            </p>
          </section>

          <section className='container-desk'>
            <h3>Thông tin bàn được đặt</h3>
            <p id='id-table'>
              ID bàn: <span>{booking.idTable}</span>
            </p>
            <p id='name-table'>
              Tên bàn: <span>{booking.nameTable}</span>
            </p>
            <p id='name-category'>
              Loại bàn: <span>{booking.nameCategory}</span>
            </p>
          </section>

          <section className='container-select'>
            <h3>Thông tin đơn đặt</h3>

            <p id='booking-date'>
              Ngày đặt: <span>{booking.booking_date}</span>
            </p>
            <SelectArea title={'Trạng thái:'} options={status} onSelect={handleSelectStatus} selectedValue={selectedStatus} />
          </section>
        </section>

        <p className='note'>
          Thay đổi trạng thái đơn đặt bàn <span>*</span>
        </p>

        {loading ? (
          <Loading showLoading={loading} />
        ) : (
          <div className='container-btn'>
            <Button type='submit' title={'Xác nhận'} classes={'button btn-submit'} />
            <Button onClick={onClose} title={'Đóng'} classes={'button btn-close'} />
          </div>
        )}
      </form>

      <Alert onClose={showAlert.onClose} show={showAlert.show} title={showAlert.title} message={showAlert.message} status={showAlert.status} />
    </>
  );
}

export default ChildrenModalOrder;
