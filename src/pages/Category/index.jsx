import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import InputField from '~/components/common/InputField';
import Button from '~/components/common/Button';
import Table from '~/components/common/Table';

import './Category.scss';
import { ModalDialog } from '~/components/common/Dialog';
import ChildrenModalCategory from './ChildrenModalCategory';

const titles = ['STT', 'Mã khu vực', 'Tên khu vực', 'Mô tả'];

const danhsachkhuvuc = [
  {
    stt: 1,
    id: 1,
    name: 'Sân vườn',
    description: 'Khu vực sân vườn của nhà hàng',
  },
  {
    stt: 2,
    id: 2,
    name: 'Quầy bar',
    description: 'Khu vực quầy bar phía trong nhà hàng',
  },
  {
    stt: 3,
    id: 3,
    name: 'Trong sảnh',
    description: 'Khu vực đại sảnh của nhà hàng',
  },
  {
    stt: 4,
    id: 4,
    name: 'Cạnh biển',
    description: 'Khu vực cạnh biển của nhà hàng',
  },
];

function Category() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [datas, setDatas] = useState([]);
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [itemUpdated, setItemUpdated] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClickBtnUpdate = (data) => {
    setItemUpdated(data);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form
    //...
  };

  useEffect(() => {
    if (searchParams.get('search')) {
      const searchText = searchParams.get('search').toLowerCase().trim();

      const filteredData = danhsachkhuvuc.filter((item) => {
        return item.name.toLowerCase().includes(searchText) || item.description.toLowerCase().includes(searchText);
      });

      setDatas(filteredData);
    } else {
      setDatas(danhsachkhuvuc);
    }
  }, [searchParams]);

  useEffect(() => {
    // Chỉ cập nhật setSearchParams nếu nó chưa có giá trị 'search'
    if (!searchParams.has('search')) {
      setSearchParams({ search: searchParams.get('search') ?? '' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <form id='form-category' onSubmit={handleSubmit}>
        <h2>Thêm mới khu vực</h2>
        <InputField
          label={'Mã khu vực'}
          id={'id'}
          name={id}
          placeholder={'Nhập mã khu vực'}
          value={id}
          onChange={(e) => setID(e.target.value)}
          required
        />
        <InputField
          label={'Tên khu vực'}
          id={'name'}
          name={name}
          placeholder={'Nhập tên khu vực'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          label={'Mô tả'}
          id={'description'}
          name={description}
          placeholder={'Nhập tên khu vực của bàn'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div className='container-btn'>
          <Button type={'submit'} classes={'button btn-submit'} title={'Gửi thông tin'} />
        </div>
      </form>
      <Table titles={titles} datas={datas} recordsPerPage={3} handleClickBtnUpdate={handleClickBtnUpdate} titleDelete={'Xóa'} />

      <ModalDialog show={showModal} onClose={handleCloseModal} title={'Thông tin khu vực bàn'}>
        <ChildrenModalCategory onClose={handleCloseModal} item={itemUpdated} />
      </ModalDialog>
    </>
  );
}

export default Category;
