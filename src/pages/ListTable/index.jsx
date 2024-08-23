import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Table from '~/components/common/Table';
import { ModalDialog } from '~/components/common/Dialog';
import ChildrenModal from './ChildrenModal';

import { addSVGIcon } from '~/assets/icons';

import './ListTable.scss';
import Button from '~/components/common/Button';
import { getViews } from '~/services';

const titles = ['STT', 'Hình ảnh', 'ID', 'Tên bàn', 'Khu vực', 'Mô tả'];

function ListTablePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [datas, setDatas] = useState([]);
  const [itemUpdated, setItemUpdated] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('add');

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

  const handleTriggerReload = () => {
    setTriggerReload(!triggerReload);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getViews();

        const tables = response.map((item) => ({
          desk_img: item.desk_img,
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

      <Table titles={titles} datas={datas} handleClickBtnUpdate={handleClickBtnUpdate} recordsPerPage={7} titleDelete={'Xóa bàn'} />

      <ModalDialog show={showModal} onClose={handleCloseModal} title={'Thông tin bàn'}>
        <ChildrenModal onClose={handleCloseModal} item={itemUpdated} action={action} handleTriggerReload={handleTriggerReload} />
      </ModalDialog>
    </>
  );
}

export default ListTablePage;
