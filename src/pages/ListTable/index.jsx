import { addSVGIcon } from '~/assets/icons';

import './ListTable.scss';
import Table from '~/components/common/Table';
import { Button } from '~/components/common/Button';
// import { ModalDialog } from '~/components/common/Dialog';

const titles = ['STT', 'Hình ảnh', 'ID', 'Tên bàn', 'Trạng Thái', 'Khu vực', 'Mô tả'];

const danhSachBan = [
  { STT: 1, image: 'hinh_anh_1.jpg', id: 'Ban1', name: 'Bàn số 1', status: 'Trống', area: 'Sân vườn', description: 'Bàn cho 2 người' },
  { STT: 2, image: 'hinh_anh_2.jpg', id: 'Ban2', name: 'Bàn số 2', status: 'Có người', area: 'Sân vườn', description: 'Bàn cho 4 người' },
  { STT: 3, image: 'hinh_anh_3.jpg', id: 'Ban3', name: 'Bàn số 3', status: 'Trống', area: 'Sân vườn', description: 'Bàn tròn' },
  { STT: 4, image: 'hinh_anh_4.jpg', id: 'Ban4', name: 'Bàn số 4', status: 'Có người', area: 'Sân vườn', description: 'Bàn vuông' },
  { STT: 5, image: 'hinh_anh_5.jpg', id: 'Ban5', name: 'Bàn số 5', status: 'Trống', area: 'Sân vườn', description: 'Bàn cạnh cửa sổ' },
  { STT: 6, image: 'hinh_anh_6.jpg', id: 'Ban6', name: 'Bàn số 6', status: 'Có người', area: 'Sân vườn', description: 'Bàn cho gia đình' },
  { STT: 7, image: 'hinh_anh_7.jpg', id: 'Ban7', name: 'Bàn số 7', status: 'Trống', area: 'Phòng VIP', description: 'Bàn VIP 1' },
  { STT: 8, image: 'hinh_anh_8.jpg', id: 'Ban8', name: 'Bàn số 8', status: 'Có người', area: 'Phòng VIP', description: 'Bàn VIP 2' },
  { STT: 9, image: 'hinh_anh_9.jpg', id: 'Ban9', name: 'Bàn số 9', status: 'Trống', area: 'Phòng VIP', description: 'Bàn VIP 3' },
  { STT: 10, image: 'hinh_anh_10.jpg', id: 'Ban10', name: 'Bàn số 10', status: 'Có người', area: 'Phòng VIP', description: 'Bàn VIP 4' },
  { STT: 11, image: 'hinh_anh_11.jpg', id: 'Ban11', name: 'Bàn số 11', status: 'Trống', area: 'Sân vườn', description: 'Bàn cho 2 người' },
  { STT: 12, image: 'hinh_anh_12.jpg', id: 'Ban12', name: 'Bàn số 12', status: 'Có người', area: 'Sân vườn', description: 'Bàn cho 4 người' },
  { STT: 13, image: 'hinh_anh_13.jpg', id: 'Ban13', name: 'Bàn số 13', status: 'Trống', area: 'Sân vườn', description: 'Bàn tròn' },
  { STT: 14, image: 'hinh_anh_14.jpg', id: 'Ban14', name: 'Bàn số 14', status: 'Có người', area: 'Sân vườn', description: 'Bàn vuông' },
  { STT: 15, image: 'hinh_anh_15.jpg', id: 'Ban15', name: 'Bàn số 15', status: 'Trống', area: 'Sân vườn', description: 'Bàn cạnh cửa sổ' },
  { STT: 16, image: 'hinh_anh_16.jpg', id: 'Ban16', name: 'Bàn số 16', status: 'Có người', area: 'Sân vườn', description: 'Bàn cho gia đình' },
  { STT: 17, image: 'hinh_anh_17.jpg', id: 'Ban17', name: 'Bàn số 17', status: 'Trống', area: 'Phòng VIP', description: 'Bàn VIP 1' },
  { STT: 18, image: 'hinh_anh_18.jpg', id: 'Ban18', name: 'Bàn số 18', status: 'Có người', area: 'Phòng VIP', description: 'Bàn VIP 2' },
  { STT: 19, image: 'hinh_anh_19.jpg', id: 'Ban19', name: 'Bàn số 19', status: 'Trống', area: 'Phòng VIP', description: 'Bàn VIP 3' },
  { STT: 20, image: 'hinh_anh_20.jpg', id: 'Ban20', name: 'Bàn số 20', status: 'Có người', area: 'Phòng VIP', description: 'Bàn VIP 4' },
];
function ListTablePage() {
  return (
    <>
      {/* <ModalDialog /> */}

      <div className=' header-content-table'>
        <Button icon={addSVGIcon} title={'Thêm bàn'} classes={'btn-add button'} />
      </div>

      <Table titles={titles} datas={danhSachBan} />
    </>
  );
}

export default ListTablePage;
