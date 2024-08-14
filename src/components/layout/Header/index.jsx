import { useState } from 'react';

import { searchSVGIcon, bellSVGIcon, elementSVGIcon, dateSVGIcon } from '~/assets/icons';
import './Header.scss';

function Header({ ...props }) {
  const { title } = props;

  const [search, setSearch] = useState();
  // const [startDate, setStartDate] = useState(new Date());

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log('Search:', search);
  };

  return (
    <header>
      <div id='header-page'>
        <h2>{title}</h2>
        <div className='action-user'>
          <div className='container-icon'>
            <img src={bellSVGIcon} alt='' />
            <div className='badges'></div>
          </div>
          <div className='user-info'>
            <span>A</span>
          </div>
        </div>
      </div>

      <section id='event-page'>
        <div className='container-search'>
          <input id='search' name='search' type='text' placeholder='Search...' onChange={handleSearch} />
          <img src={searchSVGIcon} alt='Icon search' />
        </div>

        <div id='filter-desk'>
          <div className='dropdown dropdown-status'>
            <button className='btn-dropdown'>
              <img src={elementSVGIcon} alt='Icon Element' /> Trạng thái
            </button>
            <div className='dropdown-content'></div>
          </div>

          <div className='dropdown dropdown-date'>
            <button className='btn-dropdown'>
              <img src={dateSVGIcon} alt='Icon Element' />
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
