import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import InputField from '~/components/common/InputField';
import Button from '~/components/common/Button';
import Table from '~/components/common/Table';

import './Category.scss';
import { ModalDialog } from '~/components/common/Dialog';
import ChildrenModalCategory from './ChildrenModalCategory';
import { getCategories, postCategory } from '~/services';
import { checkLength } from '~/utils/validation';

const titles = ['STT', 'Mã khu vực', 'Tên khu vực', 'Mô tả'];

// const danhsachkhuvuc = [
//   {
//     stt: 1,
//     id: 1,
//     name: 'Sân vườn',
//     description: 'Khu vực sân vườn của nhà hàng',
//   },
//   {
//     stt: 2,
//     id: 2,
//     name: 'Quầy bar',
//     description: 'Khu vực quầy bar phía trong nhà hàng',
//   },
//   {
//     stt: 3,
//     id: 3,
//     name: 'Trong sảnh',
//     description: 'Khu vực đại sảnh của nhà hàng',
//   },
//   {
//     stt: 4,
//     id: 4,
//     name: 'Cạnh biển',
//     description: 'Khu vực cạnh biển của nhà hàng',
//   },
// ];

function Category() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [datas, setDatas] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [itemUpdated, setItemUpdated] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [triggerReload, setTriggerReload] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClickBtnUpdate = (data) => {
    setItemUpdated(data);
    setShowModal(true);
  };

  const handleTriggerReload = () => {
    setTriggerReload(!triggerReload);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkLength(name, 3, 100)) {
      console.error('Sai tên khu vực');
      return;
    }

    if (!checkLength(description, 5, 500)) {
      console.error('Sai mô tả khu vực');
      return;
    }

    try {
      const data = {
        name: name,
        description: description,
      };

      await postCategory(data);

      handleTriggerReload();
      setName('');
      setDescription('');
      console.log('Thêm khu vực thành công');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getCategories();

        const tables = response.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
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
    <>
      <form id='form-category' onSubmit={handleSubmit}>
        <h2>Thêm mới khu vực</h2>

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
      <Table titles={titles} datas={datas} recordsPerPage={4} handleClickBtnUpdate={handleClickBtnUpdate} titleDelete={'Xóa'} />

      <ModalDialog show={showModal} onClose={handleCloseModal} title={'Thông tin khu vực bàn'}>
        <ChildrenModalCategory onClose={handleCloseModal} item={itemUpdated} handleTriggerReload={handleTriggerReload} />
      </ModalDialog>
    </>
  );
}

export default Category;
