import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import InputField from '~/components/common/InputField';
import Button from '~/components/common/Button';
import Table from '~/components/common/Table';

import './Category.scss';
import { ModalDialog } from '~/components/common/Dialog';
import ChildrenModalCategory from './ChildrenModalCategory';
import { deleteCategory, getCategories, postCategory } from '~/services';
import { checkLength } from '~/utils/validation';
import Alert from '~/components/common/Dialog/Alert';

const titles = ['STT', 'Mã khu vực', 'Tên khu vực', 'Mô tả'];

function Category() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [datas, setDatas] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ name: '', description: '', errors: '' });

  const [itemUpdated, setItemUpdated] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, onClose: null, title: '', message: '', status: 'success' });

  const [triggerReload, setTriggerReload] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClickBtnUpdate = (data) => {
    setItemUpdated(data);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (id) {
      try {
        await deleteCategory(id);

        handleTriggerReload();
        setShowAlert({
          show: true,
          onClose: handleClose,
          title: 'Xóa thành công',
          message: 'Xóa khu vực thành công',
          status: 'success',
        });
      } catch (e) {
        setShowAlert({
          show: true,
          onClose: handleClose,
          title: 'Xóa thất bại',
          message: 'Xóa khu vực thất bại',
          status: 'error',
        });
        console.log(e);
      }
    }
  };

  const handleTriggerReload = () => {
    setTriggerReload(!triggerReload);
  };

  const handleClose = () => {
    setShowAlert({ show: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!checkLength(name, 3, 100)) {
        console.error('Tên khu vực có ít nhất 3 ký tự');
        setErrors({ name: 'Tên khu vực có ít nhất 3 ký tự' });
        throw new Error('Tên khu vực có ít nhất 3 ký tự');
      }

      if (!checkLength(description, 5, 500)) {
        console.error('Mô tả của khu vực có ít nhất 5 ký tự');
        setErrors({ description: 'Mô tả của khu vực có ít nhất 5 ký tự' });
        throw new Error('Mô tả của khu vực có ít nhất 5 ký tự');
      }

      const data = {
        name: name,
        description: description,
      };

      await postCategory(data);

      handleTriggerReload();
      setName('');
      setDescription('');
      setShowAlert({
        show: true,
        onClose: handleClose,
        title: 'Thêm khu vực nhà hàng',
        message: 'Thông tin khu vực có trong nhà hàng đã thêm thành công',
        status: 'success',
      });
      setErrors({ name: '', description: '', errors: '' });
    } catch (e) {
      setShowAlert({
        show: true,
        onClose: handleClose,
        title: 'Thêm khu vực nhà hàng',
        message: e.message,
        status: 'error',
      });
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

        if (searchParams.get('search')) {
          const searchText = searchParams.get('search').toLowerCase().trim();
          // const formattedDate = startDate instanceof Date ? startDate.toISOString().split('T')[0] : startDate;

          const filteredData = tables.filter((item) => {
            return item.name.toLowerCase().includes(searchText);
          });

          console.log(filteredData);

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
          error={errors.name}
        />
        <InputField
          label={'Mô tả'}
          id={'description'}
          name={description}
          placeholder={'Nhập tên khu vực của bàn'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
        />

        <div className='container-btn'>
          <Button type={'submit'} classes={'button btn-submit'} title={'Gửi thông tin'} />
        </div>
      </form>
      <Table
        titles={titles}
        datas={datas}
        recordsPerPage={4}
        handleClickBtnUpdate={handleClickBtnUpdate}
        titleDelete={'Xóa'}
        handleDel={handleDelete}
      />

      <ModalDialog show={showModal} onClose={handleCloseModal} title={'Thông tin khu vực bàn'}>
        <ChildrenModalCategory onClose={handleCloseModal} item={itemUpdated} handleTriggerReload={handleTriggerReload} />
      </ModalDialog>

      <Alert onClose={showAlert.onClose} show={showAlert.show} title={showAlert.title} message={showAlert.message} status={showAlert.status} />
    </>
  );
}

export default Category;
