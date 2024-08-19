import { useState } from 'react';

import { deleteSVGIcon, settingEditSVGIcon } from '~/assets/icons';

import PaginatedTable from './PaginatedTable';
import Button from '../Button';

import './Table.scss';

function Table({ ...props }) {
  const { titles, datas, handleClickBtnUpdate, recordsPerPage, titleUpdate = 'Chỉnh sửa', titleDelete } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(datas.length / recordsPerPage);

  const currentData = datas.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div id='container-table'>
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
          {Array.isArray(currentData) && currentData.length > 0 ? (
            currentData.map((data, index) => (
              <tr key={index}>
                {Object.values(data).map((value, index) => {
                  return <td key={index}>{value}</td>;
                })}
                <td className='container-edit'>
                  <Button icon={settingEditSVGIcon} title={titleUpdate} classes={'btn-update button'} onClick={() => handleClickBtnUpdate(data)} />
                  {titleDelete && <Button icon={deleteSVGIcon} title={titleDelete} classes={'btn-delete button'} />}
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

      <PaginatedTable currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default Table;
