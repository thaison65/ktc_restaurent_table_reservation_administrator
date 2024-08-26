import ItemSidebar from '~/components/layout/SideBar/ItemSidebar';
import { ListItemSideBar } from './routes';
import { useLocation } from 'react-router-dom';

import './SideBar.scss';
import { useEffect } from 'react';
import { logoTablet } from '~/assets/icons';

function SideBar() {
  const location = useLocation();

  useEffect(() => {}, [location]);

  return (
    <aside>
      <div className='logo'>
        <img src={logoTablet} alt='Logo' />
        <h1>Dashboard</h1>
      </div>

      <ul className='sidebar-menu'>
        {ListItemSideBar.map((item) => {
          if (item.path === location.pathname) {
            return <ItemSidebar key={item.id} icon={item.iconFocus} alt={item.alt} title={item.title} path={item.path} focus={true} />;
          } else {
            return <ItemSidebar key={item.id} icon={item.icon} alt={item.alt} title={item.title} path={item.path} />;
          }
        })}
      </ul>
    </aside>
  );
}

export default SideBar;
