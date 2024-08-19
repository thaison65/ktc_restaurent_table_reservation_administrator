import { useEffect, useState } from 'react';

import Button from '~/components/common/Button';
import InputField from '~/components/common/InputField';
import SelectArea from '~/components/common/SelectItem';

import './ChildrenModal.scss';

const categories = [
  {
    id: 1,
    title: 'Sân vườn',
  },
  {
    id: 2,
    title: 'Quầy bar',
  },
  {
    id: 3,
    title: 'Trong sảnh',
  },
  {
    id: 4,
    title: 'Cạnh biển',
  },
];

const status = [
  {
    id: 0,
    title: 'Không nhận',
  },
  {
    id: 1,
    title: 'Nhận',
  },
  {
    id: 2,
    title: 'Chờ',
  },
  {
    id: 3,
    title: 'Hủy',
  },
  {
    id: 4,
    title: 'Hoàn thành',
  },
];

function ChildrenModalOrder({ ...props }) {
  const { onClose, item = {}, action = 'add' } = props;

  const [id, setID] = useState('');
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({ customer: '', phone: '', email: '', errors: '' });

  const handleSelectSelect = (event) => {
    console.log('Select:', event.target.value);
    setSelectedArea(event.target.value);
    console.log(selectedArea);
  };

  const handleSelectStatus = (event) => {
    console.log('Select:', event.target.value);
    setSelectedStatus(event.target.value);
    console.log(selectedStatus);
  };

  console.log(action);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (customer.trim() === '') {
      newErrors.name = 'Name is required';
    }
    if (date.trim() === '') {
      newErrors.description = 'Description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append('customer', customer);
    formData.append('selectedArea', selectedArea);
    formData.append('description', date);

    console.log('Submitting form with data:', { id, customer, selectedArea, description: date });

    // Clear the form after submission (optional)
    setID('');
    setCustomer('');
    setSelectedArea('');
    setDate('');
    setErrors({ name: '', description: '', errors: '' });
  };

  useEffect(() => {
    if (item) {
      setID(item.id || '');
      setCustomer(item.customer || '');
      setPhone(item.phone || '');
      setEmail(item.email || '');
      setSelectedArea(item.area || '');
      setSelectedStatus(item.status || '');
      setDate(item.dateBooking || '');
      // Set file if item has one
      // setSelectedFile(item.file || null);
    }
  }, [item]);

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <InputField id='id' name='id' label='Mã đơn đặt:' value={id} onChange={(e) => setID(e.target.value)} readOnly />
        <InputField
          id='customer'
          name='customer'
          label='Tên khách hàng: '
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          error={errors.customer}
          readOnly
          required
        />

        <InputField
          id='phone'
          name='phone'
          label='Số điện thoại:  '
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
          readOnly
          required
        />

        <InputField
          id='email'
          name='email'
          label='Địa chỉ Email:  '
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          readOnly
          required
        />

        <div className='container-select'>
          <SelectArea title={'Chọn khu vực:'} options={categories} onSelect={handleSelectSelect} selectedValue={selectedArea} />
          <SelectArea title={'Trạng thái:'} options={status} onSelect={handleSelectStatus} selectedValue={selectedStatus} />
        </div>

        <InputField
          id='date'
          name='date'
          label='Ngày đặt bàn: '
          value={date}
          onChange={(e) => setDate(e.target.value)}
          error={errors.date}
          readOnly
          required
        />

        <div className='container-btn'>
          <Button type='submit' title={'Xác nhận'} classes={'button btn-submit'} />
          <Button onClick={onClose} title={'Đóng'} classes={'button btn-close'} />
        </div>
      </form>
    </>
  );
}

export default ChildrenModalOrder;
