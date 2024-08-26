import { useState } from 'react';
import ItemDesk from './ItemDesk';
import SelectArea from '~/components/common/SelectItem';

import './Maps.scss';

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
const tables = [
  { id: 1, name: 'Bàn 1', status: '0' },
  { id: 2, name: 'Bàn 2', status: '1' },
  { id: 3, name: 'Bàn VIP', status: '1' },
  { id: 4, name: 'Bàn 4', status: '0' },
  { id: 5, name: 'Bàn 5', status: '1' },
  { id: 6, name: 'Bàn 6', status: '0' },
  { id: 7, name: 'Bàn 7', status: '1' },
  { id: 8, name: 'Bàn 8', status: '0' },
  { id: 9, name: 'Bàn 9', status: '1' },
  { id: 10, name: 'Bàn 10', status: '0' },
  { id: 11, name: 'Bàn 11', status: '1' },
  { id: 12, name: 'Bàn 12', status: '0' },
  { id: 13, name: 'Bàn 13', status: '1' },
  { id: 14, name: 'Bàn 14', status: '0' },
  { id: 15, name: 'Bàn 15', status: '1' },
  { id: 16, name: 'Bàn 16', status: '0' },
  { id: 17, name: 'Bàn 17', status: '1' },
  { id: 18, name: 'Bàn 18', status: '0' },
  { id: 19, name: 'Bàn 19', status: '1' },
  { id: 20, name: 'Bàn 20', status: '0' },
];

function MapsPage() {
  const [selectedArea, setSelectedArea] = useState('');

  const handleSelect = (event) => {
    console.log('Select:', event.target.value);
    setSelectedArea(event.target.value);
    console.log(selectedArea);
  };

  return (
    <>
      <div className='header-content'>
        <SelectArea options={categories} onSelect={handleSelect} selectedValue={selectedArea} title={'Chọn khu vực:'} />
        {/* 
        <section id='container-status'>
          <div className='note-status'>
            <div className='ellipse active'></div>
            <span>Đang được sử dụng</span>
          </div>
          <div className='note-status'>
            <div className='ellipse'></div>
            <span>Chưa được sử dụng</span>
          </div>
        </section> */}
      </div>

      <section id='content-maps'>
        <div id='container-maps'>
          {tables.map((value) => {
            return <ItemDesk key={value.id} id={value.id} title={value.name} status={value.status} />;
          })}
        </div>

        <div className='container-balcony'>Ngoài ban công</div>
      </section>
    </>
  );
}

export default MapsPage;
