import { useState } from 'react';

import { deleteSVGIcon, settingEditSVGIcon } from '~/assets/icons';

import PaginatedTable from './PaginatedTable';
import Button from '../Button';

import './Table.scss';

const status = [
  {
    id: 0,
    title: 'Không nhận đơn đặt bàn',
    color: 'inactive',
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
    color: 'primary',
  },
];

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
                <td>{index + 1}</td>
                {Object.entries(data).map(([key, value], index) => {
                  if (key === 'status') {
                    return (
                      <td key={index}>
                        <section className='container-status-booking'>
                          <div className={`badge badge-${status.find((item) => item.id === value).color}`}></div>{' '}
                          <span>{status.find((item) => item.id === value).title}</span>
                        </section>
                      </td>
                    );
                  }
                  return (
                    <td key={index}>
                      {typeof value === 'string' && value.length < 30 ? value : typeof value === 'string' ? value.substring(0, 27) + '...' : value}
                    </td>
                  );
                })}
                <td className='container-edit'>
                  <Button icon={settingEditSVGIcon} title={titleUpdate} classes={'btn-update button'} onClick={() => handleClickBtnUpdate(data)} />
                  {titleDelete && <Button icon={deleteSVGIcon} title={titleDelete} classes={'btn-delete button'} />}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={titles.length + 1}>
                <div className='container-loader'>
                  <div className='loader'></div>
                  <span>{'Dữ liệu không có'}</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <PaginatedTable currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default Table;
