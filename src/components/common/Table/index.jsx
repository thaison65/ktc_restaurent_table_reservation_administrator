import { deleteSVGIcon, settingEditSVGIcon } from '~/assets/icons';

import './Table.scss';
import { Button } from '../Button';

function Table({ ...props }) {
  const { titles, datas, handleClickBtnUpdate } = props;

  return (
    <>
      <table>
        <thead>
          <tr>
            {titles.map((title, index) => {
              return <th key={index}>{title}</th>;
            })}
            <th className='action-table'></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(datas) && datas.length > 0 ? (
            datas.map((data, index) => (
              <tr key={index}>
                {Object.values(data).map((value, index) => {
                  return <td key={index}>{value}</td>;
                })}
                <td className='container-edit'>
                  <Button icon={settingEditSVGIcon} title={'Chỉnh sửa'} classes={'btn-update button'} onClick={() => handleClickBtnUpdate(data)} />
                  <Button icon={deleteSVGIcon} title={'Xóa bàn'} classes={'btn-delete button'} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={titles.length + 1}>{'Dữ liệu không có'}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Table;
