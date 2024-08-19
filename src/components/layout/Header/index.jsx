import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { searchSVGIcon, bellSVGIcon, elementSVGIcon, dateSVGIcon } from '~/assets/icons';
import useDebounce from '~/hooks/use-debounce';

import './Header.scss';

function Header({ title }) {
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const debounce = useDebounce({ value: search, delay: 500 });

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  useEffect(() => {
    if (debounce) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set('search', debounce);
        return newParams;
      });
    } else {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.delete('search');
        return newParams;
      });
    }
  }, [debounce]);

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

        <div id='filter-desk'>
          <div className='dropdown dropdown-status'>
            <button className='btn-dropdown'>
              <img src={elementSVGIcon} alt='Status Icon' /> Trạng thái
            </button>
            <div className='dropdown-content'></div>
          </div>

          <div className='dropdown dropdown-date'>
            <button className='btn-dropdown'>
              <img src={dateSVGIcon} alt='Date Icon' />
              Chọn ngày
            </button>
            <div className='dropdown-content'></div>
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header;
