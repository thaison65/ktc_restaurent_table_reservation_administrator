import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { searchSVGIcon, bellSVGIcon } from '~/assets/icons';
import useDebounce from '~/hooks/use-debounce';

// import SelectArea from '~/components/common/SelectItem';
import DatePickerComponent from '~/components/common/DatePicker';

import './Header.scss';

// const categories = [
//   {
//     id: 1,
//     title: 'Sân vườn',
//   },
//   {
//     id: 2,
//     title: 'Quầy bar',
//   },
//   {
//     id: 3,
//     title: 'Trong sảnh',
//   },
//   {
//     id: 4,
//     title: 'Cạnh biển',
//   },
// ];

function Header({ title }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  // const [selectedArea, setSelectedArea] = useState('');
  const [startDate, setStartDate] = useState();

  const debounce = useDebounce({ value: search, delay: 500 });

  // const handleSelect = (event) => {
  //   console.log('Select:', event.target.value);
  //   setSelectedArea(event.target.value);
  //   console.log(selectedArea);
  // };

  const handleChangeDate = (event) => {
    setStartDate(event);
    console.log(startDate);
  };

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  useEffect(() => {
    if (debounce || startDate) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        if (startDate && title === 'Danh sách đơn đặt bàn') {
          console.log(startDate);

          const formattedDate = startDate.toLocaleDateString('en-CA'); // Outputs in 'YYYY-MM-DD' format
          newParams.set('date', formattedDate);
        }
        if (debounce) {
          newParams.set('search', debounce);
        }

        return newParams;
      });
    } else {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.delete('search');
        newParams.delete('date');
        return newParams;
      });
    }
  }, [debounce, startDate, title]);

  return (
    <header>
      <div id='header-page'>
        <h2>{title}</h2>
        <div className='action-user'>
          <div className='container-icon'>
            <img src={bellSVGIcon} alt='Bell Icon' />
            <div className='badges'></div>
          </div>
          <div className='user-info'>
            <span>A</span>
          </div>
        </div>
      </div>

      <section id='event-page'>
        <div className='container-search'>
          <input id='search' name='search' type='text' placeholder='Search...' value={search} onChange={handleSearch} />
          <img src={searchSVGIcon} alt='Search Icon' />
        </div>

        {title === 'Danh sách đơn đặt bàn' ? (
          <div id='filter-desk'>
            {/* {title === 'Sơ đồ vị trí' || title === 'Khu vực trong nhà hàng' ? null : (
            <SelectArea title={'Khu vực:'} options={categories} onSelect={handleSelect} selectedValue={selectedArea} />
          )} */}

            <DatePickerComponent startDate={startDate} handleChangeDate={handleChangeDate} />
            <button
              className='button'
              onClick={() => {
                setStartDate(null);
              }}>
              Xóa ngày
            </button>
          </div>
        ) : null}
      </section>
    </header>
  );
}

export default Header;
