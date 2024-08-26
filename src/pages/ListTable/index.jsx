import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Table from '~/components/common/Table';
import { ModalDialog } from '~/components/common/Dialog';
import ChildrenModal from './ChildrenModal';

import { addSVGIcon } from '~/assets/icons';

import './ListTable.scss';
import Button from '~/components/common/Button';
import { deleteView, getViews } from '~/services';
import Alert from '~/components/common/Dialog/Alert';

const titles = ['STT', 'Hình ảnh', 'ID', 'Tên bàn', 'Khu vực', 'Mô tả'];

function ListTablePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [datas, setDatas] = useState([]);
  const [itemUpdated, setItemUpdated] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('add');

  const [showAlert, setShowAlert] = useState({ show: false, onClose: null, title: '', message: '', status: 'success' });

  const [triggerReload, setTriggerReload] = useState(false);

  const handleOpenModal = () => {
    setItemUpdated({});
    setShowModal(true);
    setAction('add');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClickBtnUpdate = (data) => {
    setItemUpdated(data);
    setShowModal(true);
    setAction('update');
  };

  const handleDelete = async (id) => {
    if (id) {
      try {
        await deleteView(id);

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

  const handleClose = () => {
    setShowAlert({ show: false });
  };

  const handleTriggerReload = () => {
    setTriggerReload(!triggerReload);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getViews();

        const tables = response.map((item) => ({
          image: item.desk_img,
          id: item.id,
          name: item.name,
          categoryName: item.category.name,
          description: item.description,
        }));

        if (searchParams.get('search')) {
          const searchText = searchParams.get('search').toLowerCase().trim();

          const filteredData = tables.filter((item) => {
            return item.name.toLowerCase().includes(searchText) || item.description.toLowerCase().includes(searchText);
          });

          setDatas(filteredData);
        } else {
          setDatas(tables);
        }
      } catch (error) {
        console.error(error);
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
      <div className=' header-content-table'>
        <Button icon={addSVGIcon} title={'Thêm bàn'} classes={'btn-add button'} onClick={handleOpenModal} />
      </div>

      <Table
        titles={titles}
        datas={datas}
        handleClickBtnUpdate={handleClickBtnUpdate}
        recordsPerPage={5}
        titleDelete={'Xóa bàn'}
        handleDel={handleDelete}
      />

      <ModalDialog show={showModal} onClose={handleCloseModal} title={'Thông tin bàn'}>
        <ChildrenModal onClose={handleCloseModal} item={itemUpdated} action={action} handleTriggerReload={handleTriggerReload} />
      </ModalDialog>

      <Alert onClose={showAlert.onClose} show={showAlert.show} title={showAlert.title} message={showAlert.message} status={showAlert.status} />
    </>
  );
}

export default ListTablePage;
