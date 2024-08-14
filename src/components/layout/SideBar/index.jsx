import ItemSidebar from '~/components/common/ItemSidebar';
import './SideBar.scss';
import { ListItemSideBar } from './routes';

function SideBar() {
  return (
    <aside>
      <div className='logo'>
        <h1>Dashboard</h1>
      </div>

      <ul className='sidebar-menu'>
        {ListItemSideBar.map((item) => {
          return <ItemSidebar key={item.id} icon={item.icon} alt={item.alt} title={item.title} path={item.path} />;
        })}
      </ul>
    </aside>
  );
}

export default SideBar;
